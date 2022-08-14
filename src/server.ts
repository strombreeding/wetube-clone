import express,{RequestHandler}  from "express";
import morgan from "morgan";
import session from "express-session"
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import { localMiddleware } from "./middlewares";
const app = express();
const logger = morgan("dev");
//view engine setting
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);//morgan()에는 next()가 포함되어있다! 미들웨어로 사용할 함수들은 모두 next()가 있다.
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


//routers
app.use("/" , rootRouter)
app.use("/user",userRouter)
app.use("/videos", videoRouter)

export default app