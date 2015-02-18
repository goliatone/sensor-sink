//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp');


var Location = new Schema({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true } },
    name        : {type: String, trim: true},
    description : {type: String, trim: true},
    geolocation : {
        lng: Number,
        lat: Number
    }
});

//Make a self reference
var Sublocation = new Schema();
Sublocation.add({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true }},
    name        : { type: String, trim: true},
    description : {type: String, trim: true},
    _location   : [{ type: Schema.ObjectId, ref: 'Sublocation' }]
});

Sublocation.set('toJSON', {
    trasnsform: function(doc, ret, options){
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
    }
});

var DeciveType = new Schema({
    name        : { type: String, trim: true },
    description : {type: String, trim: true},
    label       : { type: String, trim: true, index: true },
    metadata    : Schema.Types.Mixed
});

var Device = new Schema({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true } },
    name        : { type: String, trim: true },
    description : {type: String, trim: true},
    status      : {type: String, trim: true},
    _type       : { type: Schema.ObjectId, ref: 'DeviceType' },
    _location   : { type: Schema.ObjectId, ref: 'Location' }
});


Device.plugin(uuidPplugin);

Location.plugin(uuidPplugin);
DeciveType.plugin(uuidPplugin);
Sublocation.plugin(uuidPplugin);

Device.plugin(timestamps);
Location.plugin(timestamps);
DeciveType.plugin(timestamps);
Sublocation.plugin(timestamps);


exports.Device = mongoose.model('Device', Device);
exports.Location = mongoose.model('Location', Location);
exports.Sublocation = mongoose.model('Sublocation', Sublocation);
exports.DeviceType = mongoose.model('DeviceType', DeciveType);
