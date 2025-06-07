var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send([{first_name:'Elisha', last_name:'Lapid'},{first_name:'Shlomo',last_name:'geva'}]);
});

module.exports = router;