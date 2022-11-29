import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { VideoController } from './../controller/VideoController';
import { Router } from 'express';

const router = Router();

// Get all video
router.get('/', VideoController.getAll);

// Get one video
router.get('/:id', [checkJwt, checkRole(['admin'])], VideoController.getById);

// Create a new video
router.post('/', [checkJwt, checkRole(['admin'])], VideoController.new);

// Edit video
router.patch('/:id', [checkJwt, checkRole(['admin'])], VideoController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], VideoController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],