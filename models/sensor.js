//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Pubsub = require('../lib/eventchannel'),
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp'),
    URLSlugs = require('mongoose-url-slugs');

var Sensor = new Schema({
    uuid        : { type: String/*, required: true*/, index: true },
    timestamp: {type: Number}
},
{
    strict: false
});

//////Event Types
///TODO: Figure out how to catch validation errors!!!!
var eventType;
Sensor.pre('save', function (next) {
    eventType = this.isNew ? 'create' : 'update';

    this.on('error', function(){
        Pubsub.emit('device.error', this);
    }.bind(this));

    next();
});

Sensor.post('validate', function (doc) {
    // console.log('%s has been validated (but not saved yet)', doc._id, doc);
})

Sensor.post('save', function(doc){
    Pubsub.emit('device.'+eventType, this);
    eventType = null;
});

Sensor.post('remove', function (doc) {
    Pubsub.emit('device.delete', doc);
});
////////////

Sensor.plugin(uuidPplugin);
// Sensor.plugin(timestamps);


module.exports = mongoose.model('Sensor', Sensor);
