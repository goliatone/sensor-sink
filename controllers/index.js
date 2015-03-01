var restful = require('../lib/restful');

var models = require('../models')();

module.exports = function(app){

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

    return restful;

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
