const mysql = require('mysql');
const config = require('./db_config.json');

let pool = mysql.createPool(config);

function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;