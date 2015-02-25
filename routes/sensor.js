var express = require('express');
var router = express.Router();
var Pubsub = require('../lib/eventchannel');
var Sensor = require('../models/sensor');

router.get('/', function(req, res) {
    res.send({
        success: true
    });
});

// router.get('/devices', function(req, res){});

//var unitTimestamp = Math.round((new Date()).getTime() / 1000);
//curl -H "Content-Type: application/json" -d '{"uuid":"xyz","t":30, "h":40, "tmp":1423761255422}' http://localhost:3000/sensor/collect
router.post('/collect', function(req, res){
    console.log('COLLECT', req.body);
    //THIS IS A JOKE :)
    Pubsub.emit('live-tracker', req.body);
    // router.app.server.io.sockets.in('live-tracker').emit('kaka', req.body);
    if(req.body) Sensor.create(req.body);

    res.send({
        status: true
    });
});


module.exports = function register(app) {
    app.use('/sensor', router);
    router.app = app;
};
