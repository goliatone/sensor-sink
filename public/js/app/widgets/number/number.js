define('numberwidget', function(require){
    console.log('NUMBER WIDGET');

    require('css!/js/app/widgets/number/number');

    var template = require('text!/js/app/widgets/number/number.html');

    //TODO: State feedback. Reading...
    var Ractive = require('ractive');

    var NumberWidget = Ractive.extend({
        template: template,
        append:true,
        init:function(o){

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