const mySql = require('mysql2');

const connectionPool = mySql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e-commerce',
    password: '@Arnav9852!'
});

module.exports = connectionPool.promise();