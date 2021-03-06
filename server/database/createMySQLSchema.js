import db from "./createMySQLConnection.js"

//Run this to create required mySQL tables
db.query(`
    DROP TABLE IF EXISTS users;
`)
db.query(`
    CREATE TABLE users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(75),
        username VARCHAR(50),
        password VARCHAR(300)
    )
`)
db.query(`
    DROP TABLE IF EXISTS employees;
`)
db.query(`
    CREATE TABLE employees(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        age INT,
        position VARCHAR(200),
        wage INT,
        isCheckedIn BOOLEAN NOT NULL DEFAULT 0,
        email VARCHAR(75)
    )
`)
db.query(`
DROP TABLE IF EXISTS bulletin;
`)
db.query(`
CREATE TABLE bulletin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    headline VARCHAR(50),
    message VARCHAR(500),
    budget INT
)
`)
db.query(`
INSERT INTO bulletin(headline,message,budget)
VALUES("enter headline here",
"enter message here",
0);
`)

db.end();