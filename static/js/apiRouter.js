"use strict";
exports.__esModule = true;
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var middlewares_1 = require("../middlewares");
var apiRouter = express_1["default"].Router();
apiRouter.route("/comment/edit").post(apiController_1.editComment)["delete"](apiController_1.deleteComment);
apiRouter.route("/check/email").post(apiController_1.checkEmail);
apiRouter.route("/check/name").post(apiController_1.checkName);
apiRouter.route("/sosial/exit").post(apiController_1.sosialDelete);
apiRouter.route("/video/:id([0-9a-f]{24})/view").post(apiController_1.registerView);
apiRouter.route("/videos/:id/comment").post(apiController_1.addComment);
apiRouter.route("/avatarUrl/save").post(middlewares_1.storageAvatar.single("avatar"), apiController_1.storageAvatarz);
apiRouter.route("/preview/save").post(apiController_1.b, middlewares_1.preVideo.single("video"), apiController_1.a);
// side project test api
apiRouter.route("/test")
    .get(function (req, res) {
    console.log(req);
    return res.status(200).json({
        Headers: { "Access-Control-Allow-Origin": "*" },
        msg: "GET 으로 잘왔네",
        json: "이것은 제이슨",
        fet: "fetch로는 되는데 ajax는 안되노"
    });
})
    .post(function (req, res) {
    console.log(req);
    return res.status(200).send("post 으로 잘왔네");
})["delete"](function (req, res) {
    console.log(req);
    return res.status(200).send("delete 으로 잘왔네");
})
    .patch(function (req, res) {
    console.log(req);
    return res.status(200).send("patch 으로 잘왔네");
});
exports["default"] = apiRouter;
