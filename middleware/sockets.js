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

    Pubsub.on('device.create', function(doc){
        io.to('api/socket').emit('device.create', doc);
    });

    Pubsub.on('device.update', function(doc){
        io.to('api/socket').emit('device.update', doc);
    });

    Pubsub.on('device.delete', function(doc){
        io.to('api/socket').emit('device.delete', doc);
    });

    Pubsub.on('device.error', function(doc){
        io.to('api/socket').emit('device.error', doc);
    });

    io.on('connection', function(socket) {
        console.log('REGISTER NEW SOCKET');
        // console.log('HANDSHACKE', socket.handshake.user);

        socket.join('live-tracker');

        socket.join('api/socket');

        // socket.on('')

        Pubsub.on('live-tracker', function(data){
            // console.log('HERE', data);
            socket.emit('update', data);
        });

        socket.emit('initialize', [0, 5, 10]);
        console.log('====')

        socket.on('tst', function(data){
            console.log('TST', data);
            io.to('api/socket').emit('server.update');
        });


        socket.on('get', function(payload){
            console.log('GET', payload)
            socket.emit('get:'+payload.path, {pepe:23})
        });
    });
};
