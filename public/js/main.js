/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    baseUrl: 'js',
    paths: {
        'app': 'app/app',
        'socket': 'app/services/socket',
        'gpub': 'vendors/gpub/src/gpub',
        'text': 'vendors/requirejs-text/text',
        'numberwidget': 'app/widgets/number/number',
        'movementwidget': 'app/widgets/motion/movement',
        //
        // 'gconfig': 'components/gconfig/gconfig',
        // 'gconfig.path': 'components/gconfig/gconfig.path',
        // 'gconfig.qstring': 'components/gconfig/gconfig.qstring',
        // 'gconfig.interpolate': 'components/gconfig/gconfig.interpolate',

        'io': '/socket.io/socket.io.js',

        'extend': 'vendors/gextend/src/extend',
        // 'keypath': 'components/gkeypath/keypath',
        // 'templatecontext': 'components/templatecontext/templatecontext',



        // 'preloader': 'views/preloader',
        'ractive': 'vendors/ractive/ractive',
        // 'jquery': 'components/jquery/jquery',

    },
    map: {
        '*': {
            'css': 'vendors/require-css/css' // or whatever the path to require-css is
        }
    }
});

define('main', function(require) {
    console.log('Loading');

    var Client = require('socket');
    var socket = new Client();

    var App = require('app');

    var app = new App();

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

    var ractive = require('ractive');

    var view = new Ractive({
        el:'content',
        template:'#content-template'
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
        {id: 'light-widget', keypath:'payload.*.l'},
        {id: 'humidity-widget', keypath: 'payload.*.h'},
        {id: 'sound-widget', keypath: 'payload.*.s'},
        {id: 'movement-widget', keypath: 'payload.*.m'}
    ];


    WIDGETS.forEach(function(widget){
        view.findComponent(widget.id).registerModel(view, widget.keypath);
    });

    window.view = view;

});