var request = require('request');
var Pubsub = require('../lib/eventchannel');

//TODO: Move to config, dynamically
var variables = {
    t: '558ca8f87625426ea07886b5', //temperature
    h: '558ca90e76254270ececd104', //humidity
    l: '558ca92776254270053855c0', //light
    s: '558ca93776254270053855c8', //sound
    m: '558ca95b7625426d91c8addd', //motion
    u: '558ca95b7625426d91c8addd' //ultra sound ranger
};

var url = process.env.NODE_UBIDOTS_URL;
var token = process.env.NODE_UBIDOTS_TOKEN;

module.exports = function register(app, server) {
    Pubsub.on('live-tracker', function(data){
        data = data || [];
        if(!Array.isArray(data)) data = [data];

        var payload = [];
        data.map(function(values){
            Object.keys(values).map(function(key){
                if(!variables.hasOwnProperty(key)) return;
                payload.push({
                    variable: variables[key],
                    value: values[key]
                })
            });
        });

        console.log('Ubidots save', Date.now());

        request({
            url: url,
            method: 'POST',
            json: true,
            headers: {
                'X-Auth-Token': token,
            },
            body: payload
        }, function (error, response, body){
            if(error) console.log(JSON.stringify(error, null, 4));
            // else console.log(JSON.stringify(response, null, 4));
        });
    });
};
