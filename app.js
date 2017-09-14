/*
-is there a correct order to initialize the variables?
-Can i set a cap on the amount of giphs that are sent to me for every
search term? Can i make a "load more" button to then load another say 20 giphs?
-what exactly does the '/' mean? In codepen i just copied and pasted the
html and css and clicking the button took me to the home page of codepen in the
live preview
-should i omit some of the files from git commits & pushing to github? If so
which ones and how can i commit the ones I need 

*/
var giphy = require('giphy-api')();
var exphbs = require('express-handlebars');
var express = require('express');
var app = express();
var https = require('https');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));



//path, web end point. defining web end point. Tree of unique path
app.get('/hello-gif', function (req, res){
  var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/greetings/:name', function (req, res){
  var name = req.params.name;
  res.render('greetings', {name: name});
});

//root route (url end point that goes to root path: /) to make homepage
app.get('/', function (req, res){
  //console.log(req.query);var term = encodeURIComponent(queryString);
  var queryString = encodeURIComponent(req.query.term);
  giphy.search(queryString, function (err, response){
    if (err) { return console.log(err) };

    res.render('home', { gifs: response.data });
  });
});

//listening
app.listen(3000, function(){
  console.log('Gif Search listening on port localhost:3000!');
});


/*
var queryString = req.query.term;
//Encode the query string to remove white space & restricted chars
var term = encodeURIComponent(queryString);
//put the search term into the giphy api search url
var url = 'https://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';
https.get(url, function(response){
  //set encoding response to utf8
  response.setEncoding('utf8');
  var body = ''
  response.on('data', function(d){
    body += d;
  });
  response.on('end', function(){
    //when data is fully received parse into json
    var parsed = JSON.parse(body);
    //render the home template and pass the Gif data in the template
    res.render('home', {gifs: parsed.data});
  });
});
*/
