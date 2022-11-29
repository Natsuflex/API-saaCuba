"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./../middlewares/role");
var jwt_1 = require("./../middlewares/jwt");
var VideoController_1 = require("./../controller/VideoController");
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all video
router.get('/', VideoController_1.VideoController.getAll);
// Get one video
router.get('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], VideoController_1.VideoController.getById);
// Create a new video
router.post('/', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], VideoController_1.VideoController.new);
// Edit video
router.patch('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], VideoController_1.VideoController.edit);
// Delete
router.delete('/:id', [jwt_1.checkJwt, (0, role_1.checkRole)(['admin'])], VideoController_1.VideoController.delete);
exports.default = router;
//[checkJwt, checkRole(['admin'])],
//# sourceMappingURL=video.js.map