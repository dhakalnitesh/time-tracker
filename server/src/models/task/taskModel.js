import { DataTypes } from "sequelize";
import connection from "../../database/sequelize.js";

const taskModel = connection.define("task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull:false,
    // },
    task_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    category:{
        type:DataTypes.STRING,
    },
    time_minutes:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },

},{
    tableName:'task',
    timestamps:false,
});

export default taskModel;