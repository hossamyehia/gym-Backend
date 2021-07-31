const bcrypt = require("bcryptjs");

const db =  require("../services/db");


/**
 * Gets Courses Info
 * @param {Object} data Courses
 */
const getCoursesInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        let param = '_' + data.mainCourse + '%';
        let mainInfo = await db.query('SELECT id,name,duration,daysNo,cost FROM `Course` WHERE name LIKE N? ORDER BY duration, daysNo ASC',[param]);
        let name = `${data.mainCourse}`
        let info={};
        info[name] = mainInfo;
        if(mainInfo != []){
            if(data.secondaryCourses != []){
                data.secondaryCourses.forEach(async(course) => {
                    let param = '_' + course + '%';
                    let secondaryInfo = await db.query('SELECT * FROM `Course` WHERE name LIKE N? ORDER BY duration, daysNo ASC',[param]);
                    if(courseInfo){
                        let name = `${course}`;
                        info[name] = secondaryInfo;
                    }
                });
            }
            resolve(info);
        }else{
            reject('The Main Course you chose doesn`t exist');
        }

    });
} 

/**
 * Create New User
 * @param {Object} data 
 * @returns promise
 */
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let isUsernameExist = await checkExistUsername(data.username);
        if (isUsernameExist) {
            reject(`This Username "${data.username}" has already exist. Please choose an other email`);
        } else {
            
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                name: data.name,
                birthday: data.birthday,
                username: data.username,
                password: bcrypt.hashSync(data.password, salt),
            };

            
            DBConnection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistUsername = (username) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    getCoursesInfo: getCoursesInfo, 
    createNewUser: createNewUser
};