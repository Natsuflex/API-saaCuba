"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var ImagenController_1 = require("./../controller/ImagenController");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all imagen
router.get('/', ImagenController_1.ImagenController.getAll);
// Get one imagen
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ImagenController_1.ImagenController.getById);
// Create a new imagen
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ImagenController_1.ImagenController.new);
// Edit imagen
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ImagenController_1.ImagenController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], ImagenController_1.ImagenController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=imagen.js.map