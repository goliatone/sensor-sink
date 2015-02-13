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

        socket.emit('initialize', [0, 5, 10]);
    });
};
