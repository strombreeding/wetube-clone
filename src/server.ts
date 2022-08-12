import express  from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"

const PORT = 4000;
const app = express();
const logger = morgan("dev")
app.use(logger);

//handle function








app.use("/" , globalRouter)
app.use("/user",userRouter)
app.use("/videos", videoRouter)

app.listen(4000 , () => console.log(`✅ Server listening on port ${PORT} 🛸`))