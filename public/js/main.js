/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    baseUrl: 'js',
    paths: {
        'app': 'app/app',
        'socket': 'app/services/socket',
        'gpub': 'vendors/gpub/src/gpub',

        'numberwidget': 'app/widgets/number/number',
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

    }
});
define('main', function(require) {
    console.log('Loading');

    var Client = require('socket');
    var socket = new Client();

    var App = require('app');

    var app = new App();

    var NumberWidget = require('numberwidget');

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

    window.view = view;

});