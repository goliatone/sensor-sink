//Need to do this before requiring moongose, tungus is tingodb
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    uuidPplugin = require('../lib/mongoose-uuid'),
    timestamps = require('mongoose-timestamp');

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

Sublocation.plugin(uuidPplugin);
Sublocation.plugin(timestamps);

module.exports = mongoose.model('Sublocation', Sublocation);
