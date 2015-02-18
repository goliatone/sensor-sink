///
// Connect to mongodb
require('tungus'); //mock mongodb, for now.
var mongoose = require('mongoose');
var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    // mongoose.connect(config.db, options);
    var dbpath = 'tingodb://' + process.env.PWD + '/models/data';
    mongoose.connect(dbpath, options);
};

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('SIGINT: Mongoose default connection disconnected.');
        process.exit(0);
    });
});
///


module.exports = function start(){
    connect();
};


function getConnectionUri(){
    return
}
