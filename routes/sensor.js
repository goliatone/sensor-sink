var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({
        success: true
    });
});

//curl -H "Content-Type: application/json" -d '{"uuid":"xyz","t":"30", "h":"40"}' http://localhost:3000/sensor/collect
router.post('/collect', function(req, res){
    console.log(req.body);
    res.send({
        success:true
    });
});


module.exports = function(app) {
    app.use('/sensor', router);
};
