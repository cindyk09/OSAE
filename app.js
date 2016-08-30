/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var redis = require('redis');
var app = express();


// REDIS

//setting up *secret* environment variables
if (process.env.VCAP_SERVICES) {
    var env = JSON.parse (process.env.VCAP_SERVICES);
    var redis_port=env['rediscloud'][0]['credentials'].port;
    var redis_hostname=env['rediscloud'][0]['credentials'].hostname;
    var redis_password=env['rediscloud'][0]['credentials'].password;
    var obj_username=env['Object-Storage'][0]['credentials'].username;
    var obj_password=env['Object-Storage'][0]['credentials'].password;
    var obj_authUrl=env['Object-Storage'][0]['credentials'].auth_url;
    var obj_tenantId=env['Object-Storage'][0]['credentials'].projectId;
    var obj_domainId=env['Object-Storage'][0]['credentials'].domainId;
    var obj_region=env['Object-Storage'][0]['credentials'].region;
}


// TODO bluemix server use this client
var client = redis.createClient(redis_port,redis_hostname);
client.auth(redis_password);

// TODO local server use this client
// var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});
//END REDIS



//OBJECT storage

var pkgcloud = require('pkgcloud');
 var config = {
   provider: 'openstack',
   useServiceCatalog: true,
   useInternal: true,
   keystoneAuthVersion: 'v3',
   authUrl: obj_authUrl,
   tenantId: obj_tenantId,
   domainId: obj_domainId,
   username: obj_username,
   password: obj_password,
   region: obj_region
 };
 var storageClient = pkgcloud.storage.createClient(config);



// var Obj_Client = require('ssh2').Client;
// var conn = new Obj_Client();
// conn.on('ready', function() {
//       console.log('Client :: ready');
//       conn.sftp(function(err, sftp) {
//             if (err) throw err;
//             sftp.readdir('/', function(err, list) {
//                   if (err) throw err;
//                   console.dir(list);
//                   result = list;
//                   conn.end();
//                   if(result.length>0){
//                         var fname = '';
//                         for(var i=0; i < result.length ; i++)
//                               fname = result[i].filename + ' , '+ fname;
//                         res.send('SFTP connected : ' + fname);
//                   }
//                   else
//                         res.send('SFTP not connected');
//             });
//       });
// }).connect({
//       host: "https://identity.open.softlayer.com",
//       port: 22,
//       username: "admin_8d673751668356896d5c7445c806c9fffcbf28a8",
//       password: "kJcj4(j}1F[Uh_92"
// });

// END OBJECT STORAGE

//export object storage client and redis client -> used in routes
module.exports={obj_client: storageClient, redis_client: client};

// SETTING TEMPLATE ENGINE - EJS ENGINE
app.use(express.static(__dirname + '/public')); // serve the files out of ./public as our main files
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');



// get the app environment from Cloud Foundry



app.get('/', function(req, res){
  // res.sendFile takes an absolute path to a file and sets the mime type based n the file extname
  res.sendFile(__dirname + 'index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
});


app.use('/certification', require('./public/certification/certificationRoute'));
app.use('/partners', require('./public/partners/partnersRoute'));


// TODO ALSO WHEN PUSHING TO BLUEMIX, CHANGE config.js file. Some parts of code need to be changed from 'public' to 'internal'
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// app.listen(3000);
// console.log("Running at Port 3000");
