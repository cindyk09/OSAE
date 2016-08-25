/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
// var bodyParser = require('body-parser');
var redis = require('redis');
var config= require('./config');
var pkgcloud = require('pkgcloud-bluemix-objectstorage');

// create a new redis client and connect to our local redis instance
var client = redis.createClient(config.port,config.hostname);
client.auth(config.password);
// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});
// module.exports=client;

// create a new OBJECT STORAGE client and connect accordingly through config file.
// this is for storing company logos / images only.

// var storageClient = pkgcloud.storage.createClient(config);
//
// // Authenticate to OpenStack
//      storageClient.auth(function (error) {
//         if (error) {
//             console.error("storageClient.auth() : error creating storage client: ", error);
//         }
//         else {
//             // Print the identity object which contains your Keystone token.
//             console.log("storageClient.auth() : created storage client: ");
//             // + JSON.stringify(storageClient._identity)
//         }
//
//     });
var storageClient;
//export object storage client and redis client -> used in routes
module.exports={storage: storageClient,redis_client: client};



// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');


// create a new express server
var app = express();

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));



app.use(express.static(__dirname + '/public')); // serve the files out of ./public as our main files
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res){
  // res.sendFile takes an absolute path to a file and
  // sets the mime type based n the file extname
  res.sendFile(__dirname + 'index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
  // use this to autopopulate the partner cards in INDEX.HTML
  // res.render(path.join(__dirname,'index.ejs'),function(err) {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  // });
});

app.get('/servers',function(req, res) {
  res.sendFile(__dirname + '/public/server.html')
});

app.use('/certification', require('./public/certification/certificationRoute'));
app.use('/partners', require('./public/partners/partnersRoute'));


// TODO ALSO WHEN PUSHING TO BLUEMIX, CHANGE config.js file. Some parts of code need to be changed from 'public' to 'internal'

var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.listen(3000);
console.log("Running at Port 3000");
