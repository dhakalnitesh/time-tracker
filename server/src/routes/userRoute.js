import UserController from "../models/user/userController.js";
import express from "express";
import verifyToken from "./authMiddleware.js";

const router=express.Router();
const UserManager =new UserController;
router.post("/signup",UserManager.signup);
router.post("/login",UserManager.login);
router.get("/user",verifyToken,UserManager.getUser);
export default router;
