 "use strict";
/*
 * socket-model
 * https://github.com/goliatone/socket-model
 *
 * Copyright (c) 2015 goliatone
 * Licensed under the MIT license.
 */
/* jshint strict: false, plusplus: true */
/*global define: false, require: false, module: false, exports: false */
(function(root, name, deps, factory) {

    // Node
    if (typeof deps === 'function') {
        factory = deps;
        deps = [];
    }

    if (typeof exports === 'object') {
        module.exports = factory.apply(root, deps.map(require));
    } else if (typeof define === 'function' && 'amd' in define) {
        //require js, here we assume the file is named as the lower
        //case module name.
        define(name.toLowerCase(), deps, factory);
    } else {
        // Browser
        var d, i = 0,
            global = root,
            old = global[name],
            mod;
        while ((d = deps[i]) !== undefined) deps[i++] = root[d];
        global[name] = mod = factory.apply(global, deps);
        //Export no 'conflict module', aliases the module.
        mod.noConflict = function() {
            global[name] = old;
            return mod;
        };
    }
}(this, 'SocektModel', function() {

    /**
     * Shim console, make sure that if no console
     * available calls do not generate errors.
     * @return {Object} Console shim.
     */
    var _shimConsole = function(console) {

        if (console) return console;

        var empty = {},
            con = {},
            noop = function() {},
            properties = 'memory'.split(','),
            methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
                'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
                'table,time,timeEnd,timeStamp,trace,warn').split(','),
            prop,
            method;

        while (method = methods.pop()) con[method] = noop;
        while (prop = properties.pop()) con[prop] = empty;

        return con;
    };

    function SocektModel(address, options) {
        options || (options = {});
        options.path = options.path || '/api/socket';

        this.socket = io(address, options);
        this.socket.on('server.update', function(){
            console.log('SERVER UPDATE', arguments)
        })
    }

    SocektModel.prototype.remoteCall = function(method, keypath, data, callback) {
        this.socket.emit(method, {
            path: keypath,
            data: data
        });

        this.socket.once(method + ':' + keypath, callback);

        return this;
    };

    /**
     * RESTful: "GET" method
     *
     * @param  {String}   keypath  API endpoint
     * @param  {Object}   data     Send data to server
     * @param  {Callback} callback It will handle the response only once
     * @return {this}
     */
    SocektModel.prototype.get = function(keypath, data, callback) {
        return this.remoteCall('get', keypath, data, callback);
    };

    /**
     * RESTful: "POST" method
     *
     * @param  {String}   keypath  API endpoint
     * @param  {Object}   data     Send data to server
     * @param  {Callback} callback It will handle the response only once
     * @return {this}
     */
    SocektModel.prototype.post = function(keypath, data, callback) {
        return this.remoteCall('post', keypath, data, callback);
    };

    /**
     * RESTful: "PUT" method
     *
     * @param  {String}   keypath  API endpoint
     * @param  {Object}   data     Send data to server
     * @param  {Callback} callback It will handle the response only once
     * @return {this}
     */
    SocektModel.prototype.put = function(keypath, data, callback) {
        return this.remoteCall('put', keypath, data, callback);
    };

    /**
     * RESTful: "DELETE" method
     *
     * @param  {String}   keypath  API endpoint
     * @param  {Object}   data     Send data to server
     * @param  {Callback} callback It will handle the response only once
     * @return {this}
     */
    SocektModel.prototype.delete = function(keypath, data, callback) {
        return this.remoteCall('delete', keypath, data, callback);
    };

    /**
     * Simple log implementation.
     */
    SocektModel.prototype.logger = _shimConsole(console);

    /**
     * Stub emit function. User must extend
     * and implement to get events.
     */
    SocektModel.prototype.emit = function(event, options) {};

    return SocektModel;
}));
