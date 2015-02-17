var Pubsub = require('../lib/eventchannel'),
    io;


module.exports = function register(app, server) {
    io = require('socket.io').listen(server);

    server.io = io;

    // Make sockets io accessible on each request
    // TODO: We might have to do this before adding routes?
    app.use(function(req,res,next){

        req.io = io;
        next();
    });

    io.on('connection', function(socket) {
        console.log('REGISTER NEW SOCKET')
        socket.join('live-tracker');

        Pubsub.on('live-tracker', function(data){
            // console.log('HERE', data);
            socket.emit('update', data);
        });

        socket.emit('initialize', [0, 5, 10]);
    });
};
