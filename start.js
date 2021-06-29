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

console.log(`
██     ██ ███████ ██      ██████  ██████  ███    ███ ███████     ████████  ██████      ███████ ███    ███ ██████  ██      ██████ ██    ██ ███████ ███████     
██     ██ ██      ██     ██      ██    ██ ████  ████ ██             ██    ██    ██     ██      ████  ████ ██   ██ ██     ██    ██ ██  ██  ██      ██          
██  █  ██ █████   ██     ██      ██    ██ ██ ████ ██ █████          ██    ██    ██     █████   ██ ████ ██ ██████  ██     ██    ██  ████   █████   █████       
██ ███ ██ ██      ██     ██      ██    ██ ██  ██  ██ ██             ██    ██    ██     ██      ██  ██  ██ ██      ██     ██    ██   ██    ██      ██          
 ███ ███  ███████ ███████ ██████  ██████  ██      ██ ███████        ██     ██████      ███████ ██      ██ ██      ███████ ██████    ██    ███████ ███████     
                                                                                                                                                              
████████ ██████   █████   ██████ ██   ██ ███████ ██████  ██                                                                                                   
   ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██ ██                                                                                                   
   ██    ██████  ███████ ██      █████   █████   ██████  ██                                                                                                   
   ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██                                                                                                      
   ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ ██                                                                                                   
                                                                                                                                                              
                                                                                                                                                              `);
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
                'add department',
                'update employee role',
                'Exit',
            ],
        })
        // gets the answer from promt and runs selected case
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

                case 'add department':
                    addDept();
                    break;

                case 'update employee role':
                    updateEmployee();
                    break;

                case 'Exit':
                    exit();
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
    connection.query('SELECT * FROM role', (err, res) => {
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
    console.log('Before adding a new employee, please make sure that the department and role the new employee will belong to exist.')
    console.log('If not, please add department and role before adding employee')
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
    //gets input from user and uses it to complete query search
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
//updates employee role
const addRole = () => {
    console.log('Creating new role...\n');
    console.log('Before creating a new role, please make sure the department that role will belong to exists.if not, please create new department before adding role.')
    inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the new role?'
    },
    {
        name: 'title',
        type: 'input',
        message: 'What is the title of the new role?',
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the anual income of this role?'
    },
    {
        name: 'deptId',
        type: 'input',
        message: 'What is the department id of the new role?'
    },
    ])
    //gets input from user to add a role
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    id: `${answer.id}`,
                    title: `${answer.title}`,
                    salary: `${answer.salary}`,
                    department_id: `${answer.deptId}`
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} New role created!\n`);
                    //goes back to 'home'menu
                    searchRun();
                }
            )
        })
};
//function to add dept.
const addDept = () => {
    console.log('Creating a new department...\n');
    inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the new department'
    },
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?',
    },

    ])
    //gets answer from user and uses it to complete query search
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    id: `${answer.id}`,
                    name: `${answer.name}`,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} New department created, Congratulations on your expansion!!\n`);
                    //goes back to 'home'menu
                    searchRun();
                }
            )
        })
};
//function to update employee
const updateEmployee = () => {
    console.log('Updating employee role...\n');
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the id of the employee whose role you want to update?'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'What is the new role id?'
        },
    ])
    //gets input from user and uses it to update employee role id
        .then((answer) => {
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: `${answer.roleId}`,
                    },
                    {
                        id: `${answer.id}`,
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee role update!\n`);
                    searchRun();
                },
            )
        });
}
//end the conection
const exit = () => {
    console.log(`
    ████████ ██   ██  █████  ███    ██ ██   ██     ██    ██  ██████  ██    ██                              
       ██    ██   ██ ██   ██ ████   ██ ██  ██       ██  ██  ██    ██ ██    ██                              
       ██    ███████ ███████ ██ ██  ██ █████         ████   ██    ██ ██    ██                              
       ██    ██   ██ ██   ██ ██  ██ ██ ██  ██         ██    ██    ██ ██    ██                              
       ██    ██   ██ ██   ██ ██   ████ ██   ██        ██     ██████   ██████                               
                                                                                                           
    ███████  ██████  ██████      ██    ██  ██████  ██    ██ ██████      ██    ██ ██ ███████ ██ ████████ ██ 
    ██      ██    ██ ██   ██      ██  ██  ██    ██ ██    ██ ██   ██     ██    ██ ██ ██      ██    ██    ██ 
    █████   ██    ██ ██████        ████   ██    ██ ██    ██ ██████      ██    ██ ██ ███████ ██    ██    ██ 
    ██      ██    ██ ██   ██        ██    ██    ██ ██    ██ ██   ██      ██  ██  ██      ██ ██    ██       
    ██       ██████  ██   ██        ██     ██████   ██████  ██   ██       ████   ██ ███████ ██    ██    ██ 
                                                                                                           
                                                                                                          `);
    connection.end();
}



