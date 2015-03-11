var mdns = require('mdns-js');
var Service;


// stop on Ctrl-C
process.on('SIGINT', function () {
    Service.stop();

    // give deregistration a little time
    setTimeout(function onTimeout() {
        process.exit(0);
    }, 1000);
});


module.exports = function advertise(options){
    options = options || { type: '_http', port: 3000, data: {} };
    console.log('=> Advertising a %s service on port %s', options.type, options.port);
    Service = mdns.createAdvertisement(mdns.tcp(options.type), options.port, options.data);
    Service.start();

    // read from stdin
    process.stdin.resume();
};