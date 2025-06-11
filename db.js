/**
 * @file db.js
 * @description Establishes a connection to MongoDB using Mongoose.
 *
 * This module loads the MongoDB connection URI from environment variables,
 * attempts to connect to the database, and logs the result.
 *
 * If the connection fails, the application will exit with an error code.
 *
 * @module db
 * @requires mongoose
 * @requires dotenv
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the database connection is successful
 */
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;