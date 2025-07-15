import {Router} from "express";
import CarsController from "../controllers/cars.controller.js";
import { upload } from "../lib/cloudinary.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const carsRouter = Router();

carsRouter.post('/create', authMiddleware, upload.array('images'), CarsController.createCar);
carsRouter.get('/', CarsController.getAllCars);
carsRouter.get('/:id', CarsController.getCarById);
carsRouter.put('update/:id', authMiddleware, CarsController.updateCar);
carsRouter.delete('delete/:id', authMiddleware, CarsController.deleteCar);

export default carsRouter;