//Just a wrapper function to allow us to use async/await
(async function () {
/********************************************************************************* Global uncaught error handler */
window.onerror = function(msg, url, linenumber) {
  alert('Unhandled Error: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}
window.onunhandledrejection = function(e) {
  alert('Unhandled Error: ' + e.reason + ' stack: ' + e.reason.stack);
  return true;
}


  /*********************************************************************************Setup App - Shared variables and an object for sharing when we grow beyond one javascript page */
  let app = {
    getJSON: getJSON,
    getHTML: getHTML
  };

  let testHTML = await getHTML('modules/campaign/campaign.html');
  document.body.innerHTML = "";
  document.body.appendChild(testHTML.el);


  //Check if we're logged in if we're not on a login path or the home page
  if (window.location.hash.split('/')[0] !== '#magic_link' && window.location.hash !== '#') {
    //Grab the user
    try {
      app.user = (await getJSON(`./api/user`))[0];
    } catch (e) {
      window.location.hash = 'not-authorized';
    }    
  }

  /********************************************************************************* Utility function for getting a script */
  
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
    let html = await (await fetch(`./${route}`)).text()
    let detachedDom = document.implementation.createHTMLDocument()
    detachedDom.body.innerHTML = html
    detachedDom.el = detachedDom.body.firstChild;
    return detachedDom;
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

  /********************************************************************************* Initialize the Router */
  const route = Rlite(notFound, {
    '': showHome(),
    'not_authorized': showNotAuthorized,
    'campaigns': showCampaigns,
    'campaign': showModule,
    'magic_link': magicLinkLogin
  });

  function notFound() {
    document.body.innerHTML = '<h1>404 Not found :/</h1>';
  }

  function showNotAuthorized() {
    document.body.innerHTML = '<h1>Not authorized, you must login or recieve a login link :/</h1>';
  }

  async function showModule(params, module, url) {
    params = getRouteParams();

    console.log(arg);
    //Load the primary javascript file in the route
  }

  // Enable Hash-based routing events
  function processHash() {
    const hash = location.hash || '#';

    // Route based on the first route part
    route(hash.split('/')[0].slice(1), hash.split('/')[0].slice(1));
  }

  window.addEventListener('hashchange', processHash);
  processHash();

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

  /********************************************************************************* Show Campaigns */

  async function showCampaigns () {
    let params = getRouteParams();

    let campaigns =  await getJSON(`./api/user/campaigns`)

    document.body.innerHTML = '';

    for (let campaign of campaigns) {
      document.body.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><br/>`;
    } 
  }


  /********************************************************************************* Show Campaign/List Characters */

  async function showCampaign() {
    let params = getRouteParams();

    if (params.campaign_id) {
      let campaignResponse = await (await fetch(`./api/campaign/${params.campaign_id}`)).json();

      if (campaignResponse.success && characterResponse.success) {
        //Grab/filter the data
        let campaign = campaignResponse.data[0],
          characters = _.groupBy(characterResponse.data, 'user_id'),
          userCharacters = characters[parseInt(params.user_id)],
          activeCharacter = _.first(characters, {user_id: parseInt(params.user_id), is_active: 1});

        //Clear the target area and show the campaign name
        document.body.innerHTML = `
          <h1>Campaign: ${campaign.name}}</h1>
          <h3>User: ${campaign.name}</h3>
        `;

        //Show the active character
        document.body.innerHTML += '<';


        for (let character of response.data) {
          document.body.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><br/>`;
        } 
      } else {
        document.body.innerHTML = `There was an error :-(<br/>${campaignReponse.message || characterResponse.message}`;
      }
    } else {
      document.body.innerHTML = `
        You must have a valid user id to view campaigns, please ask your game master for a link that contains yours
      `;
    }
  }
})();