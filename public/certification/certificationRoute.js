var express = require('express');
var path = require('path');
var client=require('../../app');
var redis=require('redis');
var fs =require('fs');
var router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/certification.html'));
});

router.post('/',function(req,res){

  var company_name=req.body.company_name,
  company_address=req.body.company_address,
  website=req.body.website,
  mission_statement=req.body.mission_statement;

  // image=req.files.logo;
  // fs.readFile(req.files.logo.path,function(err,data){

    // console.log(data);
    // https://identity.open.softlayer.com/v3/b25a2db311904b00b15df4bc9ddc1a04/partners/file.png
    // client.storage
  // });
  // console.log(client.redis_client);
  client.redis_client.hmset(company_name,'company address',company_address,'company website',website,'mission statement',mission_statement);


  res.redirect('/partners/'+company_name);
});


module.exports = router;
