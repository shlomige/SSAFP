const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET
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