"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var express_1 = require("express");
var PreguntaController_1 = require("../controller/PreguntaController");
var router = (0, express_1.Router)();
// Get all pregunta
router.get('/', PreguntaController_1.default.getAll);
// Get one pregunta
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PreguntaController_1.default.getById);
// Create a new pregunta
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PreguntaController_1.default.new);
// Edit pregunta
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PreguntaController_1.default.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], PreguntaController_1.default.delete);
//Preguntas de una misma prueba
router.get('/prueba/:id', PreguntaController_1.default.getAllById);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=pregunta.js.map