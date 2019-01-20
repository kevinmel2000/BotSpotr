const Twitter = require('twitter');
const request = require('request-promise');
require('dotenv').config();

var tok;

module.exports = {

  auth : function (){
    let consKey = process.env.TWITTER_CONSUMER_KEY;
    let consSecret = process.env.TWITTER_CONSUMER_SECRET_KEY;

    let rfc = Buffer.from(`${consKey}:${consSecret}`).toString('base64');

    var options = {
      method: 'POST',
      url: "https://api.twitter.com/oauth2/token",
      headers: {
        "Authorization":"Basic " + rfc,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    }

    request(options)
          .then((parseResp) => {
              //do something
              tok =  JSON.parse(parseResp).access_token;
          })
          .catch(function(err) {
              console.log("OAuth Twitter POST failed "+ err);
          });
  }
}

function getRetweeters(payload){
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
    bearer_token: tok,
  });

  var setBearerToken = (bt) => {
    this.setBearerToken = bt;
  }

  Twitter.prototype.setBearerToken = setBearerToken;

  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    if (!error) {
      console.log("error " + error);
    }
    console.log(tweets);
 });
}

function main() {
  getRetweeters("helplo");
}

main();
