var express = require('express');
var router = express.Router();
const Expense = require('../models/Expense');

/**
 * POST /
 * Adds a new expense entry to the database.
 *
 * Required fields in the request body:
 * - `description` (string)
 * - `category` (string)
 * - `userid` (string)
 * - `sum` (number)
 * - `date` (optional, string or ISO date format). If not provided, the current date will be used by default.
 *
 * Responses:
 * - 201: Returns the created expense object
 * - 400: If any required fields are missing or if validation fails
 * - 500: For any other server errors
 *
 * @route POST /
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>} Sends a JSON response
 */
router.post('/', async function(req, res, next) {
    try {
        const description = req.body.description;
        const category = req.body.category;
        const userid = req.body.userid;
        const sum = req.body.sum;
        const date = req.body.date ? new Date(req.body.date) : undefined;
        //if the value is not send in the body - it will be undefined and in the save to the DB it will get the default
        //value - now
        if (!description || !category || !sum || !userid) {
          return res.status(400).send({"missing required parameters": true});

        }else {
            const expense = new Expense({userid,description,category,sum,  ...(date && { date })});
            //only if the date value is exist it will be send to create new expense item
             await expense.save()
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