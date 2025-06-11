const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const Expense= require('../models/Expense');
const {response} = require("express");

/**
 * GET /:userID
 * Retrieves a user's basic information and the total sum of all their expenses.
 *
 * Route parameters:
 * - `userID` (string | number): The ID of the user to retrieve
 *
 * Response format:
 * - `first name` (string): The user's first name
 * - `last name` (string): The user's last name
 * - `id` (number): The user's ID
 * - `total` (number): Total sum of all expenses associated with the user
 *
 * Status codes:
 * - 200: Success, returns user info and total expenses
 * - 404: User not found
 * - 500: Internal server error
 *
 * @route GET /:userID
 * @param {express.Request} req - The request object
 * @param {string} req.params.userID - The user ID from the URL
 * @param {express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>} Sends a JSON response with user info and total expenses
 */
router.get('/:userID', async function(req, res, next) {
    try{
        console.log(typeof (parseInt(req.params.userID)));
        const user = await User.findOne({id:parseInt(req.params.userID)})
        if (!user) {
            return res.status(404).send('User not found');
        }
        const first_name = user.first_name;
        const last_name = user.last_name;
        const id = user.id;
        const expenses = await Expense.find({userid:req.params.userID});
        let total = 0;
        for (const expense of expenses) {
            total += expense.sum;
        }
        res.json({"first name":first_name, "last name":last_name,"id":id,"total":total});
    }
    catch(err){
        return res.status(500).json({'Internal Server Error':err});
    }
});

module.exports = router;