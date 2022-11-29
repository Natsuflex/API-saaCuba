"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EscenarioController_1 = require("./../controller/EscenarioController");
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all users
router.get('/', EscenarioController_1.EscenarioController.getAll);
// Get one user
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], EscenarioController_1.EscenarioController.getById);
// Create a new user
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], EscenarioController_1.EscenarioController.new);
// Edit user
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], EscenarioController_1.EscenarioController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], EscenarioController_1.EscenarioController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=escenario.js.map