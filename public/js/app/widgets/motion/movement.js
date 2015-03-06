define('movementwidget', function(require){

    require('css!/js/app/widgets/motion/movement');
    var template = require('text!/js/app/widgets/motion/movement.html');

    //TODO: State feedback. Reading...
    var Ractive = require('ractive');

    var MovementWidget = Ractive.extend({
        template: template,
        append: true,
        logger: console,
        onrender: function(o){

            this.observe('value', function(newValue, oldValue, keypath) {
                if(newValue === 0 && this.timeOut) return;

                var status = (newValue === 1) ? 'on' : 'off';
                this.set('status', status);

                if(newValue === 0) return;

                var delay = this.get('movementPeriod');
                clearTimeout(this.timeOut);
                this.timeOut = setTimeout(this.resetMovement.bind(this), delay);
            });
        },
        resetMovement: function(){
            this.set('status', 0);
        },
        registerModel: function(dispatcher, keypath){
            dispatcher.observe(keypath, function(newValue, oldValue){
                // console.log('NEW %s OLD %s', newValue, oldValue);
                if(newValue === undefined) return;
                this.set('value', newValue);
            }.bind(this));
        },
        data: {
            type:'widget',
            value: 0,
            status:'off',
            location:'',
            label: 'Movement',
            movementPeriod:(4 * 60 * 1000),
            getStatus: function(){
                return this.get('value') === 0 ? 'off' : 'on';
            }
        }
    });

    MovementWidget.register = function(id){
        Ractive.components[id] = MovementWidget;
    };

    return MovementWidget;
});