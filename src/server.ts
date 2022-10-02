import express,{RequestHandler}  from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import apiRouter from "./routers/apiRouter";
import { localMiddleware } from "./middlewares";


// express 서버와 로그생성을 도와주는 패키지 만들기
const app = express();
const logger = morgan("dev");
app.use(logger);//morgan()에는 next()가 포함되어있다! 미들웨어로 사용할 함수들은 모두 next()가 있다.
// app.all('*', (req, res, next) =>
// {
//     let protocol = req.headers['x-forwarded-proto'] || req.protocol;

//     if (protocol == 'https')
//     {
//         next();
//     }
//     else
//     {
//         let from = `${protocol}://${req.hostname}${req.url}`;
//         let to = `https://${req.hostname}${req.url}`;

//         // log and redirect
//         console.log(`[${req.method}]: ${from} -> ${to}`);
//         res.redirect(to);
//     }
// });

//view engine setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600*1000,//3600초(1시간)동안 쿠키유효
    },
    store:MongoStore.create({mongoUrl:process.env.DB_URL})
  })
  ); 
  app.use(localMiddleware)



// 라우터
app.use("/images",express.static("images"))
app.use("/uploads",express.static("uploads"))
app.use("/assets",express.static("assets"))
app.use("/" , rootRouter)
app.use("/user",userRouter)
app.use("/videos", videoRouter)
app.use("/api", apiRouter)

export default app