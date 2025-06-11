const express = require('express');
const router = express.Router();

/**
 * GET /
 * Returns a list of developers with their first and last names.
 *
 * @route GET /
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object[]} Array of developer objects
 * @returns {string} returns[].first_name - The developer's first name
 * @returns {string} returns[].last_name - The developer's last name
 */
router.get('/', function(req, res, next) {
    res.send([{first_name:'Elisha', last_name:'Lapid'},{first_name:'Shlomo',last_name:'Geva'}]);
});

module.exports = router;