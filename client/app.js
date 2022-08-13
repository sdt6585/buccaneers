//Just a wrapper function to allow us to use async/await
(async function () {
/********************************************************************************* Global uncaught error handler */
// window.onerror = function(msg, url, linenumber) {
//   alert('Unhandled Error: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
//   return true;
// }
// window.onunhandledrejection = function(e) {
//   alert('Unhandled Error: ' + e.reason + ' stack: ' + e.reason.stack);
//   return true;
// }


  /*********************************************************************************Setup App - Shared variables and an object for sharing when we grow beyond one javascript page */
  const Observer = await getScript('./utility/Observer.js');
  let app = new Observer();
  app.getJSON = getJSON;
  app.getHTML = getHTML;
  app.getScript = getScript;
  app.load = load;

  //Check if we're logged in if we're not on a login path or the home page
  if (window.location.hash.split('/')[0] !== '#magic_link' && window.location.hash !== '#') {
    //Grab the user
    try {
      app.user = (await getJSON(`./api/user`))[0];
    } catch (e) {
      window.location.hash = 'not-authorized';
    }    
  }

  /********************************************************************************* Utility helper function that loads items based on format
   * Three options for sending it in - string, array, object
   * : {simple: './modules/simple.js', myArray: ['api/stuff', {method: 'post', body: {my: 'stuff'}}], {route: 'api/otherstuff', method: 'delete'} }
   */
   
  async function load (items) {
    let promises = [],
      loadedItems = {};
    for (let [key, item] of Object.entries(items)) {
      let route = item;
      if (Array.isArray(item)) {
        route = item[0];
      } else if (typeof item !== 'string') {
        route = item.route;
        delete item.route;
      }
      if(route.slice(-3) === '.js') {
        let result = getScript(route);
        result.then((script) => {loadedItems[key] = script});
        promises.push(result);
      } else if (route.slice(-5) === '.html') {
        let result = getHTML(route);
        result.then((html) => {loadedItems[key] = html});
        promises.push(result);
      } else {
        let options = Array.isArray(item) && item.length > 1 ? item[1] : {};
        let result = getJSON(route, options);
        result.then((data) => {loadedItems[key] = data});
        promises.push(result);
      }
    }

    await Promise.all(promises);

    return loadedItems;
  }

  /********************************************************************************* Utility function for getting a script */
  async function getScript(route) {
    let script = await (await fetch(`./${route}`)).text();
    //Make it return a function if it is one
    if (
        script.slice(0, 10) === 'function (' ||
        script.slice(0, 9) === 'function(' ||
        script.slice(0, 16) === 'async function (' ||
        script.slice(0, 15) === 'async function('
      ) {
        script = `(${script})`;
      }

      return eval(script);
  }
  /********************************************************************************* Utility function for getting JSON */
  async function getJSON(route, options = {}) {
    //Set content headers
    options.headers = options.headers || {};
    options.headers.Accept = 'application/json';
    options.headers['Content-Type'] = 'application/json';
    
    //Stringify the body if it's an object
    if (options.body && typeof options.body === 'object') {
      options.body = JSON.stringify(options.body);
    }
    
    //Get the results
    let results = await fetch (route, options);
    results = await results.json();

    //Make sure there wasn't an error
    if (results.success) {
      return results.data;
    } else {
      throw new Error(results.message);
    }
  }

  /********************************************************************************* Utility function for getting HTML as a detached dom */
  async function getHTML(route) {
    //Get the text html fragment
    let html = await (await fetch(`./${route}`)).text();
    //Load it in a detached div
    let div = document.createElement('div');
    div.innerHTML = html;
    //Add a helper function for getting by id
    div.getElementById = function (id) {
      return div.querySelector(`#${id}`);
    }
    //Add a reference to the first child as it will usually just be a single container
    div.el = div.firstChild;
    return div;
  }
  
  /********************************************************************************* Utility function for getting route parameters */
  function getRouteParams() {
    //Grab any parameters passed in the route
    let params = {},
      paramParts = window.location.hash.split('/')
    
    if (paramParts.length > 1) {
      //Grab paramater key/value pairs ie - site.com#campaign/campaign_id/1 saves an object of {campaign_id: '1'}
      for (let i = 1; i < paramParts.length; i = i + 2) {
        params[paramParts[i]] = paramParts[i+1];
      }
    }

    return params;
  }

  /********************************************************************************* Utility function to mask a section of the screen */
  function mask(el, options = {}) {
    //Create an absolutely positioned div that covers the passed in element
    let maskEl = document.createElement('div');
    maskEl.style.position = 'fixed';
    maskEl.style.display = 'flex';
    maskEl.style.justifyContent = 'center';
    maskEl.style.alignItems = 'center';
    maskEl.style.backgroundColor = 'rgba(0,0,0,.6)';
    
    let maskLabelEl;
    if (typeof options.label === 'string') {
      maskLabelEl = document.createElement('div');
      maskLabelEl.style.height = '100px';
      maskLabelEl.style.border = '1px solid white';

      maskLabelEl.innerHTML = `<h3 style='top: 20px;'>${options.label}</h3>`;

      maskEl.appendChild(maskLabelEl);
    } else if (options.label instanceof HTMLElement) {
      maskLabelEl = options.label;
      maskEl.appendChild(maskLabelEl);
    }

    document.body.appendChild(maskEl);

    //Function to update the size/position of the mask in case it moves around
    let updatePosition = function () {
      let zIndex = parseInt(getComputedStyle(el).zIndex);
      zIndex = isNaN(zIndex) ? 0 : zIndex;
      maskEl.style.zIndex = zIndex;
      let position = el.getBoundingClientRect();
      maskEl.style.height = position.height + 'px';
      maskEl.style.width = position.width + 'px';
      maskEl.style.top = position.top + 'px';
      maskEl.style.left = position.left + 'px';
    }

    //Make sure we update when it's resized or moves
    new MutationObserver(updatePosition).observe(el, {attributes: true, childList: true, characterData: true});

    //Run update position to get set initial position
    updatePosition();

    return {
      unmask: function () {
        maskEl.remove();
      },
      maskEl,
      maskLabelEl
    }
  }


  /********************************************************************************* Initialize the Router */
  let routes = {
    '': {fn: showHome()},
    'not_authorized': {fn: showNotAuthorized},
    'campaigns': {fn: showModule},
    'campaign': {container: 'main', fn: showModule},
    'magic_link': {fn: magicLinkLogin}
  };

  
  // Enable Hash-based routing events
  function processHash() {
    const hash = location.hash || '#',
      route = hash.split('/')[0].slice(1);

    // Route based on the first route part
    if (routes[route] && app.emit('RouteChange', {route})) {
      routes[route].fn({route: routes[route], routeName: route, params: getRouteParams()});
    } else {
      notFound();
    }
  }

  window.addEventListener('hashchange', processHash);

  //********************************************************************************* Utility methods for common error states */

  function notFound() {
    document.body.innerHTML = '<h1>404 Not found :/</h1>';
  }

  function showNotAuthorized() {
    document.body.innerHTML = '<h1>Not authorized, you must login or recieve a login link :/</h1>';
  }

  //********************************************************************************* Utility methods for loading controllers/modules */

  let controllers = {};
  async function loadController (name) {
    
    if (typeof controllers[name] === 'undefined') {
      controllers[name] = {show: await getScript(`./modules/${name}/${name}.js`)};
    }
    return controllers[name];
  }

  async function showModule({route, routeName, params}) {
    console.log(routeName);
    //Load the primary javascript file in the route
    let controller = await loadController(routeName);

    //Check to see if we have a container and if it's currently showing
    let target = document.body;
    if (route.container) {
      let container = await loadController(route.container);

      //If it's already showing, just grab the target area, if not, show it
      if (container.target && document.body.contains(container.target)) {
        target = container.target;
      } else {
        //Mask the body and show the container
        document.body.innerHTML = '';
        let unmaskContainer = mask(document.body).unmask;
        target = container.target = await container.show({app, target: document.body, params, unmask: unmaskContainer});
      }
    }

    //Mask and clear the target area
    target.innerHTML = '';
    let unmask = mask(target).unmask;

    //Show the module
    controller.target = await controller.show({app, target, params, unmask, routeName});
  }

  /********************************************************************************* Magic Link Login */
  async function magicLinkLogin () {
    try {
      let params = getRouteParams();

      app.user = await getJSON('./api/login', {
        method: 'POST',
        body: {
          username: 'MagicLink!!!!!!!!!!!!!!!!!!!!!', 
          password: params.magic_link
        }
      });

      //Navigate to that user's campaign list
      location.hash = 'campaigns';
    } catch (e) {
      notFound();
    }  
  }

  /********************************************************************************* Show Campaigns */

  async function showHome () {
    document.body.innerHTML =  '<h1>Buccaneers Booty</h1>';  
    document.body.innerHTML += '<p>To use this tool you must receive an invitation from a game master.  Check back later to check for details on a public beta test of the tool</p>';  
  }

  //Manually process the first hash after everything is initialized above
  processHash();
})();