define('numberwidget', function(require){
    console.log('NUMBER WIDGET');

    require('css!/js/app/widgets/number/number');

    var template = require('text!/js/app/widgets/number/number.html');


    var Ractive = require('ractive');
    var NumberWidget = Ractive.extend({
        template: template,
        append:true,
        data:{
            value: 23,
            units: '˚C',
            label: 'Temperature'
        }
    });

    Ractive.components['number-widget'] = NumberWidget;

    return NumberWidget;
});