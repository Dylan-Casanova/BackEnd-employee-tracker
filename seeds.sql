--seeds for dept. table
INSERT INTO  department (id,name)
VALUES (1, 'SALES');

INSERT INTO  department (id,name)
VALUES (2, 'CUSTOMER SERVICE');

INSERT INTO  department (id,name)
VALUES (3, 'SERVICE');

INSERT INTO  department (id,name)
VALUES (4, 'LEGAL');

--inserting seeds for role table
INSERT INTO  role (id,title,salary,department_id)
VALUES (1, 'Manager', 300000,1);

INSERT INTO  role (id,title,salary,department_id)
VALUES (2, 'Sales Rep.', 100000,1);

INSERT INTO  role (id,title,salary,department_id)
VALUES (3, 'Customer Service Rep.', 80000,2);

INSERT INTO  role (id,title,salary,department_id)
VALUES (4, 'Mechanic', 100000,3);

INSERT INTO  role (id,title,salary,department_id)
VALUES (1, 'Lawyer', 200000,4);

--adding seeds to employee table

INSERT INTO  employee (id,first_name,last_name,role_id,manager_id)
VALUES (1, 'Dylan', 'Casanova',1,1);

INSERT INTO  employee (id,first_name,last_name,role_id,manager_id)
VALUES (2, 'Leo', 'Brown',2,1);

INSERT INTO  employee (id,first_name,last_name,role_id,manager_id)
VALUES (3, 'Jenny', 'Valdez',3,1);

INSERT INTO  employee (id,first_name,last_name,role_id,manager_id)
VALUES (4, 'Hector', 'Rodriguez',4,1);

INSERT INTO  employee (id,first_name,last_name,role_id,manager_id)
VALUES (5, 'Walter', 'White',5,1);


