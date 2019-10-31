const request = require('request');
const { dialogflow, BasicCard, LinkOutSuggestion } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getMonsterUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/Monsters/?name='+ encodeURIComponent(params.Monster).replace(/ /g,"+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          return getMonsterInfo(body.results[0]['url'], resolve1, conv,params)
        }
      });
    });
  }
}

function getMonsterInfo(url, resolve1, conv,params){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
        conv.ask("☠", new BasicCard({ 
          title: body.name,
          subtitle:"ac: " +body.armor_class+ " | hp: " + body.hit_points + " | sp: " + body.speed,
          text: "st: " + body.strength + " | dex: " + body.dexterity + " | con: " + body.constitution + " | int: " + body.intelligence + " | wis: " + body.wisdom }));
          
          conv.ask(new LinkOutSuggestion({    name: 'Monster Info',    url: 'https://www.dndbeyond.com/monsters/'+ params.Monster.replace(/ /g, '-') }));
        resolve1();
        resolve2();
      }
    });
  });
}
