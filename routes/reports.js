const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

/**
 * GET /
 * Retrieves a monthly expense report for a specific user.
 *
 * Required query parameters:
 * - `id` (string): The user's ID
 * - `year` (string or number): The year of the report (e.g., 2025)
 * - `month` (string or number): The month of the report (1-12)
 *
 * The endpoint responds with a breakdown of expenses per category for the specified month.
 *
 * Response format:
 * - `userid`: The user's ID
 * - `year`: The requested year
 * - `month`: The requested month
 * - `costs`: An array of category objects, each containing expense items with `sum`, `description`, and `day`
 *
 * Status codes:
 * - 200: Success, returns the expense report
 * - 400: Missing required query parameters
 * - 500: Internal server error
 *
 * @route GET /
 * @param {express.Request} req - The request object
 * @param {string} req.query.id - The user's ID
 * @param {string|number} req.query.year - The year (e.g., 2025)
 * @param {string|number} req.query.month - The month (1–12)
 * @param {express.Response} res - The response object
 * @returns {Promise<void>} Sends a JSON response with the report or an error message
 */
router.get('/', async (req, res) => {
    const { id, year, month } = req.query;

    // Validate input
    if (!id || !year || !month) {
        return res.status(400).json({ error: 'Missing id, year, or month in query' });
    }

    try {
        // Convert year and month to numbers
        const y = parseInt(year);
        const m = parseInt(month);

        // Get the first and last day of the month
        const start = new Date(y, m - 1, 1);
        const end = new Date(y, m, 0, 23, 59, 59, 999);

        // Find all expenses for this user in the month
        const expenses = await Expense.find({
            userid: id,
            date: { $gte: start, $lte: end }
        });

        // Initialize costs per category
        const categories = ['food', 'health', 'housing', 'education','hobbies'];
        const costs = categories.map(category => ({
            [category]: expenses
                .filter(exp => exp.category === category)
                .map(exp => ({
                    sum: exp.sum,
                    description: exp.description,
                    day: new Date(exp.date).getDate()
                }))
        }));

        return res.json({
            userid: id,
            year: y,
            month: m,
            costs
        });

    } catch (err) {
        console.error('Error generating report:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;