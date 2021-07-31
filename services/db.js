const mysql = require('mysql2/promise');
const connection = require('../dbconnect');

/**
 * Returns results or err as Promise
 * 
 * @param {string} sql 
 * @param {Array} params 
 * @returns Promise
 */
const query = async function (sql, params) {
  return new Promise(async(resolve, reject) => {
    try {
      connection.query(
        sql, params,
        function(err, data) {
            if (err) {
                reject(err)
            }
            const results = data;
            resolve(results);
        }
      );
    } catch (err) {
        reject(err);
    }
  });
  

}

const getOffset= (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
}

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  query: query,
  getOffset: getOffset,
  emptyOrRows: emptyOrRows
}