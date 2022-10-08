"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const middlewares_1 = require("../middlewares");
const apiRouter = express_1.default.Router();
apiRouter.route("/comment/edit").post(apiController_1.editComment).delete(apiController_1.deleteComment);
apiRouter.route("/check/email").post(apiController_1.checkEmail);
apiRouter.route("/check/name").post(apiController_1.checkName);
apiRouter.route("/sosial/exit").post(apiController_1.sosialDelete);
apiRouter.route("/video/:id([0-9a-f]{24})/view").post(apiController_1.registerView);
apiRouter.route("/videos/:id/comment").post(apiController_1.addComment);
apiRouter.route("/avatarUrl/save").post(middlewares_1.storageAvatar.single("avatar"), apiController_1.storageAvatarz);
apiRouter.route("/preview/save").post(apiController_1.b, middlewares_1.preVideo.single("video"), apiController_1.a);
exports.default = apiRouter;
