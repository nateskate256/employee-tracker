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
        case "Add a Department ":
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
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO department (name) VALUES (?);";

    const foo = connection.query(query, [response.dept_name], function(err, data){
      console.log("Added department", response.dept_name);
      init();
    })
  })
}

