const request = require('request');
const { dialogflow, LinkOutSuggestion } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');
module.exports = {
  getHelpInfo: function (conv,params){
    /*
    conv.ask("☠", 
             new BasicCard(
      { title: "Help", 
       text: "You Can Get Information for  Classes: 'Class Cleric Info'  /r/n Spells: 'Spell Acid Arrow Info' /r/n Monsters: ' Monster Troll Info' /r/n Features: ' Feature Rage Info'",
       buttons: new Button({    title: 'More Info',    url: 'https://dnd-directory-web.glitch.me/help'  })
      }));
    */
    
    conv.ask("'Class Cleric Info' ----- 'Spell Acid Arrow Info' ----- 'Monster Troll Info' ----- 'Feature Rage Info'");
    conv.ask(new LinkOutSuggestion({    name: 'Help',    url: 'https://dnd-directory-web.glitch.me/help'  }));
  }
}
