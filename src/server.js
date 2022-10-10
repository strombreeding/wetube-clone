"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const rootRouter_1 = __importDefault(require("./routers/rootRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const videoRouter_1 = __importDefault(require("./routers/videoRouter"));
const apiRouter_1 = __importDefault(require("./routers/apiRouter"));
const middlewares_1 = require("./middlewares");
// express 서버와 로그생성을 도와주는 패키지 만들기
const app = (0, express_1.default)();
const logger = (0, morgan_1.default)("dev");
app.use(logger); //morgan()에는 next()가 포함되어있다! 미들웨어로 사용할 함수들은 모두 next()가 있다.
//view engine setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// 미들웨어
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.json())
app.use((0, express_session_1.default)({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600 * 1000, //3600초(1시간)동안 쿠키유효
    },
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
app.use(middlewares_1.localMiddleware);
// 라우터
app.use((0, express_flash_1.default)());
app.use("/images", express_1.default.static("images"));
app.use("/uploads", express_1.default.static("uploads"));
app.use("/assets", express_1.default.static("assets"));
app.use("/", rootRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/videos", videoRouter_1.default);
app.use("/api", apiRouter_1.default);
exports.default = app;
