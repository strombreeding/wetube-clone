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
exports.postUpload = exports.getUpload = exports.remove = exports.postEdit = exports.getEdit = exports.watch = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const User_1 = __importDefault(require("../models/User"));
const Comment_1 = __importDefault(require("../models/Comment"));
const watch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Id = req.params.id; // req.parmas.id == string 이기 때문에
    const video = yield Video_1.default.findById(Id).populate("owner").populate("comments");
    let comments = [];
    if (video) {
        for (let i = 0; i < (video === null || video === void 0 ? void 0 : video.comments.length); i++) {
            // Comment에서 video.commet
            const comment = yield Comment_1.default.findById(video.comments[i]).populate("owner");
            comments.push(comment);
        }
    }
    const user = yield User_1.default.findOne({ nickname: req.session.nickname });
    if (!video) { // video===null
        return res.render("404", { pageTitle: "Error" });
    }
    const owner = String((_a = video.owner) === null || _a === void 0 ? void 0 : _a._id);
    let subscribeing = false;
    if (user === null || user === void 0 ? void 0 : user.subscribe) {
        for (let i = 0; i < (user === null || user === void 0 ? void 0 : user.subscribe.length); i++) {
            if (user.subscribe[i] === owner) {
                subscribeing = true;
            }
        }
    }
    return res.render("watch", { pageTitle: video.title, video, comments, subscribeing });
});
exports.watch = watch;
const getEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const thisVideo = yield Video_1.default.findById(Id);
    if (!thisVideo) { //thisVideo === null){
        return res.status(404).render("404", { pageTitle: "Error" });
    }
    // console.log(JSON.stringify(videos[0]._id).replace(/\"/g, ""),typeof(JSON.stringify(videos[0]._id)),Id,typeof(Id),JSON.stringify(videos[0]._id).replace(/\"/g, "")===Id)
    // const videoIndex = videos.findIndex(object => {return JSON.stringify(object._id).replace(/\"/g, "")===Id;})
    // const thisVideo = videos[videoIndex]; 
    return res.render("mediaEdit", { thisVideo: thisVideo, pageTitle: thisVideo.title });
});
exports.getEdit = getEdit;
const postEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const video = yield Video_1.default.findById(Id);
    const { title, description, hashtags } = req.body;
    if (!video) {
        return res.render("404", { pageTitle: "Error", error: "수정하려는 비디오가 없어요" });
    }
    yield Video_1.default.findByIdAndUpdate(Id, {
        title,
        description,
        hashtags: hashtags.replace(/(\s*)/g, "").replace(/\#/g, "").split(",").map((word) => `#${word}`)
    });
    req.flash("edit", "비디오 업데이트");
    return res.redirect(`/videos/${Id}`);
});
exports.postEdit = postEdit;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const video = yield Video_1.default.findById(Id).populate("owner").populate("comments");
    const { deleteTitle } = req.body;
    if (video === null || video === void 0 ? void 0 : video.comments) {
        for (let i = 0; i < (video === null || video === void 0 ? void 0 : video.comments.length); i++) {
            yield Comment_1.default.findByIdAndDelete(video.comments[i]);
        }
    }
    if (deleteTitle !== "삭제" || !video) {
        return res.sendStatus(500).render("404", { error: `잘못된 접근입니다.`, pageTitle: "Error", });
    }
    yield Video_1.default.findByIdAndRemove(Id);
    yield User_1.default.findByIdAndUpdate(video.owner, {
        $pull: { own: String(video._id) }
    });
    if (video.owner) {
        yield User_1.default.updateOne({ _id: video.owner._id }, {
            $pull: { own: video.owner._id },
        });
    }
    return res.redirect("/");
    // const videoIndex = videos.findIndex(object => {return object.id === Id;})
    // const thisVideo = videos[videoIndex];
    // if(req.body.deleteTitle ==='accept'){
    //     videos.splice(videoIndex,1)
    //     return res.redirect("/")
    // }else{
    //     console.log(req.body)
    //     res.redirect('edit')
    // }
});
exports.remove = remove;
const getUpload = (req, res) => {
    return res.render(`upload`);
};
exports.getUpload = getUpload;
const fs_1 = __importDefault(require("fs"));
const postUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, hashtags, description } = req.body;
    console.log(req.file);
    // console.log(JSON.stringify(req.file)+"zz")
    try {
        const video = yield Video_1.default.create({
            fileUrl: (_b = req.file) === null || _b === void 0 ? void 0 : _b.location,
            owner: req.session.uniqueId,
            title,
            description,
            hashtags: hashtags.replace(/(\s*)/g, "").replace(/\#/g, "").split(",").map((word) => `#${word}`)
        });
        yield User_1.default.updateOne({
            nickname: req.session.nickname
        }, {
            $push: {
                own: String(video._id)
            }
        });
        const fsExtra = require("fs-extra");
        const directory = process.cwd() + "/uploads/storage/";
        fs_1.default.unlink("/" + req.session.nickname + ".mp4", (err) => {
            if (err) {
                console.log("완료");
            }
        });
        fsExtra.emptyDirSync(directory);
        return res.redirect(`/user/${req.session.nickname}/userplace`);
    }
    catch (error) {
        console.log(error);
        return res.status(400).render("upload", {
            error: error._message,
        });
    }
    // await newVideo.save()
    // videos.push(videoDiv)       
});
exports.postUpload = postUpload;
