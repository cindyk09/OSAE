var express = require('express');
var path = require('path');
var client=require('../../app');
var redis=require('redis');
var multer  = require('multer')
//email service
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var upload = multer();
var router = express.Router();


// email-transporter options
var options = {
  auth: {
    api_user: 'mziff',
    api_key: 'overwatch3'
  }
}

router.get('/',function(req,res){
  
  res.render(path.join(__dirname,'certification.ejs'));

});

router.post('/',upload.any(),function(req,res){
  console.log(req.files)
  var company_info={};

  company_info.company_name=req.body.company_name;
  company_info.website = req.body.website;
  company_info.company_address1 = req.body.company_address1;
  company_info.company_address2 = req.body.company_address2;
  company_info.city = req.body.city;
  company_info.state = req.body.state;
  company_info.zip_code = req.body.zip_code;
  // company_info.image = req.files;
  company_info.mission_statement = req.body.mission_statement;
  company_info.description = req.body.description;
  company_info.first_name_1 = req.body.first_name_1;
  company_info.last_name_1 = req.body.last_name_1;
  company_info.email_1 = req.body.email_1;
  company_info.position_1 = req.body.position_1;
  company_info.product_name = req.body.product_name;
  company_info.product_version = req.body.product_version;
  company_info.product_date = req.body.product_date;
  company_info.sla = req.body.sla;
  company_info.os_info_1 = req.body.os_info_1;
  company_info.product_description = req.body.product_description;
  company_info.product_use_case = req.body.product_use_case;
  company_info.unit_test_cases = req.body.unit_test_cases;
  company_info.support_kerberos = req.body.support_kerberos;
  company_info.test_kerberos = req.body.test_kerberos;
  company_info.hadoop = req.body.hadoop;
  company_info.spark = req.body.spark;


  console.log(req.files.logo);
  console.log(req.body);

  client.redis_client.hmset(
    company_info.company_name,
    'company website', company_info.website,
    'company address 1', company_info.company_address1,
    'company address 2',company_info.company_address2,
    'city', company_info.city,
    'state', company_info.state,
    'zip code', company_info.zip_code,
    'mission statement', company_info.mission_statement,
    'description', company_info.description,
    'first name 1', company_info.first_name_1,
    'last name 1', company_info.last_name_1,
    'email_1', company_info.email_1,
    'position 1', company_info.position_1,
    'product name', company_info.product_name,
    'product version', company_info.product_version,
    'product date', company_info.product_date,
    'sla', company_info.sla,
    'os info 1', company_info.os_info_1,
    'product description', company_info.product_description,
    'product_use_case', company_info.product_use_case,
    'unit test cases', company_info.unit_test_cases,
    'support kerberos', company_info.support_kerberos,
    'test kerberos', company_info.test_kerberos,
    'hadoop', company_info.hadoop,
    'spark', company_info.spark

  );
  res.redirect('/partners/'+company_info.company_name);
  //
  var transporter=nodemailer.createTransport(sgTransport(options));
  var mailOptions = {
      from: '"matteo ziff" <mziff@us.ibm.com>', // sender address
      to: ' mziff@us.ibm.com,ckim@us.ibm.com', // list of receivers
      subject: "Company: "+company_info.company_name+" - Certified ✔", // Subject line
      html: 'Details: <p>company website: '+ company_info.website+
      '     <br>company address 1: '+ company_info.company_address1+
      '     <br>company address 2: '+company_info.company_address2+
      '     <br>city: '+ company_info.city+
      '     <br>state: '+ company_info.state+
      '     <br>zip code: '+ company_info.zip_code+
      '     <br>mission statement: '+ company_info.mission_statement+
      '     <br>description: '+ company_info.description+
      '     <br>first name 1: '+ company_info.first_name_1+
      '     <br>last name 1: '+ company_info.last_name_1+
      '     <br>email_1: '+ company_info.email_1+
      '     <br>position 1: '+ company_info.position_1+
      '     <br>product name: '+ company_info.product_name+
      '     <br>product version: '+ company_info.product_version+
      '     <br>product date: '+ company_info.product_date+
      '     <br>sla: '+ company_info.sla+
      '     <br>os info 1: '+ company_info.os_info_1+
      '     <br>product description: '+ company_info.product_description+
      '     <br>product_use_case: '+ company_info.product_use_case+
      '     <br>unit test cases: '+ company_info.unit_test_cases+
      '     <br>support kerberos: '+ company_info.support_kerberos+
      '     <br>test kerberos: '+ company_info.test_kerberos+
      '     <br>hadoop: '+ company_info.hadoop+
      '     <br>spark: '+ company_info.spark+'</p>'// plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});


module.exports = router;
