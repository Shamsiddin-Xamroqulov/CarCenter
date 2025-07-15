import {Router} from "express";
import paymentsController from "../controllers/payments.controller.js";

const paymentsRouter = Router();

paymentsRouter.get("/", paymentsController.getAllPayments)
paymentsRouter.get("/:id", paymentsController.getPaymentById)
paymentsRouter.post("/create", paymentsController.createPayment)
paymentsRouter.put("/update/:id", paymentsController.updatePayment)
paymentsRouter.delete("/delete/:id", paymentsController.deletePayment)

export default paymentsRouter;