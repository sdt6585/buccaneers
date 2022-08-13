async function ({app, target, unmask, params}) {
  let {load} = app,
    campaignId = params.campaign_id;
  
  let me = await load({
    template: './modules/campaign/campaign.html',
    campaign: `./api/campaign/${campaignId}`
  });
  let el = me.el = me.template.el;

  //Set the currently active campaign on the app menu
  app.emit('CampaignSelected', me.campaign);

  //Format the data
  let characters = me.campaign.characters,
    userCharacters = characters.filter(item => item.user_id === parseInt(app.user.user_id) && item.is_alive === 1),
    activeCharacter = userCharacters.filter(item => item.is_active === 1)[0],
    otherCharacters = characters.filter(item => item.user_id !== parseInt(app.user.user_id) && item.is_alive === 1),
    otherActive = otherCharacters.filter(item => item.is_active === 1),
    inactiveCharacters = characters.filter(item => item.is_active === 0 && item.is_alive === 1);

  //Show the active character
  debugger;
  me.activeCharacter = el.querySelector(`#active-character`);
  me.activeCharacter.innerHTML = `<a href='#character/character_id/${activeCharacter.character_id}'>${activeCharacter.name}</a>`;

  
  //Show the other characters for the team
  me.teamCharacters = el.querySelector(`#team-characters`);
  for (let character of otherActive) {
    if (character.character_id !== activeCharacter.character_id) {
      me.teamCharacters.innerHTML += `<a href='#character/character_id/${character.character_id}'>${character.name}</a><br/>`;
    }
  } 

  //Show the other characters for the user
  me.inactiveCharacters = el.querySelector(`#inactive-characters`);
  for (let character of inactiveCharacters) {
    if (character.character_id !== activeCharacter.character_id) {
      me.inactiveCharacters.innerHTML += `<a href='#character/character_id/${character.character_id}'>${character.name}</a><br/>`;
    }
  } 

  //Append our template
  unmask();
  target.appendChild(me.template.el);
}