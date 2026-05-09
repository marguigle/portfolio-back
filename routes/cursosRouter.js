import express from "express";
import cursosController from "../controllers/cursosController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const cursosRouter = express.Router();
const BASE_ROUTE = "/cursos";

cursosRouter.get(BASE_ROUTE, cursosController.getCursos);
cursosRouter.get(`${BASE_ROUTE}/:id`, cursosController.getOneCurso);
cursosRouter.post(BASE_ROUTE, authenticate, isAdmin, cursosController.createCurso);
cursosRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, cursosController.updateCurso);
cursosRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, cursosController.deleteCurso);

export default cursosRouter;
