import {Router} from "express";
import authRouter from "./auth.routes.js";
import carsRouter from "./cars.routes.js";
import carCreditRouter from "./cars.credit.routes.js";
import paymentsRouter from "./payments.routes.js";
import adminRouter from "./admin.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/car", carsRouter);
mainRouter.use("/credit", carCreditRouter);
mainRouter.use("/payment", paymentsRouter);
mainRouter.use("/admin", adminRouter);

export default mainRouter