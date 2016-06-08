/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    baseUrl: 'js',
    paths: {
        'app': 'app/app',
        'socket': 'app/services/socket',
        'gpub': 'vendors/gpub/src/gpub',
        'text': 'vendors/requirejs-text/text',
        'clock': 'app/widgets/clock/clock',
        'sparkle': 'app/widgets/sparkle/sparkle',
        'numberwidget': 'app/widgets/number/number',
        'movementwidget': 'app/widgets/motion/movement',
        'io': '/socket.io/socket.io.js',
        'extend': 'vendors/gextend/src/extend',
        // 'keypath': 'components/gkeypath/keypath',
        // 'templatecontext': 'components/templatecontext/templatecontext',
        // 'preloader': 'views/preloader',
        'ractive': 'vendors/ractive/ractive',
        'd3': 'vendors/d3/d3',
        // 'jquery': 'components/jquery/jquery',
    },
    map: {
        '*': {
            'css': 'vendors/require-css/css'
        }
    }
});

define('main', function(require) {
    console.log('Loading');

    // require('css!vendors/gridism/gridism.css');

    var Client = require('socket');
    var socket = new Client();

    var App = require('app');

    var app = new App();

    var ClockWidget = require('clock');
    var SparkleWidget = require('sparkle');
    var NumberWidget = require('numberwidget');
    var MovementWidget = require('movementwidget');

    //NOTE: This has to happen before we render main view!!
    //TODO: Fix timing. Create a view driven way to register
    //widgets! Or at least with JSON.
    NumberWidget.register('sound-widget');
    NumberWidget.register('humidity-widget');
    NumberWidget.register('light-widget');
    NumberWidget.register('temperature-widget');

    MovementWidget.register('movement-widget');

    SparkleWidget.register('humidity-sparkle');
    SparkleWidget.register('temperature-sparkle');

    ClockWidget.register('clock-widget');

    var ractive = require('ractive');

    var view = new Ractive({
        el: 'content',
        debug: true,
        template: '#content-template',
        data:{
            location: 'R&D',
            title: 'Phonebooth Dashboard'
        }
    });

    socket.client.on('device.create', function(device){
        console.log('DEVICE CREATED', device)
    });

    socket.client.on('update', function(data){
        view.set('payload', data);
    });

    //TODO: Get from configuration file!
    var WIDGETS = [
        {id:'temperature-widget', keypath:'payload.*.t'},
        {id: 'light-widget', keypath:'payload.*.l', options:{transform: {func:luxTransformation, ops:{resistance:10}}}},
        {id: 'humidity-widget', keypath: 'payload.*.h'},
        {id: 'humidity-sparkle', keypath: 'payload.*.h', options:{label:'Humidity'}},
        {id: 'temperature-sparkle', keypath: 'payload.*.t', options:{label:'Temperature'}},
        {id: 'sound-widget', keypath: 'payload.*.s', options:{transform:{func: soundTransformation, ops:{gain: 0}}}},
        {id: 'movement-widget', keypath: 'payload.*.m'}
    ];


    WIDGETS.forEach(function(widget){
        view.findComponent(widget.id).registerModel(view, widget.keypath, widget.options);
    });

    window.view = view;

});

function luxTransformation(value, ops){
    if(!value) return 0;
    if(value === 0) return value;
    //http://forum.arduino.cc/index.php?topic=37555.0
    // http://www.seeedstudio.com/wiki/Grove_-_Light_Sensor
    var res0 = ops.resistance || 10;
    var vout = value * (5/1024);//5V gets split up into 1024 levels
    var lux = 500 / (res0 * (5 - vout)/vout);
    return lux.toFixed(ops.decimals || 2);
}

function soundTransformation(value, ops){
    if(!value) return 0;
    if(value === 0) return value;
    //http://www.seeedstudio.com/wiki/Grove_-_Sound_Sensor
    //http://www.seeedstudio.com/wiki/Grove_-_Loudness_Sensor
    //http://electronics.stackexchange.com/questions/96205/how-to-convert-volts-in-db-spl
    var v1 = value * (5/1024);//5V gets split up into 1024 levels
    var v0 = 0.005012; //ref voltage -46dBV/Pa assuming 1Pa
    var x = Math.log10(v1/v0) * 20; //sensitivity of -46dBV/Pa , this gives 0.005012 V RMS/ Pa
    var gain = ops.gain || 0;
    var db = (-46) + x + 94 - gain;
    if(isNaN(db)) return 0;
    return db.toFixed(ops.decimals || 2);
}
