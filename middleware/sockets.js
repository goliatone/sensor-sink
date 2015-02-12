var Pubsub = require('../lib/eventchannel'),
    io;


module.exports = function register(server) {
    io = require('socket.io').listen(server);

    server.io = io;

    io.on('connection', function(socket) {
        console.log('REGISTER NEW SOCKET')
        socket.join('live-tracker');

        Pubsub.on('live-tracker', function(data){
            console.log('HERE', data);
            socket.emit('update', data);
        });

        socket.emit('initialize', [
            {t:20},
            {t:21},
            {t:21},
            {t:22},
            {t:22},
        ]);
    });
};
