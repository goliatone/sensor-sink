var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = function register(app) {
    app.use('/users', router);
    router.app = app;
};
