var bbt = require('beebotte');
var Pubsub = require('../lib/eventchannel');

var bclient = new bbt.Connector({
    keyId: process.env.NODE_BEEBOTTEB_ACCESS_KEY,
    secretKey: process.env.NODE_BEEBOTTEB_SECRET_KEY
});

var variables = {
    t: 'temperature', //temperature
    h: 'humidity', //humidity
    l: 'light', //light
    s: 'sound', //sound
    m: 'movement', //motion
    u: 'ultrasound_ranger' //ultra sound ranger
};

module.exports = function register(app, server){
  Pubsub.on('live-tracker', function(data){
    data = data || [];
    if(!Array.isArray(data)) data = [data];

    var sent = {};

    data.map(sendValues);

    function sendValues(values){
      // console.log('VALUES', JSON.stringify(values, null, 4));
        Object.keys(values).map(function(key){
            if(!variables.hasOwnProperty(key)) return;
            if(sent.hasOwnProperty(key)) return;
            sent[key] = true;
            if(key === 'm') values[key] = !!values[key];
            console.log('SENDING', variables[key], values[key]);
            bclient.write({
              channel: 'sensornet',
              resource: variables[key],
              data: values[key]
            }, function(err, res) {
              if(err) console.log(err);
            });
        });
    }

  });
};
