import { EscenarioController } from './../controller/EscenarioController';
import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', EscenarioController.getAll);

// Get one user
router.get('/:id', [checkJwt, checkRole(['admin'])], EscenarioController.getById);

//get all escenario one seccion
router.get('/seccion/:id', EscenarioController.getBySec)

// Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], EscenarioController.new);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['admin'])], EscenarioController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], EscenarioController.delete);

export default router;


//[checkJwt, checkRole(['admin'])],