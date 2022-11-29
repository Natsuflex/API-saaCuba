import { CuentoController } from './../controller/CuentoController';
import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', CuentoController.getAll);

// Get one user
router.get('/:id', [checkJwt, checkRole(['admin'])], CuentoController.getById);

// Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], CuentoController.new);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['admin'])], CuentoController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], CuentoController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],