var express = require('express');
var path = require('path');
var client=require('../../app');
var redis=require('redis');
var fs =require('fs');
var multer  = require('multer')
// var uploading = multer({
//   dest: __dirname + '../public/uploads/',
//   limits: {fileSize: 10000000, files:1}
// });
var upload = multer();
var router = express.Router();


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/certification.html'));
});

router.post('/',upload.any(),function(req,res){
  console.log(req.files)
  var company_name=req.body.company_name,
  website = req.body.website,
  company_address1 = req.body.company_address1,
  company_address2 = req.body.company_address2,
  city = req.body.city,
  state = req.body.state,
  zip_code = req.body.zip_code,
  image = req.files,
  mission_statement = req.body.mission_statement,
  description = req.body.description,
  first_name_1 = req.body.first_name_1,
  last_name_1 = req.body.last_name_1,
  email_1 = req.body.email_1,
  position_1 = req.body.position_1,
  product_name = req.body.product_name,
  product_version = req.body.product_version,
  product_date = req.body.product_date,
  sla = req.body.sla,
  os_info_1 = req.body.os_info_1,
  product_description = req.body.product_description,
  product_use_case = req.body.product_use_case,
  unit_test_cases = req.body.unit_test_cases,
  support_kerberos = req.body.support_kerberos,
  test_kerberos = req.body.test_kerberos,
  hadoop = req.body.hadoop,
  spark = req.body.spark;



  console.log(req.files.logo);
  console.log(req.body);
  // fs.readFile(req.files.logo.path,function(err,data){

    // console.log(data);
    // https://identity.open.softlayer.com/v3/b25a2db311904b00b15df4bc9ddc1a04/partners/file.png
    // client.storage
  // });
  // console.log(client.redis_client);
  client.redis_client.hmset(
    company_name,
    'company website', website,
    'company address 1', company_address1,
    'company address 2',company_address2,
    'city', city,
    'state', state,
    'zip code', zip_code,
    'mission statement', mission_statement,
    'description', description,
    'first name 1', first_name_1,
    'last name 1', last_name_1,
    'email_1', email_1,
    'position 1', position_1,
    'product name', product_name,
    'product version', product_version,
    'product date', product_date,
    'sla', sla,
    'os info 1', os_info_1,
    'product description', product_description,
    'product_use_case', product_use_case,
    'unit test cases', unit_test_cases,
    'support kerberos', support_kerberos,
    'test kerberos', test_kerberos,
    'hadoop', hadoop,
    'spark', spark

  );


  res.redirect('/partners/'+company_name);
});


module.exports = router;
