var express = require('express');
var app = express();
var path = require("path");

app.get('/', function(req, res){
  // res.sendFile takes an absolute path to a file and
  // sets the mime type based n the file extname
  res.sendFile(__dirname + '/index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});


app.listen(3000);

console.log("Running at Port 3000");
