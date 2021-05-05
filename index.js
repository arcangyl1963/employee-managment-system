const consoleTable = require('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`\n connected as id ${connection.threadId} \n`);
  usrResp();
});

usrResp = () => {
  inquirer
    .prompt({
      message: 'What task would you like to perform?',
      type: 'list',
      choices: [
        'Add a department',
        'Add a role',
        'Add an employee',
        'View all departments',
        'View all roles',
        'View all employees',
        'Update an employee role',
        'Exit',
      ],
      name: 'choice',
    })
    .then((responses) => {
      switch (responses.choice) {
        case 'Add a department':
          addDept();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'View all departments':
          viewDept();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Update an employee role':
          updateEmpRole();
          break;
        default:
          connection.end();
          break;
      }
    });
};

// Add a department to DB table
addDept = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'Enter the name of the department to be added:',
      },
    ])
    .then((res) => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [res.department],
        (err, data) => {
          if (err) throw err;
          console.log(
            `${res.department} has been added to the department table. \n`
          );
          usrResp();
        }
      );
    });
};
// Add an employee to the database
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'integer',
        name: 'roleId',
        message: 'Enter the role ID of the employee:',
      },
      {
        type: 'integer',
        name: 'mgrId',
        message: "Enter the manager's ID of the employee:",
      }
    ])
    .then ( (res) => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.mgrId], (err, data) => {
          if (err) throw err;
          console.log(`${res.firstName} ${res.lastName} has been added to the employee database. \n`);
          usrResp();
        }
      );
    });
}
// Add a new role to the database
addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter role title:',
      name: 'title'
    },
    {
      type: 'integer',
      message: 'Enter role salary:',
      name: 'salary'
    },
    {
      type: 'integer',
      message: 'Enter the department ID for the role:',
      name: 'department_id'
    }
  ])
  .then ( (res) => {
    connection.query ('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res,])
  })
}