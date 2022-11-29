import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { SeccionController } from './../controller/SeccionController';
import { Router } from 'express';

const router = Router();

// Get all seccion
router.get('/', SeccionController.getAll);

// Get one seccion
router.get('/:id', [checkJwt, checkRole(['admin'])], SeccionController.getById);

// Create a new seccion
router.post('/', [checkJwt, checkRole(['admin'])], SeccionController.new);

// Edit seccion
router.patch('/:id', [checkJwt, checkRole(['admin'])], SeccionController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], SeccionController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],