import express from 'express'
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
import congresosController from '../controllers/congresosController.js'

const congresosRouter = express.Router();
const BASE_ROUTE = "/congresos";

congresosRouter.get(BASE_ROUTE,congresosController.getCongresos);
congresosRouter.get( `${BASE_ROUTE}/:id`,congresosController.getOneCongreso);
congresosRouter.post(BASE_ROUTE, authenticate, isAdmin, congresosController.createCongreso);
congresosRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, congresosController.updateCongreso);
congresosRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, congresosController.deleteCongreso);

export default congresosRouter