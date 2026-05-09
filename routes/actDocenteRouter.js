import express from "express";
import actDocenteController from "../controllers/actDocenteController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const actDocenteRouter = express.Router();
const BASE_ROUTE = "/actdocente";

actDocenteRouter.get(BASE_ROUTE, actDocenteController.getActDocentes);
actDocenteRouter.get(
  `${BASE_ROUTE}/:id`,
  actDocenteController.getOneActDocente
);
actDocenteRouter.post(BASE_ROUTE, authenticate, isAdmin, actDocenteController.createActDocente);
actDocenteRouter.put(
  `${BASE_ROUTE}/:id`,
  authenticate, isAdmin,
  actDocenteController.updateActDocente
);
actDocenteRouter.delete(
  `${BASE_ROUTE}/:id`,
  authenticate, isAdmin,
  actDocenteController.deleteActDocente
);

export default actDocenteRouter;
