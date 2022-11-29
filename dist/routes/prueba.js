"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var PruebaController_1 = require("./../controller/PruebaController");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all prueba
router.get('/', PruebaController_1.PruebaController.getAll);
// Get one prueba
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PruebaController_1.PruebaController.getById);
// Create a new prueba
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PruebaController_1.PruebaController.new);
// Edit prueba
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PruebaController_1.PruebaController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PruebaController_1.PruebaController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=prueba.js.map