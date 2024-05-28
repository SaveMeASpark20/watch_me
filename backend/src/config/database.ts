import mysql from 'mysql2/promise';

export async function db() {
    const connection = await mysql.createPool({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    });
    return connection;
}



// const mysql = require('mysql2/promise')

// const mysqlPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'employee_db'
// })


// module.exports = mysqlPool