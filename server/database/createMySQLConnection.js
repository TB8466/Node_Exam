import dotenv from "dotenv"
dotenv.config({path: "../.env"});
import mysql from "mysql"

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect();

console.log(connection);

export default connection;