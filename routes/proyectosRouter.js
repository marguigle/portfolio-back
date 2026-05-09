import express from "express";
import proyectosController from "../controllers/proyectosController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const proyectosRouter = express.Router();
const BASE_ROUTE = "/proyectos";

proyectosRouter.get(BASE_ROUTE, proyectosController.getProyectos);
proyectosRouter.get(`${BASE_ROUTE}/:id`, proyectosController.getOneProyecto);
proyectosRouter.post(BASE_ROUTE, authenticate, isAdmin, proyectosController.createProyecto);
proyectosRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, proyectosController.updateProyecto);
proyectosRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, proyectosController.deleteProyecto);

export default proyectosRouter;
