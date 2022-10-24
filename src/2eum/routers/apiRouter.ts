import express, { RequestHandler } from "express";
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
  console.log("로그아웃 들어옴")
  const { sessionId } = req.body;
  await SessionData.findByIdAndDelete({ _id: sessionId });
  console.log("로그아웃 완료")
  res.status(200).json({
    msg: "로그아웃 완료",
  });
};
EeumRouter.route("/").delete(logOut2eum);
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
