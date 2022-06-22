#Employeemanager DB Script
CREATE SCHEMA IF NOT EXISTS employeemanager;
USE employeemanager;
#User
DROP TABLE IF EXISTS users;
CREATE TABLE users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(75),
        username VARCHAR(50),
        password VARCHAR(300)
    );
    
#Employees
DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        age INT,
        position VARCHAR(200),
        wage INT,
        isCheckedIn BOOLEAN NOT NULL DEFAULT 0,
        email VARCHAR(75)
    );
#Bulletin
DROP TABLE IF EXISTS bulletin;
CREATE TABLE bulletin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    headline VARCHAR(50),
    message VARCHAR(500),
    budget INT
)