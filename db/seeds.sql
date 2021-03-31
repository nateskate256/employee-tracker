USE employee_DB;

INSERT INTO department (dept_name)
VALUES ("Vans", "FA", "Converse", "Nike", "Adidas");


INSERT INTO roles (title, salary)
VALUES ("Skateboarder", 100000), ("Company Manager", 200000);

INSERT INTO employee (firstname, lastname)
VALUES ("Nate", "Shipp"), ("Barek", "Hernandez"), ("Blake", "Smith");

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

SELECT id, first_name, last_name, title, salary, dept_name,
FROM employee JOIN roles