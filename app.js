require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const connectFlash = require("connect-flash");
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require("passport")
const logger = require('morgan');


// Routers
const indexRouter = require('./routes/homepage.js');
const loginRouter = require('./routes/login.js');
const signupRouter = require('./routes/signup.js')

var app = express();

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));

// Enable express parser post data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Config view engine
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set("view engine", "ejs");
app.set("views",path.join(__dirname, 'views'));


//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes handler
app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter)


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
