var extend = require('gextend');

var Model = require('mongoose').Model;

function patchModel(){

    var _oldUpdate = Model.update;

    function update (conditions, doc, options, callback) {

      return _oldUpdate.call(Model, arguments)
    }

    Model.update = update;
}


var done = false;

var DEFAULTS = {
    pubSub: function(Schema, options){
        return {
            on: function(){},
            off: function(){},
            emit: function(){}
        };
    },
    eventGlue: '.',
    errorEventType: 'error',
    createEventType: 'create',
    updateEventType: 'update',
    deleteEventType: 'delete',

    preSaveEventType: function(doc, o){
        return doc.isNew ? o.createEventType : o.updateEventType;
    },
    buildErrorEventType: function(doc, o){
        return [o.schemaName, o.errorEventType].join(o.eventGlue);
    },
    buildSaveEventType: function(doc, o, eventType){
        return [o.schemaName, eventType].join(o.eventGlue);
    },
    buildDeleteEventType: function(doc, o){
        return [o.schemaName, o.deleteEventType].join(o.eventGlue);
    }

};

function pubsub(Schema, options){
    options = extend({}, DEFAULTS, options);

    if(!options.schemaName){
        if(!Schema.options.resourceName){
            throw new Error('Mongoose PubSub plugin needs proper config. Provide schemaName');
        }
        options.schemaName = Schema.options.resourceName;
    }

    var eventType,
        Pubsub = options.pubSub(Schema, options);

    Schema.pre('save', function (next) {
        console.log('SAVE')
        eventType = options.preSaveEventType(this, options);
        next();
    });

    Schema.post('validate', function (doc) {
        console.log('VALIDATE')
        if(!doc.errors) return;
        var type = options.buildErrorEventType(doc, options);
        Pubsub.emit(type, doc);
    })

    Schema.post('save', function(doc){
        console.log('POST SAVE')
        var type = options.buildSaveEventType(doc, options, eventType);
        Pubsub.emit(type, this);
        eventType = null;
    });

    Schema.post('remove', function (doc) {
        console.log('REMOVE')
        var type = options.buildDeleteEventType(doc, options);
        Pubsub.emit(type, doc);
    });
}


module.exports = pubsub;
