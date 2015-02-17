// var restful = require('node-restful'),
//     path = require('path'),
//     mongoose = restful.mongoose;

var express = require('express');


module.exports = function register(app){
    console.log('REGISTER models');

    var restful = require('../lib/restful');
    var models = require('./device');

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceName: 'devices',
        collection: models.Device
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceName: 'locations',
        collection: models.Location
    });

    return
    //curl -H "Content-Type: application/json" -d '{"uuid":"xyz","token":"AD90ADF90ADF88ADF0ADF", "timestamp":1423761255422}' http://localhost:3000/api/devices
    var Device = app.Device = restful.model('device', mongoose.Schema({
        uuid: 'string',
        type: 'string',

        // token:'string',
        // objectId: mongoose.Schema.ObjectId,
        timestamp:  'number',
    }))
    .methods(['get', 'post', 'put', 'delete']);

    Device.route('scan.get', function(req, res, next) {
        res.send('DEVICE:I have a recommendation for you!');
    });

    Device.register(app, '/api/devices');
};

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('SIGINT: Mongoose default connection disconnected.');
        process.exit(0);
    });
});

// var db = require('./../mongooseModels'),
//     restful = require('../restful');

// restful.addResource({
//   app: app,
//   urlPrefix: 'api',
//   resourceName: 'users',
//   collection: db.user
// });
