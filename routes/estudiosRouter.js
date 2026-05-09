import express from 'express';
import estudiosController from '../controllers/estudiosController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const estudiosRouter = express.Router();
const BASE_ROUTE = "/estudios";

estudiosRouter.get(BASE_ROUTE, estudiosController.getEstudios);
estudiosRouter.get(`${BASE_ROUTE}/:id`, estudiosController.getOneEstudio);
estudiosRouter.post(BASE_ROUTE, authenticate, isAdmin, estudiosController.createEstudio);
estudiosRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, estudiosController.updateEstudio);
estudiosRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, estudiosController.deleteEstudio);

export default estudiosRouter;
