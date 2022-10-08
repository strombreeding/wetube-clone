"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const middlewares_1 = require("../middlewares");
const userRouter = express_1.default.Router();
userRouter.post("/subscribe", userController_1.postSubscribe);
// 소셜로그인
userRouter.get("/github/start", userController_1.startGithubLogin);
userRouter.get("/github/finish", userController_1.finishGithubLogin);
userRouter.get("/kakao/login", userController_1.starKakaoLogin);
userRouter.get("/kakao/oauth", userController_1.finishKakaoLogin);
// userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/logout", userController_1.logOut);
userRouter.route("/sosial").all(middlewares_1.protectOnlyMiddleware).get(userController_1.GETsosialCreatePw).post(userController_1.POSTsosialCreatePw);
// params 
userRouter.post("/:id/delete", userController_1.Delete);
userRouter.route("/:id/userPlace").get(userController_1.getIndividualPage).post(userController_1.postIndividualPage);
userRouter.route("/:id/edit-profile").all(middlewares_1.protectOnlyMiddleware).get(userController_1.getEdit).post(middlewares_1.uploadAvatar.single("avatar"), userController_1.postEdit);
userRouter.route("/:id/edit-pw").all(middlewares_1.protectOnlyMiddleware).post(userController_1.updatePw);
exports.default = userRouter;
