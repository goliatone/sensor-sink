
/**
 * Module dependencies
 */

var mongoose = require('mongoose');

/**
 * Models
 */
var Device = mongoose.model('Device');

/**
 * Index
 * GET /devices
 * GET /devices/json
 */

exports.index = function (req, res) {
  Device.find().exec(function(err, devices) {
    if (req.url.indexOf('/json') > -1) return res.send(devices); // json
    return res.render('devices', {devices:devices}); // html
  });
};

/**
 * Show
 * GET /devices/:slug
 * GET /devices/:slug/json
 */

exports.show = function (req, res, next) {
  Device.findOne({ 'slug': req.params.slug }, function (err, device) {
    if (err) return handleError(err);
    if (req.url.indexOf('/json') > -1) return res.send(device); // json
    return res.render('devices/show', {device:device}); // html
  });
};


/**
 * New
 * GET /devices/new
 */

exports.new = function (req, res, next) {
  var device = new Device();
  res.locals._device = device;
  return res.render('devices/new');
};

/**
 * Edit
 * GET /devices/:slug/edit
 */

exports.edit = function (req, res, next) {
  Device.findOne({ 'slug': req.params.slug }, function (err, device) {
    if (!device) return next();
    res.locals._device = device;
    return res.render('devices/edit'); // html
  });
};


/**
 * Create
 * POST /devices/new
 */

exports.create = function (req, res, next) {
  var device = new Device(req.body);
  device.save(function(err) {
    if( !err ) {
      return res.redirect('/devices');
    } else {
      console.log( 'error' );
      console.log( err );
    }
  });
};



/**
 * Update
 * POST /devices/:slug/edit
 */

exports.update = function (req, res, next) {
  Device.findOne({ 'slug': req.params.slug }, function (err, device) {
    device = req.body;
    device.save( function( err ) {
      if( !err ) {
        return res.redirect('/devices');
      } else {
        console.log( err );
      }
    });
  });
};


/**
 * Delete
 * POST /devices/:id/edit
 */


exports.delete = function (req, res, next) {
    return Device.findById( req.params.id, function( err, device ) {
        return device.remove( function( err ) {
            if( !err ) {
                console.log( 'Device Removed!' );
                return res.redirect('/devices');
            } else {
                console.log( err );
            }
        });
    });
};

