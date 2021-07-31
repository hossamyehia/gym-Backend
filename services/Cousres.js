const db = require('./db');
const config = require('../config');

/**
 * 
 *  Return all the courses` information
 * 
 * @param {number} page the page number
 * @return {object} All the courses` information
 * 
 */

async function getMultiple(page = 1){
  const offset = db.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, cost, duration
    FROM Cousre LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = db.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/**
 * 
 *  Return all the courses` information
 * 
 * @param {Number} page the page number
 * @param {Array} fields the page number
 * @return {Object} All the courses` information
 * 
 */

async function getSpecific(page = 1,fields){
    const offset = db.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT ?
      FROM Cousre LIMIT ?,?`, 
      [[fields], offset, config.listPerPage]
    );
    const data = db.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
}

  
module.exports = {
  getMultiple,
  getSpecific
}