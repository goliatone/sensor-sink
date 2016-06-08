var express = require('express');
var router = express.Router();
var Devices = require('../controllers/devices');

router.get('/', Devices.index);
router.get('/json', Devices.index);
router.get('/new', Devices.new);
router.post('/new', Devices.create);
router.get('/:slug', Devices.show);
router.get('/:slug/json', Devices.show);
router.get('/:slug/edit', Devices.edit);
router.post('/:slug/edit', Devices.update);

module.exports = function register(app) {
    app.use('/devices', router);
    router.app = app;
};
