var mongoose = require('mongoose');


var connect = function (config) {

    function _reconnect(config){
        mongoose.connect(config.path, config.options);
    }

    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', _reconnect.bind(null, config));

    _reconnect(config);
};

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('SIGINT: Mongoose default connection disconnected.');
        process.exit(0);
    });
});

module.exports = function start(config){
    //TODO: Validate config is valid object!!!!
    connect(config);
};
