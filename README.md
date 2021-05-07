
# Employee Tracker App<br>

![License](https://img.shields.io/badge/License-MIT-green.svg)<br>

## Description:<br>

The Employee Tracker App is an ExpressJS and MySQL database application for managing and tracking employees, departments and roles within an organization. MySQL is used to store the employee data long-term within a database table structure. Users can enter new employees, update and delete existing employees, and manage departments and employee roles within the database with a simple command-line interface where data can be input in response to a series of prompts specifically for the task selected.<br>

The Employee Tracker App utilizes the following technologies:
  * JavaScript
  * NODE.JS
  * NPM packages:
    * Inquirer
    * MySQL
    * DOTENV
    * CONSOLE.TABLE

---


## Table of Contents<br>

[Installation](#installation)<br>

[Usage](#usage)<br>

[License](#license)<br>

[Contributors](#contributors)<br>

[Tests](#tests)<br>

[Questions](#Questions)<br>

---

## Installation:<br>

My files can be accessed in the repository [HERE](https://github.com/arcangyl1963/employee-tracker-db)<br>

The image below shows the repository where my project files are located:

![Employee Tracker App Repository](./public/assets/images/note-taker-app_gitrepo.png)

Install the application by cloning the repo from the link above or by downloading the files to your local drive.

The repository will contain all of the files needed to run the application:

* A 'sql' directory containing the schema and seed files for creating the database with tables and populating the tables with placeholder records.
* An 'assets' directory containing the image files for the README document.
* A package.json file that contains the dependencies required for the application to run and the application script information.
* An index.js script file that is invoked in NodeJS to run the application.

First begin by installing any dependencies required to run the application and to setup the development environment on your local repository.<br>

In Terminal or a similar bash command-line utility, navigate to the working directory and enter:<br>

~~~
npm install OR npm i
~~~

This will install any package dependencies defined in the package.json file.<br>

If you do not have MySQL installed on your system, you will need to install it as well. Download the appropriate installer for your operating system from [here](https://dev.mysql.com/downloads/installer/) and follow the instructions provided by the installer.<br>

Before launching the application, you will need to create the database with inserted tables using the schema.sql file, and then seed the database with placeholder data from the seed.sql file. This can be done in the MySQL CLI or from a SQL connection GUI application such as MySQL Workbench or Sequel Pro.<br>
To create the database using the CLI:
  In Terminal or a similar BASH utility, enter:
  ~~~
  mysql -u root -p
  ~~~
  When prompted for password enter the password for the root MySQL user you set during installation of MySQL.
  You should then see the mysql prompt indicating you are now in the MySQL CLI:
  ~~~
  mysql>
  ~~~
  Copy the SQL commands from the schema.sql file in sql directory and paste them in the CLI:
  ~~~
For example, to remove the database if it exists and create a new database you would paste this:

mysql> DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
~~~
  Next paste your USE database and CREATE TABLE commands from the schema file:
  ~~~
  mysql> USE employees_DB;
  CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
  );
~~~
Paste the remaining CREATE TABLE command strings for the 'roles' and 'employees' tables to create them as well.

Once the database has been created and the tables seeded, you are now ready to launch the application.<br>

---

## Usage:<br>
To run the application locally type the following into Terminal or the command-line utility of your choice:

~~~
node index.js
~~~

The application loads a list of available tasks that can be performed. Use the UP and DOWN arrow keys to navigate through the list. Highlight the task you want to perform and hit Enter.<br>

![Note Taker App landing page](./public/assets/images/note-taker-app_landing.png)

The right side of the note panel contains the title entry field and the note text entry field where the user enters the note information. The left side displays the list of saved notes.

![Note Taker App note page](./public/assets/images/note-taker-app_notes.png)

When the user enters a title and the note text into the text area, a Save icon will display next to the New Note icon.

![Note Taker App note enter](./public/assets/images/note-taker-app_notes-enter.png)

Clicking the Save icon will save the note to the database file and the note will display in the left-side note list.

![Note Taker App note page](./public/assets/images/note-taker-app_notes-saved.png)

When the user clicks on one of the notes in the note list, the title and contents of the note will display in the text area to the right.

![Note Taker App note page](./public/assets/images/note-taker-app_notes-display-selected.png)

---

## License:<br>

![License](https://img.shields.io/badge/License-MIT-green.svg)<br>This software is licensed under an MIT license:<br><br>Copyright © 2021 Arcangyl Studios<br><br>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br>

---

## Contributors:<br>

James Harris<br>

---

## Tests:<br>

There were 4 tests created for each of the classes. All 4 tests passed during testing.<br>
To run the tests, enter the following command into Terminal or command-line bash utility of your choice:<br>

~~~
npm test
~~~

---

## Questions:<br>


- Feel free to email me with any questions about this project at: arcangyl@gmail.com<br>

![GitHubAvatar](https://avatars.githubusercontent.com/u/77169680?v=4)<br>

- My GitHub profile may be viewed by clicking [here](https://github.com/arcangyl1963).