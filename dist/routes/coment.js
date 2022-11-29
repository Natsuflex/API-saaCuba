"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComentarioController_1 = require("./../controller/ComentarioController");
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all coment
router.get('/', ComentarioController_1.ComentarioController.getAll);
// Get one coment
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ComentarioController_1.ComentarioController.getById);
// Create a new coment
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ComentarioController_1.ComentarioController.new);
// Edit coment
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ComentarioController_1.ComentarioController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ComentarioController_1.ComentarioController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=coment.js.map