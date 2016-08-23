/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var redis = require('redis');

// create a new redis client and connect to our local redis instance
var client = redis.createClient();
module.exports=client;
// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });

app.get('/', function(req, res){
  // res.sendFile takes an absolute path to a file and
  // sets the mime type based n the file extname
  res.sendFile(__dirname + '/index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
});


app.use('/certification', require('./public/certification/certificationRoute'));

app.get('/:company_name',function(req,res){
  res.sendFile(path.join(__dirname+'/public/arimo.html'));
});

var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


// app.listen(3000);
// console.log("Running at Port 3000");
