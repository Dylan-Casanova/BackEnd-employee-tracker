//dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'D@ca1324',
    database: 'daca_dealershipDB',
});

//connection to db
connection.connect((err) => {
    if (err) throw err;
    searchRun();
});
//initial promt/ menu options
const searchRun = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'Welcome to Employee Tracker, please select one of the following options:',
            choices: [
                'view employees',
                'view roles',
                'view departments',
                'add employees',
                'add roles',
                'add departments',
                'update employee role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'view employees':
                    employeeSearch();
                    break;

                case 'view roles':
                    roleSearch();
                    break;

                case 'view departments':
                    deptSearch();
                    break;

                case 'add employees':
                    addEmployee();
                    break;

                case 'add roles':
                    addRole();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
//if case 'view employees', then run this fuction
const employeeSearch = () => {
    console.log('selecting all content...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        searchRun();
    });
};
//function to view roles
const roleSearch = () => {
    console.log('selecting roles...\n');
    connection.query('SELECT * FROM daca_dealershipDB.role', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        searchRun();
    });
};
//funciton to search by dept.
const deptSearch = () => {
    console.log('selecting all content...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        searchRun();
    });
};

//function to add employee to table
const addEmployee = () => {
    console.log('Making room for new employee...\n');
    inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the new employee?'
    },
    {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the new employee?',
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'and last name?'
    },
    {
        name: 'roleId',
        type: 'input',
        message: 'What is the role id of this employee?'
    },
    {
        name: 'managerId',
        type: 'input',
        message: 'What is the manager id of this employees manager?'
    },
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    id: `${answer.id}`,
                    first_name: `${answer.firstName}`,
                    last_name: `${answer.lastName}`,
                    role_id: `${answer.roleId}`,
                    manager_id: `${answer.managerId}`
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee added to roster!\n`);
                    //goes back to 'home'menu
                    searchRun();
                }
            )
        })
};