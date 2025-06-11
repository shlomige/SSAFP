/**
 * Main application entry point.
 *
 * This file sets up and configures the Express application.
 *
 * - Connects to the MongoDB database
 * - Configures view engine (Pug)
 * - Sets up middleware: logging, parsing, static files
 * - Defines routes for API endpoints
 * - Handles 404 and general errors
 *
 * @module app
 * @requires express
 * @requires http-errors
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires ./routes/add
 * @requires ./routes/reports
 * @requires ./routes/userDetails
 * @requires ./routes/about
 * @returns {express.Application} The configured Express app
 */
const connectDB = require('./db');
connectDB();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const addRouter = require('./routes/add');
const reportsRouter = require('./routes/reports');
const userDetailsRouter = require('./routes/userDetails');
const aboutRouter = require('./routes/about');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/add',addRouter);
app.use('/api/users',userDetailsRouter);
app.use('/api/about',aboutRouter);
app.use('/api/report',reportsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
