
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bms'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected!');
  });

  module.exports = connection;