//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp');

var Device = new Schema({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true } },
    name        : { type: String, trim: true },
    description : {type: String, trim: true},
    status      : {type: String, trim: true},
    _type       : { type: Schema.ObjectId, ref: 'DeviceType' },
    _location   : { type: Schema.ObjectId, ref: 'Location' }
});


Device.plugin(uuidPplugin);
Device.plugin(timestamps);



module.exports = mongoose.model('Device', Device);
