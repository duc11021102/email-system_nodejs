var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'minhduc001',
    database: 'wpr2023'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

module.exports = connection;