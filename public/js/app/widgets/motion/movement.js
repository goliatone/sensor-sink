define('movementwidget', function(require){
    console.warn('EHRE')
    require('css!/js/app/widgets/motion/movement');
console.warn('EHRE')
    var template = require('text!/js/app/widgets/motion/movement.html');

    //TODO: State feedback. Reading...
    var Ractive = require('ractive');

    var MovementWidget = Ractive.extend({
        template: template,
        append:true,
        init:function(o){
            this.observe('value', function(newValue, oldValue, keypath) {
                var status = newValue === 1 ? 'on' : 'off';
                this.set('status', status);
                console.log('STATUS', status);
            });
        },
        data: {
            type:'widget',
            value: 0,
            status:'off',
            location:'',
            label: 'Movement',
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