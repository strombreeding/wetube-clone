import express from "express";
import {finishKakaoLogin,starKakaoLogin,postSubscribe,updatePw,logOut,Delete,startGithubLogin,finishGithubLogin,GETsosialCreatePw,POSTsosialCreatePw,getEdit,postEdit, getIndividualPage,postIndividualPage, finishGoogleLogin} from "../controllers/userController"
import { protectOnlyMiddleware, uploadAvatar } from "../middlewares";
import a from "../passport";
import passport from "passport"


const userRouter = express.Router();

userRouter.post("/subscribe",postSubscribe)

// 소셜로그인 a.authenticate('google',{scope:['profile']})
userRouter.get("/google/start", (req,res,next)=>{console.log("접속완료");next()},a.authenticate('google',{scope:['email','profile']}))
userRouter.get("/auth/google/callback", a.authenticate('google',{failureRedirect: "/"}),finishGoogleLogin)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/kakao/login",starKakaoLogin)
userRouter.get("/kakao/oauth",finishKakaoLogin)

// userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/logout",logOut)
userRouter.route("/sosial").all(protectOnlyMiddleware).get(GETsosialCreatePw).post(POSTsosialCreatePw)

// params 
userRouter.post("/:id/delete",Delete)
userRouter.route("/:id/userPlace").get(getIndividualPage).post(postIndividualPage)
userRouter.route("/:id/edit-profile").all(protectOnlyMiddleware).get(getEdit).post(uploadAvatar.single("avatar"),postEdit)
userRouter.route("/:id/edit-pw").all(protectOnlyMiddleware).post(updatePw)



export default userRouter
