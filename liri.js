var keys = require("./keys.js");

var request = require("request");

var spotify = require("spotify")

var Twitter = require('twitter');

var fs = require("fs");

  command = process.argv;

  task = command[2];

  taskTarget = command[3];
  append(task+taskTarget);

function append(data) {
  fs.appendFile("log.txt"," "+data+" ",function (error) {

    if(error) {
      console.log(error);
    }
  });
}

  

function runTwitter () {

  var myTweets = new Twitter ({

    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });


  var params = {screen_name: 'DaskalDM'};
  myTweets.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      numTweets = tweets.length;
      if (numTweets > 20) {
        numTweets = 20;
      }
      
       for(i = 0; i < numTweets; i++) {
        
        console.log("Tweet created on: "+tweets[i].created_at);
        console.log(tweets[i].text);
       }
   }

  });

 }


 
function spotifyThis(songName) {
  if (!songName) {
    songName = "what's my age again";
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    songArtist = data.tracks.items[0].artists[0].name;
    songLink = data.tracks.items[0].album.external_urls.spotify;
    album = data.tracks.items[0].album.name;

    console.log(songArtist);
    console.log(songName);
    console.log(songLink);
    console.log(album);
     
  });

 }

function movieTHis (moviename) {

  if (!moviename) {
    moviename = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?t="+moviename+"&y=&plot=short&r=json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    jsonBody = JSON.parse(body);
    console.log(jsonBody.Title);
    console.log(jsonBody.Year);
    console.log(jsonBody.imdbRating);
    console.log(jsonBody.Country);
    console.log(jsonBody.Language);
    console.log(jsonBody.Actors);
    console.log(jsonBody.Plot);
      }
      });

    }

  function doRandom() { 
  fs.readFile("random.txt","utf8", function(err,data) {

    if (err) {
      console.log(err);
    }

    var randomCommand = (data.split(","));

    task = randomCommand[0];

    taskTarget = randomCommand[1];

    console.log(task);
    console.log(taskTarget);

    chooseTask();
    
    });
   }

    if (task == "do-what-it-says") {

      doRandom();
    }

     else {

      chooseTask();
     }



   function chooseTask () {

    if (task == "spotify-this-song") {

      spotifyThis(taskTarget);
    }

    else if (task == "my-tweets") {

      runTwitter();
    }

    else if (task == "movie-this") {

      movieTHis(taskTarget);
    }
  }


// still need help understanding... 