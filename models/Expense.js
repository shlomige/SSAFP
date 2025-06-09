const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userid: { type: String, required: true},
    description: { type: String, required: true },
    category: { type: String, required: true },
    sum:{ type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);