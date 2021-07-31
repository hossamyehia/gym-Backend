const db =  require("../configs/config.js");

/**
 * Returns the offers in the system
 * 
 * @returns the offers in the system
 */
let getoffers = () => {
    const query = ' SELECT * FROM `courses` WHERE `name` LIKE `%Offer%`; ';
    const rows = db.query(query,[]);
    return db.emptyOrRows(rows);
};