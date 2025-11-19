import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { askAssistant } from "../controllers/gemini.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { updateAvatar } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";


const userRouter = express.Router()

userRouter.get("/getCurrentUser", protectedRoute, getCurrentUser)
userRouter.put("/updateAvatar", protectedRoute, upload.single("assistantImage"), updateAvatar)
userRouter.post("/askAssistant", protectedRoute, askAssistant)

export default userRouter