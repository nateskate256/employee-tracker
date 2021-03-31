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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (response) {
      console.log(response);
      const query = "INSERT INTO department (dept_name) VALUES (?);";

      const foo = connection.query(
        query,
        [response.department],
        function (err, data) {
          console.log("Added department", response.department);
          init();
        }
      );
    });
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
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO roles (title) VALUES (?);";

    const foo = connection.query(query, [response.role], function(err, data){
      console.log("Added role", response.role);
      init();
    })
  })
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    init();
  });
}

function addEmployee(){
  inquirer.prompt([{
    type: "input",
    name: "firstName",
    message: "What is the employees first name?"
  },
  {type: "input",
  name: "lastName",
  message: "What is the employees last name?"},
  {type: "input",
  name: "roleID",
  message: "What is the employees role ID?"},
  ])
  .then(function(response){
    console.log(response);
    const query = "INSERT INTO employee (first_name, last_name) VALUES (?, ?);";

    const foo = connection.query(query, [response.firstName, response.lastName, response.roleID], function(err, data){
      console.log("Employee's first name:", response.firstName);
      console.log("Employee's last name:", response.lastName);
      console.log("Employee's ID:", response.roleID);
      init();
    })
  })
}

