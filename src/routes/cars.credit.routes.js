import {Router} from "express";
import carsCreditController from "../controllers/cars.credit.controller.js";

const carCreditRouter = Router();

carCreditRouter.get("/", carsCreditController.getAllCredits);
carCreditRouter.get("/:id", carsCreditController.getCreditById);
carCreditRouter.post("/create", carsCreditController.createCredit);
carCreditRouter.put("/update/:id", carsCreditController.updateCredit);
carCreditRouter.delete("/delete/:id", carsCreditController.deleteCredit);

export default carCreditRouter;