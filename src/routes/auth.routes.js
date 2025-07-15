import {Router} from "express";
import authController from "../controllers/auth.controller.js";
import { avatarUpload } from "../lib/cloudinary.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", avatarUpload.single("avatar"), authController.register);
authRouter.post("/login", authController.login);

export default authRouter;