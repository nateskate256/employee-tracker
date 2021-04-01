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
          "Add a Role",
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
        case "Update Employee Role":
          updateEmployee();
          break;
        default:
          console.log("Invalid Choice:", response.options)
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
    name: "title",
    message: "What is the name of the role you would like to add?"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary?"
  },
  {
    type: "input",
    name: "dept_id",
    message: "What is the department id?"
  },
  ]).then(function(response){
    console.log(response);
    const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";

    const foo = connection.query(query, [response.title, response.salary, response.dept_id], function(err, data){
      console.log("Added role", response.title);
      console.log("Added salary", response.salary);
      console.log("Added dept_id", response.dept_id);
      init();
    })
  })
}

function viewEmployees() {
  let viewString = "SELECT e.id ,e.first_name, e.last_name, r.title, d.dept_name, r.salary, em.first_name AS 'Manager First Name', em.last_name AS 'Manager Last Name' FROM employee AS e "
  viewString += "INNER JOIN roles AS r ON e.role_id = r.id "
  viewString += "INNER JOIN department AS d On r.department_id = d.id "
  viewString += "INNER JOIN employee AS em ON e.manager_id = em.id"
  console.log(viewString)
  connection.query(viewString, function (err, data) {
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
  {type: "input",
  name: "managerID",
  message: "What is the employees manager ID?"},
  ])
  .then(function(response){
    console.log(response);
    const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);";

    const foo = connection.query(query, [response.firstName, response.lastName, response.roleID, response.managerID], function(err, data){
      console.log("Employee's first name:", response.firstName);
      console.log("Employee's last name:", response.lastName);
      console.log("Employee's ID:", response.roleID);
      console.log("Employee's Manager ID:", response.managerID);
      init();
    })
  })
}

