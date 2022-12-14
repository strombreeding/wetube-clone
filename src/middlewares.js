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
exports.preVideo = exports.uploadVideo = exports.storageAvatar = exports.uploadAvatar = exports.s3 = exports.requestHandler = exports.errorHandler = exports.protectOnlyMiddleware = exports.publicOnlyMiddleware = exports.localMiddleware = exports.accessOrigin = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const accessOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인에 서버 호출가능
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};
exports.accessOrigin = accessOrigin;
const localMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.username = req.session.username;
    res.locals.nickname = req.session.nickname;
    res.locals.uniqueId = req.session.uniqueId;
    res.locals.email = req.session.email;
    res.locals.certification = Boolean(req.session.certification);
    res.locals.avatarUrl = req.session.avatarUrl;
    res.locals.subscribe = req.session.subscribe;
    res.locals.subscriber = req.session.subscriber;
    console.log(res.locals.avatarUrl);
    next();
});
exports.localMiddleware = localMiddleware;
const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }
    else {
        req.flash("error", "Not autorize");
        return res.redirect("/");
    }
};
exports.publicOnlyMiddleware = publicOnlyMiddleware;
const protectOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    else if (req.session.email) {
        return next();
    }
    else {
        req.flash("error", "로그인이 필요해요");
        console.log(res.locals.messages);
        return res.redirect("/");
    }
};
exports.protectOnlyMiddleware = protectOnlyMiddleware;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).render("404", { errorMsg: err });
};
exports.errorHandler = errorHandler;
const requestHandler = (asyncFunction) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield asyncFunction(req, res);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.requestHandler = requestHandler;
// file upload 
exports.s3 = new aws_sdk_1.default.S3({
    credentials: {
        accessKeyId: `${process.env.S3_KEY}`,
        secretAccessKey: `${process.env.S3_SECRET}`
    }
});
const s3ImageUploader = (0, multer_s3_1.default)({
    s3: exports.s3,
    bucket: `wetube-jinytree/image`,
    acl: 'public-read',
    key: (req, file, cb) => createFileName(req, file, cb)
});
const s3VideoUploader = (0, multer_s3_1.default)({
    s3: exports.s3,
    bucket: `wetube-jinytree/video`,
    acl: 'public-read',
    key: (req, file, cb) => createFileName(req, file, cb)
});
const createFileName = (req, file, cb) => {
    let mimeType;
    if (file.mimetype.includes("video")) {
        switch (file.mimetype) {
            case "video/mp4":
                mimeType = "mp4";
                break;
            case "video/avi":
                mimeType = "avi";
                break;
            case "video/mov":
                mimeType = "mov";
                break;
            case "video/wmv":
                mimeType = "wmv";
                break;
            default:
                mimeType = "mp4";
                break;
        }
    }
    else if (file.mimetype.includes("image")) {
        switch (file.mimetype) {
            case "image/png":
                mimeType = "png";
                break;
            case "image/jpeg":
                mimeType = "jpeg";
                break;
            default:
                mimeType = "png";
                break;
        }
    }
    cb(null, req.session.email + `${req.session.random}` + "." + mimeType);
};
exports.uploadAvatar = (0, multer_1.default)({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
    storage: s3ImageUploader,
});
exports.storageAvatar = (0, multer_1.default)({
    dest: "uploads/storage/",
    limits: {
        fileSize: 3000000,
    },
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos/");
    },
    filename: (req, file, cb) => {
        let mimeType;
        switch (file.mimetype) {
            case "video/mp4":
                mimeType = "mp4";
                break;
            case "video/avi":
                mimeType = "png";
                break;
            case "video/mov":
                mimeType = "mov";
                break;
            case "video/wmv":
                mimeType = "wmv";
                break;
            default:
                mimeType = "mp4";
                break;
        }
        cb(null, req.session.uniqueId + "_" + Date.now() + "." + mimeType);
    },
});
const storage2 = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/storage/");
    },
    filename: (req, file, cb) => {
        let mimeType;
        switch (file.mimetype) {
            case "video/mp4":
                mimeType = "mp4";
                break;
            case "video/avi":
                mimeType = "png";
                break;
            case "video/mov":
                mimeType = "mov";
                break;
            case "video/wmv":
                mimeType = "wmv";
                break;
            default:
                mimeType = "mp4";
                break;
        }
        cb(null, Math.random() + "." + mimeType);
    },
});
exports.uploadVideo = (0, multer_1.default)({
    storage: s3VideoUploader,
    limits: {
        fileSize: 30000000,
    }
});
exports.preVideo = (0, multer_1.default)({
    storage: storage2
});
