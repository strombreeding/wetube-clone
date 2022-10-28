import express,{RequestHandler,Request,Response,NextFunction,ErrorRequestHandler}  from "express";
import morgan from "morgan";
import session, { Session } from "express-session"
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import EeumRouter from "./2eum/routers/apiRouter"
import apiRouter from "./routers/apiRouter";
import { 
  localMiddleware,
  accessOrigin,
  errorHandler,
  requestHandler
 } from "./middlewares";


// express 서버와 로그생성을 도와주는 패키지 만들기
const app = express();
const logger = morgan("dev");
// app.use(logger);//morgan()에는 next()가 포함되어있다! 미들웨어로 사용할 함수들은 모두 next()가 있다.
// app.use(accessOrigin)

//view engine setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// 미들웨어
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())


app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600*1000,//3600초(1시간)동안 쿠키유효
    },
    store:MongoStore.create({mongoUrl:process.env.DB_URL}),
  })
  ); 
app.use(localMiddleware)
// const nowLoginUsers:RequestHandler =async (req,res,next) => {
//     const a = await SessionData.find({});
//     let nowLogin = 0;
//     for (let i = 0; i < a.length; i++) {
//       if(a[i]){
//         const b = a[i].session?.includes(`"loggedIn":true`)
//         if(b){
//           await SessionData.deleteOne(a[i])
//           nowLogin+=1
//         }
//       }
        
//     }
//     console.log(nowLogin)
//     next()
// }
// app.use(nowLoginUsers)
// 라우터

app.use(accessOrigin)



app.use(flash())
app.use("/images",express.static("images"))
app.use("/uploads",express.static("uploads"))
app.use("/assets",express.static("assets"))
app.use("/" , rootRouter)
app.use("/user",userRouter)
app.use("/videos", videoRouter)
app.use("/api", apiRouter)
app.use("/2eum", EeumRouter)
app.use(errorHandler)

export default app