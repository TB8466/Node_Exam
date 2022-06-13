import dotenv from "dotenv"
dotenv.config();
import mysql from "mysql"

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
/* const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "smartmarket"
}) */
connection.connect();

console.log(connection);

export default connection;