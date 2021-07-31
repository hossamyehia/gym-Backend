const express = require('express');

const homepageRouter = express.Router();

const homepageController = require('../controllers/homepage');

homepageRouter.route('/')
.get(homepageController.getHomePage);

module.exports = homepageRouter;
