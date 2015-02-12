var io;


module.exports = function register(server) {
    io = require('socket.io').listen(server);

    server.io = io;

    io.on('connection', function(socket) {
        socket.emit('initialize', [
            {t:20},
            {t:21},
            {t:21},
            {t:22},
            {t:22},
        ]);
    });
};
