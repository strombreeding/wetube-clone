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
        msg: "GET 으로 잘왔네",
        data: "이것은 제이슨"
    });
})
    .post(function (req, res) {
    console.log(req.body);
    var a = req.body;
    return res.status(200).json({
        msg: "post 으로 잘왔네",
        data: a
    });
})["delete"](function (req, res) {
    console.log(req.body);
    return res.status(200).json({
        msg: "delete 으로 잘왔네",
        data: apiController_1.a
    });
})
    .patch(function (req, res) {
    console.log(req.body);
    return res.status(200).json({
        msg: "patch 으로 잘왔네",
        data: apiController_1.a
    });
});
exports["default"] = apiRouter;
