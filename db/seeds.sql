USE employee_DB;

INSERT INTO department (dept_name)
-- VALUES ("Vans", "FA", "Converse", "Nike", "Adidas");


INSERT INTO roles (title, salary)
-- VALUES ("Skateboarder", 100000), ("Company Manager", 200000);

INSERT INTO employee (first_name, last_name)
-- VALUES ("Nate", "Shipp"), ("Barek", "Hernandez"), ("Blake", "Smith");

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

SELECT * FROM employee AS e
INNER JOIN roles AS r ON e.role_id = r.id

