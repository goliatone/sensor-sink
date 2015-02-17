var uuid = require('uuid');

/**
 * Generate an uuid for new instances if
 * not present.
 * @param  {Object} schema  Mongoose schema
 * @param  {Object} options Options object
 * @return {void}
 */
function uuidPplugin(schema, options){

    options || (options = {});

    var prop = options.property || 'uuid';

    schema.pre('save', function(next){

        if(this.isNew && !this.uuid){
            this[prop] = uuid.v1();
        }

        next();
    });
}

module.exports = uuidPplugin