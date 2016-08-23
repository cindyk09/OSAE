var express = require('express');
var path = require('path');
var client=require('../../app');
var redis=require('redis');
var router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/certification.html'));
});

router.post('/',function(req,res){
  var company_name=req.body.company_name,
  company_address=req.body.company_address,
  website=req.body.website,
  mission_statement=req.body.mission_statement;
  client.hmset(company_name,'company address',company_address,'company website',website,'mission statement',mission_statement);
  res.redirect('/partners/'+company_name);
});


module.exports = router;
