import express from "express";
import connection from "./database/sequelize.js";
import "./database/models.js";
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js";
import cors from "cors";

// import mysql from "mysql2";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
res.send("Routes is working...");
});

app.use("/",userRouter);
app.use("/",taskRouter);

app.post("/addUser/:id",(req,res)=>{
    const data= req.params;
    console.log(data);
})

app.listen("5000", (req, res) => {
    console.log("Server has started");
    // with sequelize
    try{
        connection.authenticate();
        // connection.sync({alter:true});
        console.log("Database successfully Connected......");

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