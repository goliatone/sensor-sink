/*
 * before anything else, make __root available
 */
// global.$__root = __dirname;

var config = require('./config');
// console.log('CONFIG', config)
// var express = require('./lib/liveio');
var express = require('express');

//Configure DB
require('./lib/setup/db')(config.db);

//MODELS
require('./models')();

var app = express();

// Bootstrap passport config
require('./models/user'); //TODO: Break loading models from RESTful
require('./lib/setup/authentication')(app, config);

require('./lib/setup/server')(app, config);

//SOCKETS.IO
app.on('app.pre', function(payload){
    require('./middleware/sockets')(app, payload.server);
    require('./clients/beebotte')(app, payload.server);
    // require('./clients/ubidots')(app, payload.server);
});

//ROUTES
require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/sensor')(app);
require('./routes/device')(app);

require('./controllers')(app, config);


require('./config/advertise')(config.advertise);

//We include error handler routes after MODELS
//because, for now, we handle RESTul API there.
//TODO: Refactor!
require('./routes/errors')(app);

module.exports = app;
