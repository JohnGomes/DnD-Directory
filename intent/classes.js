const request = require('request');
const { dialogflow, BasicCard, Button, BrowseCarousel, BrowseCarouselItem, OpenUrlAction, LinkOutSuggestion, Image } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');
module.exports = {
  getClassUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/classes/?name='+ encodeURIComponent(params.Class).replace(/ /g,"+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          let url ="";
          body.results.forEach(function(x){ if(x.name == params.Class){url = x.url}});
          return getClassInfo(url, resolve1, conv, params)
        }
      });
    });
  }
}
function getClassInfo(url, resolve1, conv, params){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask("☠", new BasicCard({ 
          title: body.name, 
          subtitle: "| hit-die: " + body.hit_die + " | " + toSentence(body.saving_throws.map(function(x) {return x.name ;})),
          text: "-",
          buttons: new Button({    title: 'Class Info',    url: 'https://roll20.net/compendium/dnd5e/'+params.Class  })
        }));
        
        //conv.ask(new LinkOutSuggestion({    name: 'Handbook',    url: 'http://rpgbot.net/dnd5/characters/classes/'+params.Class  }));
        resolve1();
        resolve2();
      }
    });
  });
}
