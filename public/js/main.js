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

    NumberWidget.register('sound-widget');
    NumberWidget.register('humidity-widget');
    NumberWidget.register('light-widget');
    NumberWidget.register('temperature-widget');

    var MovementWidget = require('movementwidget');
    MovementWidget.register('movement-widget');

    var ractive = require('ractive');

    var view = new Ractive({
        el:'content',
        // append:true,
        template:'#content-template',
        data:{
            name:'Pepe',
            adjective:'awesome'
        }
    });



    socket.client.on('device.create', function(device){
        // view.findComponent('number-widget').set('value', 56);
    });

    socket.client.on('update', function(data){
        data.forEach(function(model){
            if(typeof model.t === 'string') model.t = parseFloat(model.t);
            // if(isNaN(model.t)) return
            model.t && view.findComponent('temperature-widget').set('value', model.t);
            model.l && view.findComponent('light-widget').set('value', model.l);
            model.h && view.findComponent('humidity-widget').set('value', model.h);
            model.s && view.findComponent('sound-widget').set('value', model.s);

            model.m && view.findComponent('movement-widget').set('value', model.m);
        });
    });

    window.view = view;

});