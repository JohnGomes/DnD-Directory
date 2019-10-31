const request = require('request');
const { dialogflow, BasicCard, LinkOutSuggestion } = require('actions-on-google');
const toSentence = require('underscore.string/toSentence');

module.exports = {
  getSpellUrl: function (conv,params){
    let requestURL = 'http://dnd5eapi.co/api/spells/?name='+ encodeURIComponent(params.Spell).replace(/ /g,"+");
    return new Promise( function( resolve1, reject1 ){ 
      request(requestURL, function(err, response) {
        if (err) { reject1( err );} else { 
          let body = JSON.parse(response.body);
          console.log(body.results[0]);
          if(body.results.length == 0)
          {
            conv.ask("spell not found");
            reject1();
          }
          else
          {
            return getSpellInfo(body.results[0]['url'], resolve1, conv, params)
          }
        }
      });
    });
  }
}

function getSpellInfo(url, resolve1, conv, params){
  return new Promise( function( resolve2, reject2 ){ 
    request(url, function(err, response) {
      if (err) { reject2( err ); } else { 
        let body = JSON.parse(response.body);
       
        conv.ask("☠", new BasicCard({ 
          title: body.name + " | " +body.level+ " | " + body.range + " | " + body.casting_time,
          subtitle: body.school.name +" | "+ toSentence(body.components),
          text: toSentence(body.desc)
        }));
          
        
          
          conv.close(new LinkOutSuggestion({    name: 'Spell Info',    url: 'https://www.dndbeyond.com/spells/'+ params.Spell.replace(/ /g, '-') }));
        resolve1();
        resolve2();
      }
    });
  });
}

function checkString(val){
  return val == undefined || val == null || ""
}