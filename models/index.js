
var express = require('express');

var models = {};

models.Device = require('./device');
models.Configuration = require('./configuration');
models.Location = require('./location');
models.Sublocation = require('./sublocation');
models.DeviceType = require('./deviceType');
models.Sensor = require('./sensor');
models.User = require('./user');

module.exports = function register(app){
    console.log('REGISTER models');

    var restful = require('../lib/restful');


    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'devices',
        collection: models.Device
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'sensors',
        collection: models.Sensor
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'configurations',
        collection: models.Configuration
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'locations',
        collection: models.Location
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'sublocations',
        collection: models.Sublocation
    });

    restful.addResource({
        app: app,
        urlPrefix: 'api',
        resourceSlug: 'device-types',
        collection: models.DeviceType
    });

    return models;

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
