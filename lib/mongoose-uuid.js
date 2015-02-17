var uuid = require('uuid');

function uuidPplugin(schema, options){
    schema.pre('save', function(next){
        if(this.isNew && !this.uuid){
            this.uuid = uuid.v1();
        }
        next();
    });
}

module.exports = uuidPplugin