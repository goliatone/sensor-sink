
var express = require('express');

var models = {};

models.Device = require('./device');
models.Configuration = require('./configuration');
models.Location = require('./location');
models.Sublocation = require('./sublocation');
models.DeviceType = require('./deviceType');
models.Sensor = require('./sensor');
models.User = require('./user');

module.exports = function register(){
    return models;
};
