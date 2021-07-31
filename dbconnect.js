const config = require('./configs/config.js');
const mysql = require("mysql2");

/**
 * Connect to My Database 
 *
 * @returns connection
 */
let connection = mysql.createConnection(config.db);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = connection;