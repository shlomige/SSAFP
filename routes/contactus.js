var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Contact us at : bla@bla.com ');
});

module.exports = router;