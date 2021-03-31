const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "Add a Department",
          "View All Roles",
          "Add A Role",
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.options) {
        case "View All Departments":
          viewDepartments();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        default:
          connection.end();
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    init();
  });
}

function addDepartment(){
  inquirer.prompt([{
    type: "input",
    name: "department",
    message: "What is the name of the department you would like to add?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID you would like to give this department?"
  },
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO department (dept_name, id) VALUES (?, ?);";

    const foo = connection.query(query, [response.department, response.id], function(err, data){
      console.log("Added department", response.department);
      console.log("Added ID", response.id);
      init();
    })
  })
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    init();
  });
}

function addRole(){
  inquirer.prompt([{
    type: "input",
    name: "role",
    message: "What is the name of the role you would like to add?"
  },
  {
    type: "input",
    name: "id",
    message: "What ID would like to give this role?"
  },
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?);";

    const foo = connection.query(query, [response.id, response.title, response.salary, response.department_id], function(err, data){
      console.log("Added role", response.title);
      init();
    })
  })
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, data) {
    console.table(data);
    init();
  });
}

function addEmployee(){
  inquirer.prompt([{
    type: "input",
    name: "employee",
    message: "What employee would you like to add?"
  },
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?);";

    const foo = connection.query(query, [response.id, response.first_name, response.last_name, response.role_id,response.manager_id], function(err, data){
      console.log("Added role", response.dept_name);
      init();
    })
  })
}

