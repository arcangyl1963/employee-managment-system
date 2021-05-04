const consoleTable = require('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();

 let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});

connection.connect ( (err) => {
    if (err) throw err;
    console.log(`\n connected as id ${connection.threadId} \n`);
    usrResp();
})