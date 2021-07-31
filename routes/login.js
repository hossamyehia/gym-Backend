const express = require('express');
const passport = require('passport');

const loginRouter = express.Router();

const loginController = require("../controllers/login.js");
const initPassportLocal = require('../configs/authStrategy.js')

// Init all passport
initPassportLocal();

loginRouter.route('/')
.get(loginController.checkLoggedOut,loginController.getPageLogin)
.post(passport.authenticate("local", {
  successRedirect: "/",
  //failureRedirect: "/login",
  successFlash: true,
  failureFlash: true
}));

module.exports = loginRouter;
