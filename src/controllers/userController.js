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
exports.postSubscribe = exports.postIndividualPage = exports.getIndividualPage = exports.logOut = exports.Delete = exports.postEdit = exports.getEdit = exports.updatePw = exports.POSTsosialCreatePw = exports.GETsosialCreatePw = exports.finishGithubLogin = exports.startGithubLogin = exports.finishKakaoLogin = exports.starKakaoLogin = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
// 소셜로그인
const starKakaoLogin = (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize?";
    const config = {
        client_id: process.env.REST_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        response_type: "code",
        scope: "profile_nickname,profile_image,account_email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}${params}`;
    console.log(finalUrl);
    console.log("🔥 스타트 깃허브는 끝냈고, 이제 파이널 url 갈거야");
    return res.redirect(finalUrl);
};
exports.starKakaoLogin = starKakaoLogin;
const finishKakaoLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
        grant_type: "authorization_code",
        client_id: process.env.REST_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        client_secret: process.env.RES_API_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    try {
        const a = yield axios_1.default.post(baseUrl, params, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" },
        });
        console.log(a);
        const access_token = a.data.access_token;
        if (access_token) {
            console.log("🔥 액세스 토큰이 존재함!");
            const apiUrl = "https://kapi.kakao.com/v2/user/me";
            const profile = yield axios_1.default.get(apiUrl, { headers: { "Authorization": `Bearer ${access_token}` } });
            const email = profile.data.kakao_account.email;
            const nickname = profile.data.properties.nickname;
            const avatarUrl = profile.data.properties.profile_image;
            const user = yield User_1.default.findOne({ email });
            if (user) {
                console.log("kakao 로그인 : 해당 이메일로 가입된 사용자가 있음. ");
                req.session.email = email;
                req.session.loggedIn = true;
                req.session.username = user.nickname;
                req.session.nickname = user.nickname;
                req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g, "");
                req.session.sosialOnly = true;
                req.session.avatarUrl = user.avatarUrl;
                req.session.subscriber = user.subscriber;
                console.log("✅ login success by github");
                return res.redirect("/");
            }
            else {
                //깃허브 이메일로 가입된 유저가 없을 겅유
                let nickCheck = yield User_1.default.findOne({ nickname: profile.data.properties.nickname });
                let nickname = profile.data.properties.nickname;
                let num = 0;
                if (nickCheck !== null) {
                    console.log("🔥 `" + nickname + "`는 이미 존재해!");
                    while (nickCheck !== null) {
                        nickCheck = yield User_1.default.findOne({ nickname: nickname + "_" + String(num) });
                        ++num;
                        console.log("🔥 닉네임 중복을 피하는중...");
                    }
                    console.log("🔥 없는 닉네임 찾았다!! ->" + nickname + "_" + String(num));
                    nickname = nickname + "_" + String(num);
                    console.log(nickname);
                }
                const user = yield User_1.default.create({
                    email,
                    avatarUrl,
                    username: nickname,
                    nickname,
                    password1: "123456789",
                    sosialOnly: true,
                    subscriber: 0,
                    subscribe: [],
                });
                req.session.email = user.email;
                console.log("✅ saved kako data in DB. Next step");
                console.log(req.get('referer'));
                res.status(200).redirect("/user/sosial");
            }
        }
        else {
            console.log("X 엑세스토큰이 없음!");
            res.status(404).redirect("login");
        }
    }
    catch (_a) {
        console.log("kako REST API 연결실패!");
        res.status(404).redirect("login");
    }
});
exports.finishKakaoLogin = finishKakaoLogin;
const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log("🔥 스타트 깃허브는 끝냈고, 이제 파이널 url 갈거야");
    return res.redirect(finalUrl);
};
exports.startGithubLogin = startGithubLogin;
const finishGithubLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔥 파이널 url로 진입!");
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    };
    const { data: requestToken } = yield axios_1.default.post(baseUrl, config, {
        headers: { Accept: "application/json" },
    });
    if ("access_token" in requestToken) {
        console.log("🔥 액세스 토큰이 존재함!");
        const { access_token } = requestToken;
        const apiUrl = "https://api.github.com";
        //유저 퍼블릭 정보를 
        const { data: userdata } = yield axios_1.default.get(`${apiUrl}/user`, {
            headers: { Authorization: `token ${access_token}` },
        });
        const { data: emailDataArr } = yield axios_1.default.get(`${apiUrl}/user/emails`, {
            headers: { Authorization: `token ${access_token}` },
        });
        const emailObj = emailDataArr.find((email) => email.primary === true && email.verified === true);
        if (!emailObj) {
            console.log("🔥프라이머리와 베리파이드가 true인 이메일이 깃허브 정보에 존재하지 않음.");
            return res.status(400).redirect("/");
        }
        //아래부턴 깃허브이메일이 웹에서 이미 회원가입된 경우 진행
        const existsUser = yield User_1.default.findOne({ email: emailObj.email });
        if (existsUser) { //깃허브 이메일로 가입된 유저가 있는경우
            req.session.email = existsUser.email;
            req.session.loggedIn = true;
            req.session.username = existsUser.username;
            req.session.nickname = existsUser.nickname;
            req.session.uniqueId = JSON.stringify(existsUser._id).replace(/\"/g, "");
            req.session.sosialOnly = true;
            req.session.avatarUrl = existsUser.avatarUrl;
            req.session.subscriber = existsUser.subscriber;
            console.log("✅ login success by github");
            return res.redirect("/");
        }
        else {
            //깃허브 이메일로 가입된 유저가 없을 겅유
            let nickCheck = yield User_1.default.findOne({ nickname: userdata.login });
            let nickname = userdata.login;
            let num = 0;
            if (nickCheck !== null) {
                console.log("🔥 `" + nickname + "`는 이미 존재해!");
                while (nickCheck !== null) {
                    nickCheck = yield User_1.default.findOne({ nickname: userdata.login + "_" + String(num) });
                    ++num;
                    console.log("🔥 닉네임 중복을 피하는중...");
                }
                console.log("🔥 없는 닉네임 찾았다!! ->" + userdata.login + "_" + String(num));
                nickname = userdata.login + "_" + String(num);
                console.log(nickname);
            }
            console.log(nickname);
            const user = yield User_1.default.create({
                email: emailObj.email,
                avatarUrl: userdata.avatar_url,
                username: userdata.name,
                nickname,
                password1: "123456789",
                sosialOnly: true,
                subscriber: 0,
                subscribe: [],
            });
            req.session.email = user.email;
            console.log("✅ saved github data in DB. Next step");
            res.redirect("/user/sosial");
        }
    }
    else {
        res.redirect("/login");
    }
});
exports.finishGithubLogin = finishGithubLogin;
//소셜로그인 최초이용시, 회원가입을 위한 패스워드 입력 api
const GETsosialCreatePw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render("sosialJoin", { pageTitle: `Join`, userEmail: req.session.email });
});
exports.GETsosialCreatePw = GETsosialCreatePw;
const POSTsosialCreatePw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("비밀번호 변경 및 소셜회원가입 비밀번호 입력");
    const { password1, userEmail } = req.body;
    console.log(req.body);
    const realPw = yield bcrypt_1.default.hash(password1, 10);
    const str = /[a-zA-Z]/g;
    const num = /[0-9]/g;
    const empty = /[\s]/g;
    const specialN = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (str.test(password1) && num.test(password1) && specialN.test(password1) && !empty.test(password1)) {
        console.log("성공적으로 가입!");
        yield User_1.default.updateOne({ email: userEmail }, {
            $set: { password1: realPw },
            $currentDate: { lastModified: true }
        });
        const existsUser = yield User_1.default.findOne({ email: userEmail });
        req.session.email = existsUser === null || existsUser === void 0 ? void 0 : existsUser.email;
        req.session.loggedIn = true;
        req.session.username = existsUser === null || existsUser === void 0 ? void 0 : existsUser.username;
        req.session.nickname = existsUser === null || existsUser === void 0 ? void 0 : existsUser.nickname;
        req.session.uniqueId = existsUser === null || existsUser === void 0 ? void 0 : existsUser.id;
        req.session.sosialOnly = true;
        req.session.avatarUrl = existsUser === null || existsUser === void 0 ? void 0 : existsUser.avatarUrl;
        console.log("✅ login success by github");
        return res.redirect("/");
    }
    else if (!specialN.test(password1)) {
        console.log("특수문자 미포함!");
        yield User_1.default.deleteOne({ email: req.body.userEmail });
        req.session.destroy(() => req.session);
        return res.status(404).render("404", { errorMsg: "❌ 특수문자가 포함되어있지 않습니다." });
    }
    else {
        console.log("else!");
        yield User_1.default.deleteOne({ email: userEmail });
        req.session.destroy(() => req.session);
        console.log("❌ login fail. and delete info from DB");
    }
});
exports.POSTsosialCreatePw = POSTsosialCreatePw;
// 유저 정보 업데이트
//비밀번호 변경 
const updatePw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("비밀번호 변경 ");
    const { oldpw, password1, password2, nickname, userEmail } = req.body;
    console.log(req.body);
    const realPw = yield bcrypt_1.default.hash(password1, 10);
    //userEdit 에서 비밀번호 변경
    const user = yield User_1.default.findOne({ nickname: nickname });
    const str = /[a-zA-Z]/g;
    const num = /[0-9]/g;
    const empty = /[\s]/g;
    const specialN = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    console.log(!str.test(password1) && !num.test(password1) && !specialN.test(password1) && empty.test(password1));
    console.log("비밀번호 변경 시도");
    if (user) {
        const comparePw = yield bcrypt_1.default.compare(oldpw, user === null || user === void 0 ? void 0 : user.password1);
        if (!comparePw) {
            return res.status(400).render("userEdit", { pageTitle: "Edit", errorMsg: "❌ 기존 비밀번호를 확인해주세요." });
        }
    }
    if (password1 === oldpw) {
        return res.status(400).render("userEdit", { pageTitle: "Edit", errorMsg: "❌ 기존 비밀번호를 사용할 수 없습니다." });
    }
    if (str.test(password1) && num.test(password1) && specialN.test(password1) && !empty.test(password1) && password1 === password2) {
        if (password1 === password2) {
            yield User_1.default.updateOne({ nickname: nickname }, {
                $set: { password1: realPw },
                $currentDate: { lastModified: true }
            });
            //리다이렉트로 로그아웃 시켜버릴수도 있음. 다만, 사용자가 
            return res.render("userEdit", { pageTitle: "Edit", errorMsg: "✅ 비밀번호가 성공적으로 변경되었습니다." });
        }
        else {
            return res.status(400).render("userEdit", { pageTitle: "Edit", errorMsg: "❌ 비밀번호가 같지 않습니다." });
        }
    }
    else {
        return res.status(400).render("userEdit", { pageTitle: "Edit", errorMsg: "❌ 특수&문자&숫자와 조합한 8~15자리" });
    }
});
exports.updatePw = updatePw;
// 이미지, 닉네임변경
const getEdit = (req, res) => {
    if (req.params.id === req.session.nickname) {
        return res.render("userEdit", { pageTitle: req.session.username + "'s page" });
    }
    else {
        return res.status(400).send("수상한 녀석이군..  처단하라!!");
    }
};
exports.getEdit = getEdit;
const postEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h;
    const { password1, nickname } = req.body;
    const avatarUrl = req.session.avatarUrl;
    const pageTitle = "Edit";
    const user = yield User_1.default.findOne({ nickname: req.params.id });
    if (req.file) {
        console.log(req.file);
        console.log("이거맞냐", req.file.location);
    }
    if (!user) {
        console.log("입구컷");
        return res.status(400).render("userEdit", { pageTitle });
    }
    //위 이프문을 실행하면 user는 자동적으로 있다는 것!
    try {
        console.log("try");
        const compare = yield bcrypt_1.default.compare(password1, user.password1);
        if (!compare) {
            console.log("비번 잘못 입력");
            return res.status(400).render('userEdit', { pageTitle, errorMsg: "❌ 비밀번호를 확인해주세요." });
        }
        else if (compare) {
            req.session.certification = true;
            return res.redirect(`/user/${user.nickname}/edit-profile`);
        }
    }
    catch (_j) {
        console.log("catch");
        const newNickname = yield User_1.default.exists({ nickname: nickname });
        if (nickname === req.session.nickname) {
            if (avatarUrl !== ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path)) { // 아바타만 바꿀시
                const fsExtra = require("fs-extra");
                const directory = process.cwd() + "/uploads/storage/";
                fs_1.default.unlink("/" + ((_c = req.file) === null || _c === void 0 ? void 0 : _c.path), (err) => {
                    if (err) {
                        console.log("제거 완료");
                    }
                });
                fsExtra.emptyDirSync(directory);
                yield User_1.default.updateOne({ email: user.email }, {
                    $set: { avatarUrl: `${(_d = req.file) === null || _d === void 0 ? void 0 : _d.location}` },
                    $currentDate: { lastModified: true }
                });
                req.session.avatarUrl = `${(_e = req.file) === null || _e === void 0 ? void 0 : _e.location}`;
                return res.redirect(`/user/${nickname}/userPlace`);
            }
            return res.render(`userEdit`, { pageTitle, errorMsg: `✅ "${nickname}"= 기존 닉네임` });
        }
        if (nickname !== req.session.nickname) {
            if (nickname.includes(" ")) {
                return res.status(400).render(`userEdit`, { pageTitle, errorMsg: `❌ "${nickname}"=공백제거` });
            }
            else if (!newNickname && nickname !== "") {
                yield User_1.default.updateOne({ email: user.email }, {
                    $set: { nickname: nickname },
                    $currentDate: { lastModified: true }
                });
                req.session.nickname = nickname;
            }
            else {
                return res.status(400).render(`userEdit`, { pageTitle, errorMsg: `❌ "${nickname}"=중복 닉네임` });
            }
        }
        //다른 에딧 과정을 조건문에 추가 *리턴금지
        const fsExtra = require("fs-extra");
        const directory = process.cwd() + "/uploads/storage/";
        fs_1.default.unlink("/" + ((_f = req.file) === null || _f === void 0 ? void 0 : _f.path), (err) => {
            if (err) {
                console.log("제거 완료");
            }
        });
        fsExtra.emptyDirSync(directory);
        yield User_1.default.updateOne({ email: user.email }, {
            $set: { avatarUrl: `/${(_g = req.file) === null || _g === void 0 ? void 0 : _g.location}` },
            $currentDate: { lastModified: true }
        });
        req.session.avatarUrl = `/${(_h = req.file) === null || _h === void 0 ? void 0 : _h.location}`;
        return res.redirect(`/user/${nickname}/userPlace`);
    }
});
exports.postEdit = postEdit;
// 회원탈퇴
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteUser, deleteAccept } = req.body;
    console.log(req.body);
    if (deleteAccept) { }
});
exports.Delete = Delete;
// 로그아웃
const logOut = (req, res) => {
    req.session.destroy(() => req.session);
    console.log(req.url);
    return res.json({ ref: true });
};
exports.logOut = logOut;
//마이페이지 겟요청
const getIndividualPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nickname = req.params.id; // 호스트의 닉네임
    const hostinfo = yield User_1.default.findOne({ nickname }); //호스트 찾음
    const myInfo = yield User_1.default.findOne({ nickname: req.session.nickname }); //로그인된 사람
    const videos = yield Video_1.default.find({ owner: String(hostinfo === null || hostinfo === void 0 ? void 0 : hostinfo._id) }).populate("owner"); // 호스트의 비디오 목록
    let subscribeing = false;
    console.log(myInfo === null || myInfo === void 0 ? void 0 : myInfo.subscribe);
    console.log(myInfo === null || myInfo === void 0 ? void 0 : myInfo.subscribe[0]);
    console.log(String(hostinfo === null || hostinfo === void 0 ? void 0 : hostinfo._id));
    console.log(hostinfo === null || hostinfo === void 0 ? void 0 : hostinfo._id);
    if (myInfo === null || myInfo === void 0 ? void 0 : myInfo.subscribe) {
        for (let i = 0; i < (myInfo === null || myInfo === void 0 ? void 0 : myInfo.subscribe.length); i++) {
            console.log(i + "번째 반복중");
            if (myInfo.subscribe[i] === String(hostinfo === null || hostinfo === void 0 ? void 0 : hostinfo._id)) {
                console.log("구독중!");
                subscribeing = true;
                break;
            }
        }
    }
    if (hostinfo && req.session.nickname === req.params.id) {
        return res.render("userPlace", { pageTitle: nickname, host: true, hostinfo, videos, subscribeing });
    }
    else if (hostinfo) {
        return res.render("userPlace", { pageTitle: nickname, hostinfo, videos, subscribeing });
    }
    else {
        return res.status(404).send("연결 실패");
    }
});
exports.getIndividualPage = getIndividualPage;
const postIndividualPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.postIndividualPage = postIndividualPage;
const postSubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, userNickname, subscribeing } = req.body;
    console.log(req.body, "zzz");
    const host = yield User_1.default.findOne({ nickname });
    const subscriber = yield User_1.default.findOne({ nickname: userNickname });
    if (subscribeing) {
        yield User_1.default.updateOne({ nickname: userNickname }, {
            $pull: { subscribe: host === null || host === void 0 ? void 0 : host._id },
        });
        yield User_1.default.updateOne({ nickname }, {
            $inc: { subscriber: -1 },
        });
    }
    else {
        yield User_1.default.updateOne({ nickname }, {
            $inc: { subscriber: 1 },
        });
        yield User_1.default.updateOne({ nickname: userNickname }, {
            $push: { subscribe: host === null || host === void 0 ? void 0 : host._id },
        });
    }
    return res.json({ subscriber });
    // // 유저의 구독관련 초기화 코드
    // await User.updateOne(
    //     {nickname : userNickname},
    //     {
    //         $set:{subscribe:[]},
    // })
    // await User.updateOne(
    //     {nickname},
    //     {
    //         $set:{subscriber:0},
    // })
});
exports.postSubscribe = postSubscribe;
