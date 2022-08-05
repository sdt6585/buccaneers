/************************************************ Utility function for getting route parameters */
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
/************************************************ Initialize the Router */
const route = Rlite(notFound, {
  // Default route
  '': notFound(),

  'campaigns': showCampaigns,
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

async function showCampaigns () {
  let params = getRouteParams();

  if (params.user_id) {
    let request = await fetch(`./api/user/${params.user_id}/campaigns/`);
    let response = await request.json();

    if (response.success) {
      document.body.innerHTML = '';

      for (let campaign of response.data) {
        document.body.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><br/>`;
      } 

    } else {
      document.body.innerHTML = `There was an error :-(<br/>${response.message}`;
    }
  } else {
    document.body.innerHTML = `
      You must have a valid user id to view campaigns, please ask your game master for a link that contains yours
    `;
  }
  
}

function showCampaign(options) {

}