import express from "express";
import connection from "./database.js";
// import mysql from "mysql2";

const app = express();


app.listen("8000", (req, res) => {
    console.log("Server has started");
    // with sequelize
    try{
        connection.authenticate();
        connection.sync();
        console.log("Database successfully Connected......")

    }catch(err){
        console.error(err);
    }
    // without the Sequelize
    // const connection = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "Nitesh@123",
    //     database: "taskManager"
    // });
    // connection.connect();
    // console.log("Server is connected to database")
    // console.log(connection);


})