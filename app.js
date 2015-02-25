/*
 * before anything else, make __root available
 */
global.$__root = __dirname;

// var express = require('./lib/liveio');
var express = require('express');

//Configura DB
require('./lib/setup/db')();


var app = express();


require('./lib/setup/server')(app, {
    root:__dirname
});

//SOCKETS.IO
app.on('app.pre', function(payload){
    require('./middleware/sockets')(app, payload.server);
});

//ROUTES
require('./routes/index')(app);
require('./routes/users')(app);
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
