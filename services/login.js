const bcrypt = require("bcryptjs");

const db =  require("../services/db");


/**
 * Check the user`s username and password
 * 
 * @param {string} username the user`s username
 * @param {string} password the user`s password
 * @returns resolve or reject
 */
let handleLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await findUserByUsername(username);
        if (user) {
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This username "${username}" doesn't exist`);
        }
    });
};

/**
 * Search for the user by his username
 * 
 * @param {string} username the user`s username
 * @returns resolve or reject
 */
let findUserByUsername = async (username) => {
    
    const query = ' SELECT * FROM `Trainee` WHERE `username` = ?  ';
    return db.query(query,[username]);
    
};

/**
 * Search for the user by his id
 * 
 * @param {number} id the user`s id
 * @returns resolve or reject
 */
let findUserById = async (id) => {
    
    const query = ' SELECT * FROM `users` WHERE `id` = ?  ';
    return db.query(query,[id]);
    
};

/**
 * 
 * @param {string} password the input password
 * @param {Object} user the user object
 * @returns 
 */
let comparePassword = (password, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByUsername: findUserByUsername,
    findUserById: findUserById,
    comparePassword: comparePassword
};