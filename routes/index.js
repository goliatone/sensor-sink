var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index.html', {
        title: 'Sensor Sink'
    });
});

module.exports = function register(app) {
    app.use('/', router);
    router.app = app;
};
