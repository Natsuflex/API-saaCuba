import { ComentarioController } from './../controller/ComentarioController';
import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';

const router = Router();

// Get all coment
router.get('/', ComentarioController.getAll);

// Get one coment
router.get('/:id', [checkJwt, checkRole(['admin'])], ComentarioController.getById);

// Create a new coment
router.post('/', [checkJwt, checkRole(['admin'])], ComentarioController.new);

// Edit coment
router.patch('/:id', [checkJwt, checkRole(['admin'])], ComentarioController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], ComentarioController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],