define('numberwidget', function(require){
    console.log('NUMBER WIDGET');

    var Ractive = require('ractive');
    var NumberWidget = Ractive.extend({
        template:'#numberwidget-template',
        append:true
    });

    Ractive.components['number-widget'] = NumberWidget;

    return NumberWidget;
});