define('numberwidget', function(require){

    require('css!/js/app/widgets/number/number');

    var template = require('text!/js/app/widgets/number/number.html');

    //TODO: State feedback. Reading...
    var Ractive = require('ractive');

    var NumberWidget = Ractive.extend({
        template: template,
        append:true,
        logger: console,
        onrender: function(o){

        },
        registerModel:function(dispatcher, keypath, options){
            options = options || {};

            this.logger.log('REGISTER', keypath);
            dispatcher.observe(keypath, function(newValue){
                if(newValue === undefined) return;

                //We might want to transform our values before displaying.
                if(options.transform) newValue = options.transform.func(newValue, options.transform.ops);

                this.set('value', newValue);
            }.bind(this));
        },
        data: {
            type:'widget',
            value: '-',
            units: '˚C',
            label: 'Temperature'
        }
    });

    NumberWidget.register = function(id){
        Ractive.components[id] = NumberWidget;
    };

    Ractive.components['number-widget'] = NumberWidget;

    return NumberWidget;
});
