"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controllers/videoController");
const middlewares_1 = require("../middlewares");
const videoRouter = express_1.default.Router();
videoRouter.route("/upload").all(middlewares_1.protectOnlyMiddleware).get(videoController_1.getUpload).post(middlewares_1.uploadVideo.single("video"), videoController_1.postUpload);
videoRouter.get("/:id([0-9a-f]{24})", videoController_1.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(middlewares_1.protectOnlyMiddleware).get(videoController_1.getEdit).post(videoController_1.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/remove").all(middlewares_1.protectOnlyMiddleware).post(videoController_1.remove);
exports.default = videoRouter;
