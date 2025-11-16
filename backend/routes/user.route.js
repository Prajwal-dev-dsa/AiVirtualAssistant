import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const userRouter = express.Router()

userRouter.get("/getCurrentUser", protectedRoute, getCurrentUser)

export default userRouter