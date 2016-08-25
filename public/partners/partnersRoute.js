var express = require('express');
var path = require('path');
var client=require('../../app');
var redis=require('redis');
// var html = require('html');
var router = express.Router();

var company_info;

router.get('/:company_name',function(req,res){
  var company = req.params.company_name;
  client.redis_client.hgetall(company,function(err,obj){
    company_info=obj;
    console.log(company_info);
    res.render(path.join(__dirname,'partner_template.ejs'),{company_name: company,company_address: company_info['company address'],company_website: company_info['company website'],mission_statement: company_info['mission statement']});
  });

});

module.exports = router;
