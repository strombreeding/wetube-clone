import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import SessionData from "../../models/Session";
import {
  finisKakaoLogin,
  GoogleLogin,
  key,
  startKakaoLogin,
} from "../controllers/apiController";
import google from "../passport-google";
const EeumRouter = express();


const logOut2eum: RequestHandler = async (req, res) => {
  console.log(req.params)
  const { sessionId } = req.params;
  try{
    await SessionData.findByIdAndDelete(sessionId);
    console.log(sessionId,"로그아웃 완료")
    res.status(200).json({
      msg: `로그아웃 완료`,
    });
  }
  catch(e){
    console.log(e)
  }
};
EeumRouter.delete("/:id",logOut2eum);
EeumRouter.get(
  "/google/start",
  google.authenticate("google", { scope: ["email", "profile"] }),
  (req) => console.log(req.session)
);

EeumRouter.get(
  "/auth/google/callback",
  google.authenticate("google"),
  GoogleLogin
);

EeumRouter.get("/kakao/start", startKakaoLogin);
EeumRouter.post("/kakao/finish", finisKakaoLogin);
EeumRouter.get("/kakao", key);

export default EeumRouter;
