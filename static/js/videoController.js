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
exports.__esModule = true;
exports.postUpload = exports.getUpload = exports.remove = exports.postEdit = exports.getEdit = exports.watch = void 0;
var Video_1 = require("../models/Video");
var User_1 = require("../models/User");
var Comment_1 = require("../models/Comment");
var middlewares_1 = require("../middlewares");
exports.watch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, video, comments, i, comment, user, owner, subscribeing, i;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Id = req.params.id // req.parmas.id == string 이기 때문에
                ;
                return [4 /*yield*/, Video_1["default"].findById(Id).populate("owner").populate("comments")];
            case 1:
                video = _b.sent();
                comments = [];
                console.log(req.session);
                if (!video) return [3 /*break*/, 5];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < (video === null || video === void 0 ? void 0 : video.comments.length))) return [3 /*break*/, 5];
                return [4 /*yield*/, Comment_1["default"].findById(video.comments[i]).populate("owner")];
            case 3:
                comment = _b.sent();
                comments.push(comment);
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, User_1["default"].findOne({ nickname: req.session.nickname })];
            case 6:
                user = _b.sent();
                if (!video) { // video===null
                    return [2 /*return*/, res.render("404", { pageTitle: "Error" })];
                }
                owner = String((_a = video.owner) === null || _a === void 0 ? void 0 : _a._id);
                subscribeing = false;
                if (user === null || user === void 0 ? void 0 : user.subscribe) {
                    for (i = 0; i < (user === null || user === void 0 ? void 0 : user.subscribe.length); i++) {
                        if (user.subscribe[i] === owner) {
                            subscribeing = true;
                        }
                    }
                }
                return [2 /*return*/, res.render("watch", { pageTitle: video.title, video: video, comments: comments, subscribeing: subscribeing })];
        }
    });
}); };
exports.getEdit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, thisVideo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.id;
                return [4 /*yield*/, Video_1["default"].findById(Id)];
            case 1:
                thisVideo = _a.sent();
                if (!thisVideo) { //thisVideo === null){
                    return [2 /*return*/, res.status(404).render("404", { pageTitle: "Error" })];
                }
                // console.log(JSON.stringify(videos[0]._id).replace(/\"/g, ""),typeof(JSON.stringify(videos[0]._id)),Id,typeof(Id),JSON.stringify(videos[0]._id).replace(/\"/g, "")===Id)
                // const videoIndex = videos.findIndex(object => {return JSON.stringify(object._id).replace(/\"/g, "")===Id;})
                // const thisVideo = videos[videoIndex]; 
                return [2 /*return*/, res.render("mediaEdit", { thisVideo: thisVideo, pageTitle: thisVideo.title })];
        }
    });
}); };
exports.postEdit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, video, _a, title, description, hashtags;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Id = req.params.id;
                return [4 /*yield*/, Video_1["default"].findById(Id)];
            case 1:
                video = _b.sent();
                _a = req.body, title = _a.title, description = _a.description, hashtags = _a.hashtags;
                if (!video) {
                    return [2 /*return*/, res.render("404", { pageTitle: "Error", error: "수정하려는 비디오가 없어요" })];
                }
                return [4 /*yield*/, Video_1["default"].findByIdAndUpdate(Id, {
                        title: title,
                        description: description,
                        hashtags: hashtags.replace(/(\s*)/g, "").replace(/\#/g, "").split(",").map(function (word) { return "#" + word; })
                    })];
            case 2:
                _b.sent();
                req.flash("edit", "비디오 업데이트");
                return [2 /*return*/, res.redirect("/videos/" + Id)];
        }
    });
}); };
exports.remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, video, _a, deleteTitle, createdAt, i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Id = req.params.id;
                return [4 /*yield*/, Video_1["default"].findById(Id).populate("owner").populate("comments")];
            case 1:
                video = _b.sent();
                _a = req.body, deleteTitle = _a.deleteTitle, createdAt = _a.createdAt;
                if (!(video === null || video === void 0 ? void 0 : video.comments)) return [3 /*break*/, 5];
                i = 0;
                _b.label = 2;
            case 2:
                if (!(i < (video === null || video === void 0 ? void 0 : video.comments.length))) return [3 /*break*/, 5];
                return [4 /*yield*/, Comment_1["default"].findByIdAndDelete(video.comments[i])];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                if (deleteTitle !== "삭제" || !video) {
                    return [2 /*return*/, res.sendStatus(500).render("404", { error: "\uC798\uBABB\uB41C \uC811\uADFC\uC785\uB2C8\uB2E4.", pageTitle: "Error" })];
                }
                return [4 /*yield*/, Video_1["default"].findByIdAndRemove(Id)];
            case 6:
                _b.sent();
                return [4 /*yield*/, User_1["default"].findByIdAndUpdate(video.owner, {
                        $pull: { own: String(video._id) }
                    })];
            case 7:
                _b.sent();
                if (!video.owner) return [3 /*break*/, 9];
                return [4 /*yield*/, User_1["default"].updateOne({ _id: video.owner._id }, {
                        $pull: { own: video.owner._id }
                    })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                // s3 에서 비디오파일 삭제
                console.log("" + req.session.email + createdAt + ".mp4");
                try {
                    middlewares_1.s3.deleteObject({
                        Bucket: "wetube-jinytree/video",
                        Key: "" + req.session.email + createdAt + ".mp4"
                    }, function (err, data) {
                        if (err) {
                            throw err;
                        }
                        console.log('s3 deleteObject ', data);
                    });
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/, res.redirect("/")];
        }
    });
}); };
exports.getUpload = function (req, res) {
    return res.render("upload");
};
var fs_1 = require("fs");
exports.postUpload = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, hashtags, description, video, fsExtra, directory, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, hashtags = _a.hashtags, description = _a.description;
                console.log(req.file);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Video_1["default"].create({
                        fileUrl: (_b = req.file) === null || _b === void 0 ? void 0 : _b.location,
                        owner: req.session.uniqueId,
                        title: title,
                        s3Id: req.session.random,
                        description: description,
                        hashtags: hashtags.replace(/(\s*)/g, "").replace(/\#/g, "").split(",").map(function (word) { return "#" + word; })
                    })];
            case 2:
                video = _c.sent();
                return [4 /*yield*/, User_1["default"].updateOne({
                        nickname: req.session.nickname
                    }, {
                        $push: {
                            own: String(video._id)
                        }
                    })];
            case 3:
                _c.sent();
                fsExtra = require("fs-extra");
                directory = process.cwd() + "/uploads/storage/";
                fs_1["default"].unlink("/" + req.session.nickname + ".mp4", function (err) {
                    if (err) {
                        console.log("완료");
                    }
                });
                fsExtra.emptyDirSync(directory);
                return [2 /*return*/, res.redirect("/user/" + req.session.nickname + "/userplace")];
            case 4:
                error_1 = _c.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(400).render("upload", {
                        error: error_1._message
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
