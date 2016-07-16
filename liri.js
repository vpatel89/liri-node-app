var command = process.argv[2];

if (command === 'my-tweets') {
	var twitt = require('twitter');
	var keys = require('./keys').twitterKeys;
	var t = new twitt(keys);
	var params = {
		screen_name: 'virenpatel891',
		count: 20
	}

	t.get('statuses/user_timeline', params, function(err, data, response) {
		if (err) {
			console.error(err);
		} else {
			console.log('The Last 20 Tweets:')
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].text + " -(created on " + data[i].user.created_at + ")");
			}
		}
	});
} else if (command === 'spotify-this-song') {
	var spotify = require('spotify');
	var songName = process.argv.slice(3).join(' ');

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
			console.error(err);
		} else {
			var song = data.tracks.items[0].name
			var album = data.tracks.items[0].album.name;
			var artist = data.tracks.items[0].artists[0].name;
			var preview = data.tracks.items[0].preview_url;

			console.log('Song Title: ' + song);
			console.log('Artist: ' + artist);
			console.log('Album: ' + album);
			console.log('Preview Link: ' + preview);
		}
	});
} else if (command === 'movie-this') {
	var request = require('request');
	var movieName = process.argv.slice(3).join('+');
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
		if (!error && response.statusCode === 200) {
			if (!movieName) {
				console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
				console.log("It's on Netflix!")
			} else {
				var movieObject = JSON.parse(body);
				console.log(movieObject);
				console.log('Title: ' + movieObject.Title);
				console.log('Year: ' + movieObject.Year);
				console.log('IMDB Rating: ' + movieObject.imdbRating);
				console.log('Country Produced: ' + movieObject.Country);
				console.log('Language: ' + movieObject.Language);
				console.log('Plot: ' + movieObject.Plot);
				console.log('Actors: ' + movieObject.Actors);
				var movieNameRotTom = movieObject.Title.split(' ').join('_');
				console.log('Rotten Tomatoes Rating: ' + "");
				console.log('Rotten Tomatoes  URL: ' + 'https://www.rottentomatoes.com/m/' + movieNameRotTom + '/');
			}
		}
	});
} else if (command === 'do-what-it-says') {
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(error);
		} else {
		var liriArray = data;
		console.log("node liri.js " + data);
		}
	});
};