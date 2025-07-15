import {Router} from "express";
import viewsController from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/index",  viewsController.Main);
viewsRouter.get("/register", viewsController.Register);
viewsRouter.get("/login", viewsController.Login);
viewsRouter.get("/car", viewsController.Cars);
viewsRouter.get("/clients", viewsController.Clients);
viewsRouter.get("/orders", viewsController.Orders);
viewsRouter.get("/profile", viewsController.Profile);
viewsRouter.get("/admins", viewsController.Admins);
viewsRouter.get("/details/:id", viewsController.Details);
viewsRouter.get("/clients/:id", viewsController.ClientDetails);
viewsRouter.get("/clientIndex", viewsController.ClientIndex);
viewsRouter.get("/clientCarDetails/:id", viewsController.ClientCarDetails);
viewsRouter.get("/clientCredits/:id", viewsController.ClientCredits);

export default viewsRouter;