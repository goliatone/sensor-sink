//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp');

var Configuration = new Schema({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true } },
    name        : { type: String, trim: true },
    description : { type: String, trim: true },
    _device     : { type: Schema.ObjectId, ref: 'Device' },
    data        : {}
});


Configuration.virtual('device').get(function () {
    return this._device;
});

Configuration.virtual('device').set(function (device) {
    var id = device._id ? device._id :  device;
    this._device = id;
});

Configuration.plugin(timestamps);
Configuration.plugin(uuidPplugin);


module.exports = mongoose.model('Configuration', Configuration);
