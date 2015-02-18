var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var ejs = require('ejs');




module.exports = function register(app, options){
    app.set('env', 'development');

    // view engine setup
    app.set('views', path.join(options.root, 'views'));
    app.set('view engine', ejs);
    app.engine('html', ejs.renderFile);

    // uncomment after placing your favicon in /public
    app.use(favicon(options.root + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(options.root, 'public')));


    return app;
};
