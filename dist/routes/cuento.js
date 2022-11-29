"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CuentoController_1 = require("./../controller/CuentoController");
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all users
router.get('/', CuentoController_1.CuentoController.getAll);
// Get one user
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], CuentoController_1.CuentoController.getById);
// Create a new user
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], CuentoController_1.CuentoController.new);
// Edit user
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], CuentoController_1.CuentoController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], CuentoController_1.CuentoController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=cuento.js.map