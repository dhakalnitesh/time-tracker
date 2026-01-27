import { DataTypes } from "sequelize";
import connection from "../database.js";

const userModel= connection.define("users",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    email:{
type:DataTypes.STRING,
unique:true,
allowNull:false,
    }
});

export default userModel;