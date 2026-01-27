import { DataTypes } from "sequelize";
import connection from "../database.js";

const taskModel= connection.define("tasks",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
type:DataTypes.INTEGER,
foreignKey:'userId',
    }

})