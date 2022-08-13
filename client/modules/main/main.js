async function ({app, target, unmask, params}) {
  let {load} = app;

  let me = await load({
    template: './modules/main/main.html'
  });
  me.el = me.template.el;
  //Get the menu and turn it into an object map by hash
  me.menu = me.el.querySelector('#menu');
  let links = {}
  for (let linkEl of me.menu.getElementsByTagName('a')) {
    links[linkEl.hash.slice(1)] = linkEl;
  }

  //Watch for route changes and highlight 
  app.on('RouteChange', function ({routeName}) {
    //Remove all the styles
    for (let [key, linkEl] of Object.entries(links)) {
      if (key === routeName) {
        linkEl.classList.add('menu-selected');
      } else {
        linkEl.classList.remove('menu-selected');
      }
    }

    return true;
  });

  //Watch for selected campaigns to set the link correctly for campaign
  app.on('CampaignSelected', function (campaign) {
    links.campaign.href = `#campaign/campaign_id/${campaign.campaign_id}`;
  });

  //Append our template
  unmask();
  target.appendChild(me.el);

  return me.el.querySelector('#main-content');
}