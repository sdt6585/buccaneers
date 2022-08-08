//Just a wrapper function to allow us to use async/await
(async function () {
  /*********************************************************************************Setup App - Shared variables and an object for sharing when we grow beyond one javascript page */
  let app = {};

  //Check if we're logged in if we're not on a login path or the home page
  if (window.location.hash.split('/')[0] !== '#magic_link' && window.location.hash !== '#') {
    //Grab the user
    try {
      app.user = (await (await fetch(`./api/user`)).json()).data[0];
    } catch (e) {
      window.location.hash = 'not-authorized';
    }    
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
    'campaigns': showCampaigns,
    'campaign': showCampaign,
    'magic_link': magicLinkLogin
  });

  function notFound() {
    document.body.innerHTML = '<h1>404 Not found :/</h1>';
  }

  // Hash-based routing
  function processHash() {
    const hash = location.hash || '#';

    // Route based on the first route part
    route(hash.split('/')[0].slice(1));
  }

  window.addEventListener('hashchange', processHash);
  processHash();

  /********************************************************************************* Magic Link Login */
  async function magicLinkLogin () {
    try {
      let params = getRouteParams();

      app.user = await (await fetch(`./api/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: 'MagicLink!!!!!!!!!!!!!!!!!!!!!', password: params.magic_link})
      })).json();

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

    let request = await fetch(`./api/user/campaigns`);
    let response = await request.json();

    if (response.success) {
      document.body.innerHTML = '';

      for (let campaign of response.data) {
        document.body.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><br/>`;
      } 

    } else {
      document.body.innerHTML = `There was an error :-(<br/>${response.message}`;
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

          document.body.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><b+r/><`;
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