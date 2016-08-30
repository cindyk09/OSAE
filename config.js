var pkgcloud = require('pkgcloud-bluemix-objectstorage');
//
// // Create a config object
//     var config = {};
//
// // Specify Openstack as the provider
//     config.provider = "openstack";
//
// // Authentication url
//     config.authUrl = "https://identity.open.softlayer.com";
//     config.region= 'dallas';
//
// // Use the service catalog
//     config.useServiceCatalog = true;
//
// // true for applications running inside Bluemix, otherwise false
//     config.useInternal = false;
//
// // projectId as provided in your Service Credentials
//     config.tenantId = 'b25a2db311904b00b15df4bc9ddc1a04';
//
// // userId as provided in your Service Credentials
//     config.userId = 'c3a4d6b7c5a64b8bbed0a093d6baf9dc';
//
// // username as provided in your Service Credentials
//     config.username = 'admin_9b52629a333e418ba73456a1a8529beca21ce48f';
//
// // password as provided in your Service Credentials
//     config.password = 'TRDqO1M^2B!&p7S8';
//
// // This is part which is NOT in original pkgcloud. This is how it works with newest version of bluemix and pkgcloud at 22.12.2015.
// //In reality, anything you put in this config.auth will be send in body to server, so if you need change anything to make it work, you can. PS : Yes, these are the same credentials as you put to config before.
// //I do not fill this automatically to make it transparent.
//
// config.auth = {
//     forceUri  : "https://identity.open.softlayer.com/v3/auth/tokens", //force uri to v3, usually you take the baseurl for authentication and add this to it /v3/auth/tokens (at least in bluemix)
//     interfaceName : "public", //use public for apps outside bluemix and internal for apps inside bluemix. There is also admin interface, I personally do not know, what it is for.
//     "identity": {
//         "methods": [
//             "password"
//         ],
//         "password": {
//             "user": {
//                 "id": "c3a4d6b7c5a64b8bbed0a093d6baf9dc", //userId
//                 "password": "TRDqO1M^2B!&p7S8" //userPassword
//             }
//         }
//     },
//     "scope": {
//         "project": {
//             "id": "b25a2db311904b00b15df4bc9ddc1a04" //projectId
//         }
//     }
// };
//
// // console.log("config: " + JSON.stringify(config));
config={
  "hostname": "pub-redis-14848.dal-05.1.sl.garantiadata.com",
        "password": "OZfrkd9Gbv18RBIg",
        "port": "14848"
};
module.exports=config;
