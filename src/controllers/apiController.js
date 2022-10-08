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
exports.deleteComment = exports.editComment = exports.addComment = exports.storageAvatarz = exports.registerView = exports.sosialDelete = exports.a = exports.b = exports.checkName = exports.checkEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const Video_1 = __importDefault(require("../models/Video"));
const Comment_1 = __importDefault(require("../models/Comment"));
// join 
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    console.log("체크이메일");
    const user = yield User_1.default.exists({ email: email });
    if (user) {
        console.log("user = true");
        const errorMsg = "❌ 이미 존재하는 이메일입니다.";
        return res.json({ boolean: user, user: email, errorMsg });
    }
    else if (!user && !email.includes("@")) {
        console.log("user = fasle");
        const errorMsg = "❌ 유효하지 않은 이메일 형식입니다.";
        return res.json({ boolean: user, user: email, errorMsg });
    }
    else {
        console.log("user = fasle");
        const errorMsg = "✅ 이 이메일은 사용 가능합니다.";
        return res.json({ boolean: user, user: email, errorMsg });
    }
});
exports.checkEmail = checkEmail;
const checkName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("체크닉네임");
    const { nickname } = req.body;
    const username = yield User_1.default.exists({ nickname });
    const sameNick = yield User_1.default.findOne({ nickname });
    console.log(sameNick);
    console.log(username);
    if (req.session.nickname === nickname) {
        return res.json({ errorMsg: "기존의 닉네임입니다." });
    }
    else if (username) {
        console.log("username = true");
        const errorMsg = "❌ 이미 존재하는 닉네임입니다.";
        return res.json({ boolean: username, user: nickname, errorMsg });
    }
    else if (!username) {
        console.log("username = false");
        const errorMsg = "✅ 사용이 가능한 닉네임입니다.";
        return res.json({ boolean: username, user: nickname, errorMsg });
    }
});
exports.checkName = checkName;
const b = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fsExtra = require("fs-extra");
    const directory = process.cwd() + "/uploads/storage/";
    try {
        yield fsExtra.emptyDirSync(directory);
        console.log(directory);
        console.log("완료");
    }
    catch (err) {
        console.log(err);
    }
    next();
});
exports.b = b;
const a = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    res.status(200).json({ path: filePath });
});
exports.a = a;
const sosialDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.email);
    console.log("target email : " + req.body.email);
    yield User_1.default.deleteOne({ email: req.body.email });
    req.session.destroy(() => req.session);
    console.log("❌ login fail. and delete info from DB");
    return res.status(404).redirect("/login");
});
exports.sosialDelete = sosialDelete;
// 조회수 증가
const registerView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const video = yield Video_1.default.findById(id);
    console.log(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.views = Number(video.views) + 1;
    video.save();
    res.sendStatus(200);
});
exports.registerView = registerView;
const storageAvatarz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log(req.file);
    return res.json({ path: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path });
});
exports.storageAvatarz = storageAvatarz;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { session: { nickname, uniqueId, avatarUrl }, body: { text }, params: { id } } = req;
    const comment = yield Comment_1.default.create({
        text,
        owner: uniqueId,
        video: id,
    });
    console.log(comment.createdAt);
    yield Video_1.default.updateOne({
        _id: id,
    }, {
        $push: {
            comments: comment._id
        }
    });
    req.flash("error", "댓글을 달았어요!");
    return res.status(201).json({ uniqueId, text, nickname, avatarUrl, createdAt: comment.createdAt, commentId: comment._id });
});
exports.addComment = addComment;
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, edit } = req.body;
    try {
        yield Comment_1.default.findByIdAndUpdate(id, {
            text: edit,
        });
        console.log("수정완료");
        req.flash("error", "댓글수정 완료.");
        return res.sendStatus(200);
    }
    catch (error) {
        req.flash("error", "해당 댓글을 찾을 수 없습니다.");
        return res.status(404);
    }
});
exports.editComment = editComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield Comment_1.default.findByIdAndDelete(id);
        console.log("삭제완료");
        req.flash("error", "댓글삭제 완료.");
        return res.sendStatus(200);
    }
    catch (error) {
        req.flash("error", "해당 댓글을 찾을 수 없습니다.");
        return res.sendStatus(404);
    }
});
exports.deleteComment = deleteComment;
