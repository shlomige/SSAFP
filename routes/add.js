var express = require('express');
var router = express.Router();
const Expense = require('../models/Expense');

/* GET users listing. */
router.post('/', async function(req, res, next) {
    try {
        const description = req.body.description;
        const category = req.body.category;
        const userid = req.body.userid;
        const sum = req.body.sum;
        const date = req.body.date ? new Date(req.body.date) : undefined;
        if (!description || !category || !sum || !userid) {
          return res.status(400).send({"missing required parameters": true});

        }else {
            const expense = new Expense({userid,description,category,sum,  ...(date && { date })});
             await expense.save()
            //console.log(description, category, sum,userid);
            return res.status(201).send(expense);
        }
    }
    catch (error) {
        console.error("Error adding expense:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: "Validation failed", errors: error.errors });
        }

        // For any other unexpected errors
        return res.status(500).send({error: error.message || "An unexpected server error occurred."});
    }
});

module.exports = router;