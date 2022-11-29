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
exports.VideoController = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Video_1 = require("../entity/Video");
var VideoController = /** @class */ (function () {
    function VideoController() {
    }
    var _a;
    _a = VideoController;
    VideoController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var videoRepository, videos, e_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    videoRepository = (0, typeorm_1.getRepository)(Video_1.Video);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, videoRepository.find({ select: ['id', 'video', 'descript'] })];
                case 2:
                    videos = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.status(404).json({ message: 'Somenthing goes wrong!' });
                    return [3 /*break*/, 4];
                case 4:
                    if (videos.length > 0) {
                        res.send(videos);
                    }
                    else {
                        res.status(404).json({ message: 'Not result' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    VideoController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, videoRepository, video, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    videoRepository = (0, typeorm_1.getRepository)(Video_1.Video);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, videoRepository.findOneOrFail(id)];
                case 2:
                    video = _b.sent();
                    res.send(video);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.status(404).json({ message: 'Not result' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    VideoController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, video, descript, vid, validationOpt, errors, videoRepository, e_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, video = _b.video, descript = _b.descript;
                    vid = new Video_1.Video();
                    vid.video = video;
                    vid.descript = descript;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, (0, class_validator_1.validate)(vid, validationOpt)];
                case 1:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    videoRepository = (0, typeorm_1.getRepository)(Video_1.Video);
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, videoRepository.save(vid)];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Video already exist' })];
                case 5:
                    // All ok
                    res.send('Video created');
                    return [2 /*return*/];
            }
        });
    }); };
    VideoController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var vid, id, _b, video, descript, videoRepository, e_4, validationOpt, errors, e_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = req.body, video = _b.video, descript = _b.descript;
                    videoRepository = (0, typeorm_1.getRepository)(Video_1.Video);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, videoRepository.findOneOrFail(id)];
                case 2:
                    vid = _c.sent();
                    vid.video = video;
                    vid.descript = descript;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _c.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Video not found' })];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, (0, class_validator_1.validate)(vid, validationOpt)];
                case 5:
                    errors = _c.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, videoRepository.save(vid)];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _c.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Video already in use' })];
                case 9:
                    res.status(201).json({ message: 'Video update' });
                    return [2 /*return*/];
            }
        });
    }); };
    VideoController.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, videoRepository, video, e_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    videoRepository = (0, typeorm_1.getRepository)(Video_1.Video);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, videoRepository.findOneOrFail(id)];
                case 2:
                    video = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Video not found' })];
                case 4:
                    // Remove video
                    videoRepository.delete(id);
                    res.status(201).json({ message: ' Video deleted' });
                    return [2 /*return*/];
            }
        });
    }); };
    return VideoController;
}());
exports.VideoController = VideoController;
exports.default = VideoController;
//# sourceMappingURL=VideoController.js.map