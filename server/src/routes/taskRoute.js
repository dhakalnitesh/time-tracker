import express from "express";
import TaskController from "../models/task/taskController.js";
import verifyToken from "./authMiddleware.js";

const router = express.Router();
const TaskManager = new TaskController();
router.post("/addTask", verifyToken, TaskManager.addTask);
router.get("/task", verifyToken, TaskManager.getTask);
router.get("/task/:id", verifyToken, TaskManager.getTaskById);
router.delete("/task/delete/:id", verifyToken, TaskManager.deleteTask);//changed the route
router.put("/task/update/:id", verifyToken, TaskManager.updateTask);//changed the route
router.get("/task/summary/:date", verifyToken, TaskManager.summaryMinutes);
router.get("/task/By/:date", verifyToken, TaskManager.getTaskByDate);
// router.get("/dashboard",verifyToken,TaskManager.getDashboard);
export default router;

