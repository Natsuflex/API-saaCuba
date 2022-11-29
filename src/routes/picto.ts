import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { PictogramaController } from './../controller/PictogramaController';
import { Router } from 'express';

const router = Router();

// Get all pictogram
router.get('/', PictogramaController.getAll);

// Get one pictogram
router.get('/:id', [checkJwt, checkRole(['admin'])], PictogramaController.getById);

// Create a new pictogram
router.post('/', [checkJwt, checkRole(['admin'])], PictogramaController.new);

// Edit pictogram
router.patch('/:id', [checkJwt, checkRole(['admin'])], PictogramaController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], PictogramaController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],