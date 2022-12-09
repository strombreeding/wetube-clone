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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = require("../controllers/apiController");
const middlewares_1 = require("../middlewares");
const Test_1 = __importDefault(require("../models/Test"));
const apiRouter = express_1.default.Router();
apiRouter.route("/comment/edit").post(apiController_1.editComment).delete(apiController_1.deleteComment);
apiRouter.route("/check/email").post(apiController_1.checkEmail);
apiRouter.route("/check/name").post(apiController_1.checkName);
apiRouter.route("/sosial/exit").post(apiController_1.sosialDelete);
apiRouter.route("/video/:id([0-9a-f]{24})/view").post(apiController_1.registerView);
apiRouter.route("/videos/:id/comment").post(apiController_1.addComment);
apiRouter.route("/avatarUrl/save").post(middlewares_1.storageAvatar.single("avatar"), apiController_1.storageAvatarz);
apiRouter.route("/preview/save").post(apiController_1.b, middlewares_1.preVideo.single("video"), apiController_1.a);
// side project test api
const testzz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { a, b, c } = req.query;
    console.log(req.query);
    if (!a || !b) {
        throw new Error("둘중하나는 입력해야지");
    }
    yield Test_1.default.create({
        a,
        b,
        c
    });
    req.flash("error", "완료");
    return res.status(200).redirect("/");
});
const testFind = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page);
    const perPage = 10;
    const total = yield Test_1.default.countDocuments({});
    console.log("다큐먼트 개수 : ", total);
    const posts = yield Test_1.default.find({})
        .sort({ createdAt: -1 }) //정렬
        .skip(perPage * (page - 1)) // 얼만큼 스킵하고 데이터 찾을것인지.(예-1페이지는 10x0 이므로 스킵x)
        .limit(perPage); // 데이터를 얼마나 가져올 것인가
    const totalPage = Math.ceil(total / perPage); // 총 페이지 수
    res.render("404", { errorMsg: posts, pageTitle: totalPage });
});
apiRouter.route("/test").get((0, middlewares_1.requestHandler)(testzz));
apiRouter.get("/z", testFind);
exports.default = apiRouter;
