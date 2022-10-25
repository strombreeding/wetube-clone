import MongoStore from "connect-mongo";
import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import SessionData from "../../models/Session";
import {
  createRefreshToken,
  createAccessToken,
  finisKakaoLogin,
  GoogleLogin,
  key,
  startKakaoLogin,
} from "../controllers/apiController";
import google from "../passport-google";
import {db} from "../../db"

const EeumRouter = express();

const logOut2eum: RequestHandler = async (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  try{
    const refresh_token = await createRefreshToken(id)
    const access_token = await createAccessToken(id)

    // await SessionData.create({})
    // const a =  await SessionData.find();
    // console.log(a)
    // console.log("로그아웃 완료")
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
