import {Router} from "express";
import adminsController from "../controllers/admins.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.get("/", adminsController.getAllAdmins);
adminRouter.get("/:id", adminsController.getAdminById);
adminRouter.post("/create", authMiddleware, adminsController.createAdmin);
adminRouter.put("/update/:id", adminsController.updateAdmin);
adminRouter.delete("/delete/:id", adminsController.deleteAdmin);

export default adminRouter;