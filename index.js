require('dotenv').config();
require('console.table');
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
  // host: 'localhost',
  // port: 3306,
  // user: 'root',
  // password: 'trOubl3d1',
  // database: 'employees_DB'
});

usrResp = () => {
  inquirer
    .prompt({
      message: 'What task would you like to perform?',
      type: 'list',
      choices: [
        'ADD a department',
        'ADD a role',
        'ADD an employee',
        'View all departments',
        'View all roles',
        'View all employees',
        "View a manager's employees",
        'View utilized budget by department',
        'Update an employee role',
        'Update an employee manager',
        'Update an employee role department',
        'DELETE a department',
        'DELETE a role',
        'DELETE an employee',
        'Exit',
      ],
      name: 'choice',
    })
    .then((responses) => {
      switch (responses.choice) {
        case 'ADD a department':
          addDept();
          break;
        case 'ADD a role':
          addRole();
          break;
        case 'ADD an employee':
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
        case "View a manager's employees":
          viewEmpByMgr();
          break;
        case 'View utilized budget by department':
          viewUtilBudget();
          break;
        case 'Update an employee role':
          updateEmpRole();
          break;
        case 'Update an employee manager':
          updateEmpMgr();
          break;
        case 'Update an employee role department':
          updateEmpRoleDept();
          break;
        case 'DELETE a department':
          deleteDept();
          break;
        case 'DELETE a role':
          deleteRole();
          break;
        case 'DELETE an employee':
          deleteEmployee();
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
    connection.query ('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res.title, res.salary, res.department_id], (err, data) => {
      if (err) throw err;
      console.log(`${res.title} has been entered into the database. \n`);
      usrResp();
    })
  });
}
// View all departments
viewDept = () => {
  connection.query('SELECT * FROM department', (err, data) => {
    if (err) throw err;
    console.log(`\n`);
    console.table(data);
    usrResp();
  })
};
// View all employees
viewEmployees = () => {
  connection.query('SELECT * FROM employee', (err, data) => {
    if (err) throw err;
    console.log(`\n`);
    console.table(data);
    usrResp();
  })
};
// View all roles
viewRoles = () => {
  connection.query('SELECT * FROM role', (err, data) => {
    if (err) throw err;
    console.log(`\n`);
    console.table(data);
    usrResp();
  })
};
// View employees by manager
viewEmpByMgr = () => {
  inquirer.prompt([
    {
      type: 'input',
    message: 'Enter the ID of the manager:',
    name: 'id'
    },
  ])
  .then ( (resp) => {
    connection.query(`SELECT * FROM employee WHERE manager_id = ${resp.id}`, (err, data) => {
      if (err) throw err;
      console.log(`\n`);
      console.table(data);
      usrResp();
    })
  })
};
// View utilized budget by department
viewUtilBudget = () => {
  inquirer.prompt([
    {
      type: 'integer',
    message: 'Enter the ID of the department budget to be viewed:',
    name: 'id'
    },
    {
      type: 'input',
    message: 'Enter the name of the department budget to be viewed:',
    name: 'name'
    },
  ])
  .then ( (resp) => {
    connection.query(`SELECT SUM(salary) AS total FROM role WHERE department_id = ${resp.id}`, [], (err, data) => {
      let budget;
      if (err) throw err;
      budget = JSON.stringify(data[0]);
      utilBudget = JSON.parse(budget);
      console.log(`\n`);
      console.log(`${resp.name}'s utilized budget is $${utilBudget.total}.`);
      usrResp();
    })
  })
};
// Updates the role by id for an employee
updateEmpRole = () => {
  inquirer.prompt([
    {
    type: 'input',
    message: 'Enter the ID of the employee whose role will be updated:',
    name: 'id'
    },
    {
      type: 'integer',
      message: 'Enter the ID of the new role:',
      name: 'role_id'
    }
  ])
  .then ( (resp) => {
    connection.query ('UPDATE employee SET role_id = ? WHERE id = ?', [resp.role_id, resp.id], (err, data) => {
      if (err) throw err;
      console.table(data);
      usrResp();
    })
  });
};
// Updates the manager by id for an employee
updateEmpMgr = () => {
  inquirer.prompt([
    {
    type: 'input',
    message: 'Enter the ID of the employee whose manager will be updated:',
    name: 'id'
    },
    {
      type: 'integer',
      message: 'Enter the ID of the new manager:',
      name: 'manager_id'
    }
  ])
  .then ( (resp) => {
    connection.query ('UPDATE employee SET manager_id = ? WHERE id = ?', [resp.manager_id, resp.id], (err, data) => {
      if (err) throw err;
      console.table(data);
      usrResp();
    })
  });
};
// Updates the department by id for an employee role
updateEmpRoleDept = () => {
  inquirer.prompt([
    {
    type: 'input',
    message: 'Enter the ID of the employee role whose department will be updated:',
    name: 'id'
    },
    {
      type: 'integer',
      message: 'Enter the ID of the new department:',
      name: 'department_id'
    }
  ])
  .then ( (resp) => {
    connection.query ('UPDATE role SET department_id = ? WHERE id = ?', [resp.department_id, resp.id], (err, data) => {
      if (err) throw err;
      console.table(data);
      usrResp();
    })
  });
};
// DELETE a department from the database
deleteDept = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department to be DELETED:',
      },
      {
        type: 'integer',
        message: 'Enter the ID of the department to be DELETED:',
        name: 'id'
        }
    ])
    .then ( (res) => {
      connection.query(
        `DELETE FROM department WHERE name = '${res.name}' AND id = '${res.id}'`, (err, data) => {
          if (err) throw err;
          console.log(`\n The ${res.name} department has been deleted from the database. \n`);
          usrResp();
        }
      );
    });
}
// DELETE a role from the database
deleteRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role to be DELETED:',
      },
      {
        type: 'integer',
        message: 'Enter the ID of the role to be DELETED:',
        name: 'id'
        }
    ])
    .then ( (res) => {
      connection.query(
        `DELETE FROM role WHERE title = '${res.title}' AND id = '${res.id}'`, (err, data) => {
          if (err) throw err;
          console.log(`\n The ${res.title} role has been deleted from the database. \n`);
          usrResp();
        }
      );
    });
}
// DELETE an employee from the database
deleteEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee to be DELETED:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee to be DELETED:',
      },
      {
        type: 'integer',
        message: 'Enter the ID of the employee to be DELETED:',
        name: 'id'
        },
    ])
    .then ( (res) => {
      connection.query(
        `DELETE FROM employee WHERE first_name = '${res.firstName}' AND last_name = '${res.lastName}' AND id = '${res.id}'`, (err, data) => {
          if (err) throw err;
          console.log(`\n ${res.firstName} ${res.lastName} has been deleted from the employee database. \n`);
          usrResp();
        }
      );
    });
}
// connect to the mysql server and database
connection.connect(err => {
  if (err) throw err;
  console.log(`\n connected as id ${connection.threadId} \n`);
  usrResp();
});