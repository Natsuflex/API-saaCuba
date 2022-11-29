import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PruebaController } from './../controller/PruebaController';
import { Router } from 'express';

const router = Router();

// Get all prueba
router.get('/', PruebaController.getAll);

// Get one prueba
router.get('/:id', [checkJwt, checkRole(['admin'])], PruebaController.getById);

// Create a new prueba
router.post('/', [checkJwt, checkRole(['admin'])], PruebaController.new);

// Edit prueba
router.patch('/:id', [checkJwt, checkRole(['admin'])], PruebaController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], PruebaController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],