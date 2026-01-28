import express from "express";
import TaskController from "../models/task/taskController.js";
import verifyToken from "./authMiddleware.js";

const router=express.Router();
const TaskManager=new TaskController();
router.post("/task",verifyToken ,TaskManager.task);
router.get("/task",verifyToken ,TaskManager.getTask);
router.get("/task/date/:date",verifyToken ,TaskManager.getTaskByDate);
export default router;