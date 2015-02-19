//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Pubsub = require('../lib/eventchannel'),
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp'),
    URLSlugs = require('mongoose-url-slugs');

var Device = new Schema({
    uuid        : { type: String, required: true, index: { unique: true, sparse: true } },
    name        : { type: String, trim: true },
    description : {type: String, trim: true},
    status      : {type: String, trim: true},
    _type       : { type: Schema.ObjectId, ref: 'DeviceType' },
    _location   : { type: Schema.ObjectId, ref: 'Location' }
});

//////Event Types
///TODO: Figure out how to catch validation errors!!!!
var eventType;
Device.pre('save', function (next) {
    eventType = this.isNew ? 'create' : 'update';

    this.on('error', function(){
        Pubsub.emit('device.error', this);
    }.bind(this));

    next();
});

Device.post('validate', function (doc) {
  console.log('%s has been validated (but not saved yet)', doc._id, doc);
})

Device.post('save', function(doc){
    Pubsub.emit('device.'+eventType, this);
    eventType = null;
});

Device.post('remove', function (doc) {
    Pubsub.emit('device.delete', doc);
});
////////////

Device.plugin(uuidPplugin);
Device.plugin(timestamps);
Device.plugin(URLSlugs('name', {field: 'slug'}));


module.exports = mongoose.model('Device', Device);
