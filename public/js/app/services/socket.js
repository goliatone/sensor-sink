define('socket', function(require){
    var io = require('io'),
        gpub = require('gpub'),
        extend = require('extend');

    var extend = require('extend');

    var DEFAULTS = {
        autoinitialize: true,
        _client:{
            url: window.location.protocol + '//' + window.location.host
        },
        WSClient: function(options){
            return io(options.url);
        }
    };

    var Socket = function(config){
        config = extend({}, this.constructor.DEFAULTS, config);
        if(config.autoinitialize ) this.init(config);
    };

    Socket.DEFAULTS = DEFAULTS;

    Socket.prototype.init = function(config){
        if(this.initialized) return;
        this.initialized = true;
        this.logger.info('Socket instance created');
        extend(this, this.constructor.DEFAULTS, config);

        this.client = this.WSClient(this._client);
        this.client.on('device.create', this.onDeviceCreate.bind(this));
        this.client.on('device.update', this.onDeviceUpdate.bind(this));
        this.client.on('device.error', this.onDeviceError.bind(this));
    };

    Socket.prototype.onDeviceCreate = function(device){
        this.logger.info('onDeviceCreate', device);
    };

    Socket.prototype.onDeviceUpdate = function(device){
        this.logger.info('onDeviceUpdate', device);
    };

    Socket.prototype.onDeviceError = function(device){
        this.logger.error('onDeviceError', device);
    };

    Socket.prototype.logger = console;

    return Socket;
});