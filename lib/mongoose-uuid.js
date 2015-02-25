var uuid = require('uuid');

/**
 * Generate an uuid for new instances if
 * not present.
 * @param  {Object} schema  Mongoose schema
 * @param  {Object} options Options object
 * @return {void}
 */
function uuidPlugin(schema, options){

    options || (options = {});

    var prop = options.property || 'uuid';

    schema.pre('save', function(next){

        if(this.isNew && !this.uuid){
            this[prop] = _generateUUID();
        }

        next();
    });
}

function _generateUUID(){
    return uuid.v1();
}

uuidPlugin.generateUUID = _generateUUID;

module.exports = uuidPlugin;
