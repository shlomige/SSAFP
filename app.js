const connectDB = require('./db');
//connectDB();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const contactusRouter = require('./routes/contactus');
// const aboutRouter = require('./routes/about');
// const productsRouter = require('./routes/products');
// const servicesRouter = require('./routes/services');
const addRouter = require('./routes/add');
const reportsRouter = require('./routes/reports');
const userDetailsRouter = require('./routes/userDetails');
const aboutRouter = require('./routes/about');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/Contact_Us',contactusRouter);
// app.use('/products',productsRouter);
// app.use('/services',servicesRouter);
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
