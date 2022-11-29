"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var SeccionController_1 = require("./../controller/SeccionController");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all seccion
router.get('/', SeccionController_1.SeccionController.getAll);
// Get one seccion
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], SeccionController_1.SeccionController.getById);
// Create a new seccion
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], SeccionController_1.SeccionController.new);
// Edit seccion
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], SeccionController_1.SeccionController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], SeccionController_1.SeccionController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=seccion.js.map