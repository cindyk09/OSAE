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
    // console.log(company_info['file']);

    res.render(path.join(__dirname,'partner_template.ejs'),{
      company_name: company,
        website: company_info['website'],
        mission_statement: company_info['mission statement'],
        image: company_info['image'],
        description: company_info['description']
      });

  });

});

module.exports = router;
