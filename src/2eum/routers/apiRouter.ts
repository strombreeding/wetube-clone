import express from "express"
import { GoogleLogin, startKakaoLogin } from "../controllers/apiController"
import google from "../passport-google"
const EeumRouter = express()


EeumRouter.get("/google/start",
    google.authenticate('google',{scope:['email','profile']}),
    (req)=>console.log(req.session))

EeumRouter.get("/auth/google/callback", google.authenticate('google'),GoogleLogin)
EeumRouter.get("/kakao/start", startKakaoLogin)
EeumRouter.get("/kakao/finish", startKakaoLogin)

export default EeumRouter