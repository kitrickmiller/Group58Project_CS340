// db-connector.js
// Create and export a mysql2 promise-based connection pool
const mysql = require('mysql2');

const pool = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_millekit',
  password: '5962',
  database: 'cs340_millekit'
}).promise();

module.exports = pool;
