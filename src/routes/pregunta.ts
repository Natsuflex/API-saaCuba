import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import PreguntaController from '../controller/PreguntaController';

const router = Router();

// Get all pregunta
router.get('/', PreguntaController.getAll);

// Get one pregunta
router.get('/:id', [checkJwt, checkRole(['admin'])], PreguntaController.getById);

// Create a new pregunta
router.post('/', [checkJwt, checkRole(['admin'])], PreguntaController.new);

// Edit pregunta
router.patch('/:id', [checkJwt, checkRole(['admin'])], PreguntaController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], PreguntaController.delete);

//Preguntas de una misma prueba
router.get('/prueba/:id', PreguntaController.getAllById);

export default router;


//[checkJwt, checkRole(['admin'])],