//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');


var Location = new Schema({
    uuid        : { type: String, required: true, index: { unique: true, sparse: true } },
    name        : String,
    description : String,
    geolocation : {
        lng: Number,
        lat: Number
    }
});

var Sublocation = new Schema();
Sublocation.add({
    uuid      : { type: String, required: true, index: { unique: true, sparse: true }},
    name      : { type: String, index: true },
    description : String,
    _location  : [Sublocation]
});

var DeciveType = new Schema({
    name        : String,
    description : String,
    label       : String,
    metadata    : Schema.Types.Mixed
});

var Device = new Schema({
    uuid        : { type: String, required: true, index: { unique: true, sparse: true } },
    name        : String,
    description : String,
    status      : String,
    _type       : { type: Schema.ObjectId, ref: 'DeviceType' },
    _location   : { type: Schema.ObjectId, ref: 'Location' }
});



Device.plugin(timestamps);
Location.plugin(timestamps);
DeciveType.plugin(timestamps);
Sublocation.plugin(timestamps);


exports.Device = mongoose.model('Device', Device);
exports.Location = mongoose.model('Location', Location);
exports.Sublocation = mongoose.model('Sublocation', Sublocation);
exports.DeviceType = mongoose.model('DeviceType', DeciveType);
