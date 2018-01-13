require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var commandLine = process.argv[2];
var userInput = process.argv[3];


switch (commandLine) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        asYouWish();
        break;
    default:
        console.log("Enter a command");
        break;
}


//===================================================================
//                         TWITTER
//===================================================================
function twitter() {

    var Twitter = require('twitter');

    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: 'homeworkexampl1',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("====================================================================================================");
                console.log("> ", tweets[i].text);
                console.log("====================================================================================================");
                console.log(" ");

            }
        }
    });

}

//===================================================================
//                         SPOTIFY
//===================================================================
var songTitle = "";

function spotify() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    var nodeSpotify = process.argv;

    for (var i = 3; i < nodeSpotify.length; i++){
        if (i > 3 && i < nodeSpotify.length){
            songTitle = songTitle + " " + nodeSpotify[i];
        }
        else{
            songTitle =+ nodeSpotify[i];
        }
    }

    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else if (err, data){
    
        console.log("====================================================================================================");
        console.log("Artist Name: ", data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: ", songTitle);
        console.log("Preview URL: ", data.tracks.items[0].preview_url);            
        console.log("Album Title: ", data.tracks.items[0].album.name);
        console.log("====================================================================================================");
        }
        else{
        console.log("---------------------------------");
        console.log("The Sign, Ace of Base");
        }
    });
}