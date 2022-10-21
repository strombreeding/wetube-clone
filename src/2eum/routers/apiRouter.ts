import express from "express"
import { finisKakaoLogin, GoogleLogin, key, startKakaoLogin } from "../controllers/apiController"
import google from "../passport-google"
const EeumRouter = express()


EeumRouter.get("/google/start",
    google.authenticate('google',{scope:['email','profile']}),
    (req)=>console.log(req.session))

EeumRouter.get("/auth/google/callback", google.authenticate('google'),GoogleLogin)
EeumRouter.get("/kakao/start", startKakaoLogin)
EeumRouter.post("/kakao/finish", finisKakaoLogin)
EeumRouter.get("/kakao", key)

export default EeumRouter