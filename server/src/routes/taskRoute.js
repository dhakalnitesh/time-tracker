import express from "express";
import TaskController from "../models/task/taskController.js";
import verifyToken from "./authMiddleware.js";

const router = express.Router();
const TaskManager = new TaskController();
router.post("/addTask", verifyToken, TaskManager.addTask);
router.get("/task", verifyToken, TaskManager.getTask);
router.get("/task/date", verifyToken, TaskManager.getTaskByDate);
router.delete("/task/:id", verifyToken, TaskManager.deleteTask);
router.get("/task/summary/:date", verifyToken, TaskManager.summaryMinutes);
// router.get("/dashboard",verifyToken,TaskManager.getDashboard);
export default router;

