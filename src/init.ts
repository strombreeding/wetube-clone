import "dotenv/config"
import "./db"
import apiRouter from "./routers/apiRouter"
import app from "./server"


app.use("/", apiRouter)

const PORT = 4000;
app.listen(PORT , () => console.log(`✅ Server listening on port ${PORT} 🛸`))