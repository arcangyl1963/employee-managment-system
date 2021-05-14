-- Populate DB with placeholder data

USE employees_DB;

INSERT INTO department (name)
VALUES ("Advertising Sales"), ("Marketing"), ("Editorial"), ("Creative Services");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 80000, 1), ("Marketing Director", 70000, 2), ("Editor-in-Chief", 65000, 3), ("Section Editor", 55000, 3), ("Art Director", 60000, 4), ("Graphic Designer", 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Don", "Draper", 1, 1), ("Nicholas", "Tapp", 2, 1), ("JJ", "Jameson", 3, 1), ("Ben", "Urich", 4, 3), ("Stan", "Lee", 5, 1), ("Jack", "Kirby", 6, 5);