var path = require('path');

var express = require('express');

var session = require('express-session');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var multer = require('multer');
var viewHelpers = require('view-helpers');
var compression = require('compression');

var flash = require('connect-flash');
var mongoStore = require('connect-mongo')(session);
var NedbStore = require('connect-nedb-session-two')(session);

var ejs = require('ejs');


var PKG = require(process.env.PWD + '/package.json');
var ENV = process.env.NODE_ENV || 'development';


module.exports = function register(app, options){

    app.set('env', ENV);

    /*
     * compression should be placed before static
     */
    app.use(compression({
        threshold: 512
    }));

    app.use(express.static(path.join(options.root, 'public')));

    /*
     * Don't log during tests
     * Logging middleware
     */
    if (ENV !== 'test') app.use(morgan(options.logging));

    // view engine setup
    app.set('view engine', ejs);
    app.set('views', path.join(options.root, 'views'));
    app.engine('html', ejs.renderFile);

    /*
     * Expose package.json to views
     * Expose env
     */
    app.use(function (req, res, next) {
        res.locals.pkg = PKG;
        res.locals.env = ENV;
        next();
    });

    app.use(favicon(options.root + '/public/favicon.ico'));
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /*
     * Handle multipart/form-data.
     * TODO: We should get options from config object
     */
    app.use(multer());

    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method;
          delete req.body._method;
          return method;
        }
    }));

    /*
     * CookieParser should be above session
     */
    app.use(cookieParser( ));

    app.use(cookieSession(options.cookieSession));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: PKG.name,
        //TODO: We should use tingus or whatever
        store: new NedbStore({ filename: process.env.PWD +'./.db', clearInterval: 24 * 3600 * 1000 })
        // store: new mongoStore({
        //     url: options.db.path,
        //     collection : 'sessions'
        // })
    }));

    /*
     * use passport session
     */
    var passport = app.get('passport');
    app.use(passport.initialize());
    app.use(passport.session());

    /*
     * connect flash for flash messages
     * should be declared after sessions
     */
    app.use(flash());

    /*
     * should be declared after session and flash
     */
    app.use(viewHelpers(PKG.name));


    return app;
};
