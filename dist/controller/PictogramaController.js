"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictogramaController = void 0;
var typeorm_1 = require("typeorm");
var Pictograma_1 = require("../entity/Pictograma");
var class_validator_1 = require("class-validator");
var PictogramaController = /** @class */ (function () {
    function PictogramaController() {
    }
    var _a;
    _a = PictogramaController;
    PictogramaController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var pictoRepository, pictos, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    pictoRepository = (0, typeorm_1.getRepository)(Pictograma_1.Picto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pictoRepository.find({ select: ['id', 'valor', 'pictograma'] })];
                case 2:
                    pictos = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.status(404).json({ message: 'Somenthing goes wrong!' });
                    return [3 /*break*/, 4];
                case 4:
                    if (pictos.length > 0) {
                        res.send(pictos);
                    }
                    else {
                        res.status(404).json({ message: 'Not result' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PictogramaController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, pictoRepository, picto, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    pictoRepository = (0, typeorm_1.getRepository)(Pictograma_1.Picto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pictoRepository.findOneOrFail(id)];
                case 2:
                    picto = _b.sent();
                    res.send(picto);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.status(404).json({ message: 'Not result' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    PictogramaController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, valor, pictograma, id_user, picto, validationOpt, errors, pictoRepository, e_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, valor = _b.valor, pictograma = _b.pictograma, id_user = _b.id_user;
                    picto = new Pictograma_1.Picto();
                    picto.valor = valor;
                    picto.pictograma = pictograma;
                    picto.id_user = id_user;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, (0, class_validator_1.validate)(picto, validationOpt)];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    pictoRepository = (0, typeorm_1.getRepository)(Pictograma_1.Picto);
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, pictoRepository.save(picto)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Pictogram already exist' })];
                case 5:
                    // All ok
                    res.send('Pictogram created');
                    return [2 /*return*/];
            }
        });
    }); };
    PictogramaController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var picto, id, _b, valor, pictograma, pictoRepository, e_4, validationOpt, errors, e_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, valor = _b.valor, pictograma = _b.pictograma;
                    pictoRepository = (0, typeorm_1.getRepository)(Pictograma_1.Picto);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pictoRepository.findOneOrFail(id)];
                case 2:
                    picto = _c.sent();
                    picto.valor = valor;
                    picto.pictograma = pictograma;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _c.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Pictogram not found' })];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, (0, class_validator_1.validate)(picto, validationOpt)];
                case 5:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, pictoRepository.save(picto)];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Pictogram already in use' })];
                case 9:
                    res.status(201).json({ message: 'Pictogram update' });
                    return [2 /*return*/];
            }
        });
    }); };
    PictogramaController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, pictoRepository, picto, e_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    pictoRepository = (0, typeorm_1.getRepository)(Pictograma_1.Picto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pictoRepository.findOneOrFail(id)];
                case 2:
                    picto = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Pictogram not found' })];
                case 4:
                    // Remove picto
                    pictoRepository.delete(id);
                    res.status(201).json({ message: ' Pictogram deleted' });
                    return [2 /*return*/];
            }
        });
    }); };
    return PictogramaController;
}());
exports.PictogramaController = PictogramaController;
exports.default = PictogramaController;
//# sourceMappingURL=PictogramaController.js.map