import express from 'express';
import expLaboralController from '../controllers/expLaboralController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const expLaboralRouter = express.Router();
const BASE_ROUTE = "/explaboral";

expLaboralRouter.get(BASE_ROUTE, expLaboralController.getExpLaboral);
expLaboralRouter.get(`${BASE_ROUTE}/:id`, expLaboralController.getOneExpLaboral);
expLaboralRouter.post(BASE_ROUTE, authenticate, isAdmin, expLaboralController.createExpLaboral);
expLaboralRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, expLaboralController.updateExpLaboral);
expLaboralRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, expLaboralController.deleteExpLaboral);

export default expLaboralRouter;
