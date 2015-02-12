require('tungus');

var restful = require('node-restful'),
    path = require('path'),
    mongoose = restful.mongoose;

mongoose.connect('tingodb://' + __dirname + '/data');

module.exports = function register(app){
    console.log('REGISTER models');

    //curl -H "Content-Type: application/json" -d '{"uuid":"xyz","token":"AD90ADF90ADF88ADF0ADF", "timestamp":1423761255422}' http://localhost:3000/api/devices
    var Device = app.Device = restful.model('device', mongoose.Schema({
        uuid: 'string',
        token:'string',
        timestamp:  'number',
    }))
    .methods(['get', 'post', 'put', 'delete']);

    Device.route('scan.get', function(req, res, next) {
        res.send('DEVICE:I have a recommendation for you!');
    });

    Device.register(app, '/api/devices');
};

// var db = require('./../mongooseModels'),
//     restful = require('../restful');

// restful.addResource({
//   app: app,
//   urlPrefix: 'api',
//   resourceName: 'users',
//   collection: db.user
// });
