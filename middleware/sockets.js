var io;


module.exports = function register(app) {
    io = require('socket.io').listen(app);

    io.on('connection', function(socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('my other event', function(data) {
            console.log(data);
        });
    });
};
