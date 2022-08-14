import "dotenv/config"
import "./db"
import app from "./server"



const PORT = 4000;
app.listen(4000 , () => console.log(`✅ Server listening on port ${PORT} 🛸`))