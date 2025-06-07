var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    try {
        const description = req.body.description;
        const category = req.body.category;
        const userid = req.body.id;
        const sum = req.body.sum;
        res.send({description, category, userid, sum});
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
    //res.send('added');
});

module.exports = router;