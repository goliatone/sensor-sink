/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    baseUrl: 'javascripts',
    paths: {
        'app': 'app/app',
        // 'gpub': 'components/gpub/gpub',
        // 'gconfig': 'components/gconfig/gconfig',
        // 'gconfig.path': 'components/gconfig/gconfig.path',
        // 'gconfig.qstring': 'components/gconfig/gconfig.qstring',
        // 'gconfig.interpolate': 'components/gconfig/gconfig.interpolate',

        // 'extend': 'components/gextend/extend',
        // 'keypath': 'components/gkeypath/keypath',
        // 'templatecontext': 'components/templatecontext/templatecontext',



        // 'preloader': 'views/preloader',
        // 'ractive': 'components/ractive/ractive',
        // 'jquery': 'components/jquery/jquery',

    }
});
define('main', function(require) {
    console.log('Loading');

    var App = require('app');

});