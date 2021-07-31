require('dotenv').config();
const mysql = require('mysql2/promise');

const user = encodeURIComponent('');
const password = encodeURIComponent('');
const secretKey = encodeURIComponent('')

const config = {
    db: { 
        host: process.env.DB_HOST || 'freedb.tech',
        user: process.env.DB_USER || user,
        password: process.env.DB_PASSWORD || password,
        database: process.env.DB_NAME || 'freedbtech_gymproject',
    },
    listPerPage: process.env.LIST_PER_PAGE || 10,
    secretKey: process.env.SECRET_KEY || secretKey
};
  

module.exports = config;

