/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('gextend');

//TODO: Load all file in env directory,
//each has a method to figure out if its the right one
var production = require('./env/prod');
var development = require('./env/dev');

var DEFAULTS = {
  root: path.normalize(__dirname + '/..')
};


/**
 * Expose
 */

module.exports = {
  dev: extend({}, DEFAULTS, development),
  development: extend({}, DEFAULTS, development),
  production: extend({}, DEFAULTS, production)
}[process.env.NODE_ENV || 'development'];
