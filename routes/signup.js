const express = require('express');

const signupRouter = express.Router();

const signupController = require("../controllers/signup.js");
const validation = require('../services/validation.js')

signupRouter.route('/')
.get(signupController.getSignupPage)
.post(signupController.handleSignup);

module.exports = signupRouter;
