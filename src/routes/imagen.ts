import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ImagenController } from './../controller/ImagenController';
import { Router } from 'express';

const router = Router();

// Get all imagen
router.get('/', ImagenController.getAll);

// Get one imagen
router.get('/:id', [checkJwt, checkRole(['admin'])], ImagenController.getById);

// Create a new imagen
router.post('/', [checkJwt, checkRole(['admin'])], ImagenController.new);

// Edit imagen
router.patch('/:id', [checkJwt, checkRole(['admin'])], ImagenController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], ImagenController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],