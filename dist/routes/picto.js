"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var PictogramaController_1 = require("./../controller/PictogramaController");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all pictogram
router.get('/', PictogramaController_1.PictogramaController.getAll);
// Get one pictogram
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PictogramaController_1.PictogramaController.getById);
// Create a new pictogram
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PictogramaController_1.PictogramaController.new);
// Edit pictogram
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PictogramaController_1.PictogramaController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PictogramaController_1.PictogramaController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=picto.js.map