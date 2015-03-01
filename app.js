/*
 * before anything else, make __root available
 */
// global.$__root = __dirname;

var config = require('./config');
// console.log('CONFIG', config)
// var express = require('./lib/liveio');
var express = require('express');

//Configura DB
require('./lib/setup/db')(config.db);


var app = express();


require('./lib/setup/server')(app, {
    root: __dirname
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

//We include error handler routes after MODELS
//because, for now, we handle RESTul API there.
//TODO: Refactor!
require('./routes/errors')(app);

module.exports = app;
