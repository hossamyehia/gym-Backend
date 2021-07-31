const { validationResult } = require("express-validator");

const loginService = require("../services/login.js");
 
/**
 * Returns the login page to client
 * 
 * @param {object} req request
 * @param {object} res respone
 * @returns respone or error
 */
let getPageLogin = (req, res) => {
    return res.render("login.ejs", {
        errors: req.flash("errors")
    });
};

/**
 * Handles the login form and validate inputs
 * 
 * @param {Object} req request
 * @param {Object} res respone
 * @returns respone or error
 */
let handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    console.log(req.body);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.username, req.body.password);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
};

/**
 * Checks if the user already logged in
 * 
 * @param {Object} req request
 * @param {Object} res respone
 * @param {Function} next callback function
 * @returns respone
 */
let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

/**
 * Checks if the user does not login
 * 
 * @param {Object} req request
 * @param {Object} res respone
 * @param {Function} next callback function
 * @returns respone
 */
let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

/**
 * Logs the user out
 * 
 * @param {Object} req request
 * @param {Object} res respone
 * @returns respone
 */
let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getPageLogin: getPageLogin,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};
