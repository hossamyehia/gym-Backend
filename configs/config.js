require('dotenv').config();
const mysql = require('mysql2/promise');

const user = encodeURIComponent('freedbtech_hossamyehia');
const password = encodeURIComponent('databaseP@$$word132');
const secretKey = encodeURIComponent('A5s7-8W9e')

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

