//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Pubsub = require('../lib/eventchannel'),
    URLSlugs = require('mongoose-url-slugs'),
    timestamps = require('mongoose-timestamp'),
    uuidPplugin = require('../lib/mongoose-uuid'),
    pubSubPlugin = require('../lib/mongoose-pubsub');

var Device = new Schema({
    uuid: {
        type: String /*, required: true*/ ,
        index: {
            unique: true,
            sparse: true
        }
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    _type: {
        type: Schema.ObjectId,
        ref: 'DeviceType'
    },
    _location: {
        type: Schema.ObjectId,
        ref: 'Location'
    }
}, {
    resourceName: 'device'
});



Device.plugin(uuidPplugin);

Device.plugin(timestamps);

Device.plugin(pubSubPlugin, {
    pubSub: function() {
        return Pubsub;
    }
});

Device.plugin(URLSlugs('name', {
    field: 'slug'
}));


module.exports = mongoose.model('Device', Device);
