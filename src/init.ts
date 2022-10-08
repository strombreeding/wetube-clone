import "dotenv/config"
import "./db"
import apiRouter from "./routers/apiRouter"
import app from "./server"
import User from "./models/User"
import Video from "./models/Video"
import Comment from "./models/Comment"

app.use("/", apiRouter)

const PORT = 4000;
app.listen(PORT , () => console.log(`✅ Server listening on port ${PORT} 🛸`))