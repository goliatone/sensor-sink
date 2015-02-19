//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp'),
    URLSlugs = require('mongoose-url-slugs');

var DeciveType = new Schema({
    name        : { type: String, trim: true },
    description : {type: String, trim: true},
    label       : { type: String, trim: true, index: true },
    metadata    : Schema.Types.Mixed
});


DeciveType.plugin(uuidPplugin);
DeciveType.plugin(timestamps);
DeciveType.plugin(URLSlugs('name', {field: 'slug'}));

module.exports = mongoose.model('DeviceType', DeciveType);
