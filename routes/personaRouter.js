import express from 'express';
import personaController from '../controllers/personaController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const personaRouter = express.Router();
const BASE_ROUTE = "/persona";
personaRouter.get(BASE_ROUTE, personaController.getPersona);
personaRouter.post(BASE_ROUTE, authenticate, isAdmin, personaController.createPersona);
personaRouter.put(`${BASE_ROUTE}/:id`, authenticate, isAdmin, personaController.updatePersona);
personaRouter.delete(`${BASE_ROUTE}/:id`, authenticate, isAdmin, personaController.deletePersona);

export default personaRouter;
