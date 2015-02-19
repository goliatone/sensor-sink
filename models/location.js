//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp'),
    URLSlugs = require('mongoose-url-slugs');


var Location = new Schema({
    uuid        : { type: String/*, required: true*/, index: { unique: true, sparse: true } },
    name        : {type: String, trim: true},
    description : {type: String, trim: true},
    geolocation : {
        lng: Number,
        lat: Number
    }
});


Location.plugin(uuidPplugin);
Location.plugin(timestamps);
Location.plugin(URLSlugs('name', {field: 'slug'}));

module.exports = mongoose.model('Location', Location);
