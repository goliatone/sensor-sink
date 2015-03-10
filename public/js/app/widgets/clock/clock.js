define('clock', function(require){
    require('css!clock');
    var template = require('text!clock.html');

    var Ractive = require('ractive');

    var ClockWidget = Ractive.extend({
        template: template,
        append: true,
        logger: console
    });

    ClockWidget.register = function(id){
        Ractive.components[id] = ClockWidget;
    };

    return ClockWidget;
});

