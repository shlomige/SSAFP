var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/:id', function(req, res, next) {
    res.send("products id:" + req.params.id);
})

router.get('/', function(req, res, next) {
    res.send('products page');
});

module.exports = router;