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
var postOnlyLatest = true;

module.exports = function register(app, server) {
    Pubsub.on('live-tracker', function(data){
        data = data || [];
        if(!Array.isArray(data)) data = [data];

        //This would work to post only latest values
        //for most sensors is ok, since light/humidity are
        //linear in time. It is not ok for events such as
        //movement which change only once in a while and we
        //might be missing them. We do need a model and logic
        //per sensor type. Movement needs to be updated all time
        //Sound can be updated over time and we could average values
        //that do not get updated?
        if(postOnlyLatest) data = data.splice(0);

        data.map(sendValues);

        var payload = [];
        function sendValues(values){
            Object.keys(values).map(function(key){
                if(!variables.hasOwnProperty(key)) return;
                payload.push({
                    variable: variables[key],
                    value: values[key]
                })
            });
        }

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
