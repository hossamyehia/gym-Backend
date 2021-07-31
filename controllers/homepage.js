
const homepageService = require("../services/homepage.js");

/**
 * Returns the Home page to client
 * 
 * @param {object} req request
 * @param {object} res respone
 * @returns respone or error
 */
let getHomePage = (req, res) => {
    res.render('homepage.ejs', { login: req.isAuthenticated() });
};












module.exports ={
    getHomePage: getHomePage
}