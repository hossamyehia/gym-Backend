const { validationResult } = require("express-validator");

const signupService = require("../services/signup.js")

/**
 * Serve the signup page to client
 * @param {objec} req request
 * @param {object} res respone
 * @returns 
 */
let getSignupPage = (req, res) => {
    return res.render("signup.ejs", {
        errors: req.flash("errors")
    });
};

/**
 * Handle signup
 * @param {object} req request
 * @param {object} res respone
 * @returns Json Data
 */
const handleSignup = async(req, res) => {
    if(req.query.tab == 1){
        let data = await signupService.getCoursesInfo(req.body);
        return res.json({data:data});
    }

    
}
/*
let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/signup");
    }

    //create a new user
    let newUser = {
        fullname: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    };
    try {
        await signupService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/signup");
    }
};
*/
module.exports = {
    getSignupPage: getSignupPage,
    handleSignup: handleSignup
};
