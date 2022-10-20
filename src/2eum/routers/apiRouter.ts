import express from "express"
import { GoogleLogin } from "../controllers/apiController"
import google from "../passport-google"
const EeumRouter = express()


EeumRouter.get("/google/start",
    google.authenticate('google',{scope:['email','profile']}),
    (req)=>console.log(req.session))

EeumRouter.get("/auth/google/callback", google.authenticate('google'),GoogleLogin)

export default EeumRouter