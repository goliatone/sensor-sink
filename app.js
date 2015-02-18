var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var ejs = require('ejs');


///
// Connect to mongodb
require('tungus'); //mock mongodb, for now.
var mongoose = require('mongoose');
var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    // mongoose.connect(config.db, options);
    var dbpath = 'tingodb://' + __dirname + '/models/data';
    mongoose.connect(dbpath, options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('SIGINT: Mongoose default connection disconnected.');
        process.exit(0);
    });
});
///

var app = express();

app.set('env', 'development');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', ejs);
app.engine('html', ejs.renderFile);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ROUTES
var routes = require('./routes/index');
app.use('/', routes);

var users = require('./routes/users');
app.use('/users', users);

require('./routes/sensor')(app);

//MODELS
require('./models')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
