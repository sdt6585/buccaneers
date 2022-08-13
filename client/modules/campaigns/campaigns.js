async function ({app, target, unmask, params}) {
  let {load} = app;
  
  let me = await load({
    campaigns: `./api/user/campaigns`
  });


  //Append our template
  unmask();
  target.innerHTML += '<h3>Campaigns:</h3>';
  for (let campaign of me.campaigns) {
    target.innerHTML += `<a href='#campaign/campaign_id/${campaign.campaign_id}'>${campaign.name}</a><br/>`;
  } 
  target.innerHTML += '<a href="#create-campaign">Create New Campaign</a>';
}