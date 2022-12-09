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
exports.serch = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = exports.Home = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Video_1 = __importDefault(require("../models/Video"));
const User_1 = __importDefault(require("../models/User"));
const Home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield Video_1.default.find({}).sort({ createdAt: -1 }).populate("owner");
    return res.render("home", { pageTitle: "Home", videos: videos, });
});
exports.Home = Home;
const getJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render("join", { pageTitle: "Join" });
});
exports.getJoin = getJoin;
const postJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, username, password1, password2, } = req.body;
    const existsEmail = yield User_1.default.exists({ email });
    const existsName = yield User_1.default.exists({ nickname });
    const nameSpace = email.includes(" ");
    const emailSpace = nickname.includes(" ");
    if (nameSpace) {
        return res.status(400).render("join", { pageTitle: "Join", errorMsg: "❌  닉네임에 공백을 사용할 수 없습니다.", });
    }
    if (emailSpace) {
        return res.status(400).render("join", { pageTitle: "Join", errorMsg: "❌  닉네임에 공백을 사용할 수 없습니다.", });
    }
    if (password1 !== password2) {
        return res.status(400).render("join", { pageTitle: "Join", errorMsg: "❌  비밀번호가 동일하지 않습니다.", });
    }
    if (existsEmail) {
        return res.status(400).render("join", { pageTitle: "Join", errorMsg: "❌  이미 가입된 이메일입니다. 소셜로그인을 해보세요!" });
    }
    if (existsName) {
        return res.status(400).render("join", { pageTitle: "Join", errorMsg: "❌  중복된 닉네임입니다." });
    }
    try {
        yield User_1.default.create({
            email,
            avatarUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa3feb67-0971-4269-aaaa-c65f02f58bed%2FUntitled.png?table=block&id=cb62347a-1d99-45e9-a5ac-55109896ae3d&spaceId=beaa8bbc-f504-4c20-b220-9fc699f70e12&width=2000&userId=14cc2ef3-04b9-41f7-9991-3bf06bfcb033&cache=v2",
            nickname,
            username,
            password1: password1,
            subscriber: 0,
            subscribe: [],
        });
        console.log("pw를 사용한 회원가입 완료");
        console.log(yield User_1.default.find({ email }));
        return res.render("login", { pageTitle: "Login", });
    }
    catch (error) {
        console.log(error);
        return res.status(400).render("join", {
            error: error._message,
        });
    }
});
exports.postJoin = postJoin;
const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login", });
};
exports.getLogin = getLogin;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password1 } = req.body;
    const pageTitle = "Login";
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).render('login', { pageTitle, errorMsg: "이메일이 유효하지 않습니다." });
    }
    const ok = yield bcrypt_1.default.compare(password1, user.password1); // bcrypt의 라이브러리, compare(해시할것, 이미 해시화된것)
    if (!ok) {
        console.log("비번 잘못 입력");
        return res.status(400).render('login', { pageTitle, errorMsg: "비밀번호를 확인해주세요." });
    }
    req.session.email = email;
    req.session.loggedIn = true;
    req.session.username = user.username;
    req.session.nickname = user.nickname;
    req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g, "");
    req.session.avatarUrl = user.avatarUrl;
    // req.session.subscribe = user.subscribe
    req.session.subscriber = user.subscriber;
    console.log(`✅ login seccess! welcome ${user.username}`);
    return res.redirect("back");
});
exports.postLogin = postLogin;
const serch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchWord } = req.query;
    console.log(searchWord);
    if (searchWord) {
        const users = yield User_1.default.find({ nickname: { $regex: new RegExp(`${searchWord}`, "i") } });
        const videos = yield Video_1.default.find({ $or: [{
                    title: { $regex: new RegExp(`${searchWord}`, "i") }
                },
                {
                    description: { $regex: new RegExp(`${searchWord}`, "i") }
                },
                {
                    hashtags: { $regex: new RegExp(`${searchWord}`, "i") }
                },]
        }).populate("owner");
        console.log(videos);
        if (videos) {
            console.log("해당비디오 찾음");
        }
        if (users) {
            const user = yield User_1.default.find({ nickname: { $regex: new RegExp(`${searchWord}`, "i") } });
            console.log("채널찾기");
            let videos = [];
            for (let i = 0; i < user.length; i++) {
                for (let r = 0; r < user[i].own.length; r++) {
                    videos.push(yield Video_1.default.findOne({ _id: user[i].own[r] }).populate("owner"));
                }
            }
            return res.render("serch", { pageTitle: searchWord, searchWord, videos, users });
        }
        console.log('찾을수가없네');
        return res.render("serch", { pageTitle: searchWord, searchWord, videos });
    }
    else {
        return res.render("serch", { pageTitle: searchWord, searchWord, videos: [] });
    }
});
exports.serch = serch;
