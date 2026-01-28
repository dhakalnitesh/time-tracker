import {Sequelize} from "sequelize";
import mysql from "mysql2";
import "dotenv/config";

const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_DATABASE}=process.env;
const connection = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host :DB_HOST,
    dialect:"mysql",
})

export default connection;