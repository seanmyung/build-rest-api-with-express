'use strict';

var seeder = require('mongoose-seeder'); 
var	data = require('./data/data.json'); 

seeder.seed(data).then(function(dbData) {
    // The database objects are stored in dbData
    console.log('Successfully created in' + dbData);
}).catch(function(err) {
    // handle error
    console.error("Seeding connection error:" + err);
});