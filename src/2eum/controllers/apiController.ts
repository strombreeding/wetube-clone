import axios from "axios";
import { RequestHandler } from "express";
import Youth from "../../models/Youth";
import dotevb from "dotenv";
import jwt from "jsonwebtoken"
import { db } from "../../db";
import JWT from "../../models/Jwt";
//jwt token 사용법

// 서명 jwt.sign({data}, secretKey , { expiresIn :"1h || 1d"})
// jwt 로그인 시나리오
// 로그인시 클라로 access_toke, refresh_token 넘겨줌
// 권한이 필요한 요청 수행시 실행될 미들웨어 생성
// 요청시 미들웨어 실행 
// access,refresh 둘 다 만료 = > 에러, localstorage clear
// 리프레쉬 살아있다 => 엑세스 재발급

export const createAccessToken = async(id:any)=>{
  try{
    const user = await Youth.findById(id)
    if(user){
      const access_token = jwt.sign({
        username:user.username,
        avatarUrl:user.avatarUrl,
        uniqueId:user._id
      },
      "wegewewgewg",
      {
        expiresIn:'1h'
      })
      return access_token
    }
  }catch(e){
    throw new Error("토큰발급실패")
  }
}
export const createRefreshToken = async(id:any)=>{
  try{
    const user = await Youth.findById(id)
    if(user){
      const refresh_token = jwt.sign({
        username:user.username,
        avatarUrl:user.avatarUrl,
        uniqueId:user._id
      },
      "wegewewgewg",
      {
        expiresIn:"14d"
      })
      
      await JWT.create({
        username:user.username,
        avatarUrl:user.avatarUrl,
      })
      
      return refresh_token
    }
  }catch(e){
    throw new Error("토큰발급실패")
  }
}

export const GoogleLogin: RequestHandler = async (req, res) => {
  console.log("앙기모찌");
  const userdata = req.session.passport.user;
  const email = userdata.email;
  const existsUser = await Youth.findOne({ email });
  try {
    if (existsUser) {
      //이미가입한유저
      const uniqueId = existsUser._id;
      const refresh_token = await createRefreshToken(uniqueId)
      const access_token = await createAccessToken(uniqueId)
      console.log("✅ login success by ");
      return res.status(200).json({
        statusCode: 200,
        msg: "이미 가입된 유저, 로그인 완료",
        data: {
          access_token:uniqueId,
          refresh_token,
          avatarUrl: existsUser.avatarUrl,
          sessionId: req.sessionID,
        },
      });
    } else if (!existsUser) {
      //깃허브 이메일로 가입된 유저가 없을 겅유
      let nickCheck = await Youth.findOne({ username: userdata.displayName });
      let nickname = userdata.displayName;
      let num = 0;
      if (nickCheck !== null) {
        console.log("🔥 `" + nickname + "`는 이미 존재해!");
        while (nickCheck !== null) {
          nickCheck = await Youth.findOne({
            username: userdata.displayName + "_" + String(num),
          });
          console.log(nickCheck)
          ++num;
          console.log("🔥 닉네임 중복을 피하는중...");
        }
        console.log(
          "🔥 없는 닉네임 찾았다!! ->" +
            userdata.displayName +
            "_" +
            String(num)
        );
        nickname = userdata.displayName + "_" + String(num);
      }
      console.log(nickname);
      const newUser = await Youth.create({
        email,
        avatarUrl: userdata.picture,
        ownTickets: [],
        username: nickname,
      });
      const refresh_token = await createRefreshToken(newUser._id)
      const access_token = await createAccessToken(newUser._id)
      // await SessionData.create({
      //   id:req.sessionID,
        
      // })
      console.log("✅ saved Google data in DB. Next step = login");
      //이거하고 안되면 req.session 에다가 email, nickname,avatarUrl 넣고 그걸 리턴
      req.session.email = email;
      req.session.username = nickname;
      req.session.avatarUrl = userdata.picture;
      req.session.uniqueId = String(newUser._id);

      return res.status(201).json({
        statusCode: 201,
        msg: "google 회원가입 완료! 로그인 진행해주세요.",
        data: {
          session: req.session,
          sessionId: req.sessionID,
          access_token:newUser._id,
          refresh_token,
          avatarUrl: userdata.picture,
        },
      });
    }
  } catch (e) {
    throw new Error("Error");
  }
};
export const startKakaoLogin: RequestHandler = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize?";
  const config: any = {
    client_id: process.env.REST_API_KEY_EUM,
    redirect_uri: process.env.REDIRECT_URI_EUM,
    response_type: "code",
    scope: "profile_nickname,profile_image,account_email,birthday,talk_message",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}${params}`;
  console.log(finalUrl);
  console.log("🔥 스타트 깃허브는 끝냈고, 이제 파이널 url 갈거야");
  return res.redirect(finalUrl); // 리다이렉트됨 => 리다이렉트 url 로 code={access+token}
  //여기서 다시 클라이언트로 복귀후 클라에서 아래 url code 담아서 요청
};
export const finisKakaoLogin: RequestHandler = async (req, res) => {
  console.log(req.body);
  const access_token = req.body.access_token;

  if (access_token) {
    console.log("🔥 액세스 토큰이 존재함!");
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const profile = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(profile)
    console.log(profile.data.properties.email)
    const email = profile.data.kakao_account.email;
    const nickname = profile.data.properties.nickname;
    const avatarUrl = profile.data.properties.profile_image;
    const user = await Youth.findOne({ email });
    // console.log(profile);
    if (user) {
      console.log("kakao 로그인 : 해당 이메일로 가입된 사용자가 있음. ");
      req.session.email = email;
      req.session.username = nickname;
      req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g, "");
      req.session.avatarUrl = user.avatarUrl;
      console.log(user)
      console.log("✅ login success by kakao");
      return res.status(200).json({
        data: {
          msg: "카카오 로그인 성공",
          session: req.session,
          sessionId: req.sessionID,
          access_token: user._id,
          avatarUrl: req.session.avatarUrl,
        },
      });
    } else {
      //깃허브 이메일로 가입된 유저가 없을 겅유
      let nickCheck = await Youth.findOne({
        username: profile.data.properties.nickname,
      });
      console.log(nickCheck)
      let nickname = profile.data.properties.nickname;
      let num = 0;
      if (nickCheck !== null) {
        console.log("🔥 `" + nickname + "`는 이미 존재해!");
        while (nickCheck !== null) {
          nickCheck = await Youth.findOne({
            username: nickname + "_" + String(num),
          });
          ++num;
          console.log(nickCheck)
          console.log("🔥 닉네임 중복을 피하는중...");
        }
        console.log(
          "🔥 없는 닉네임 찾았다!! ->" + nickname + "_" + String(num)
          );
          nickname = nickname + "_" + String(num);
        console.log(nickname);
      }
      const user = await Youth.create({
        email,
        avatarUrl,
        username: nickname,
      });
      req.session.email = user.email;
      req.session.nickname = user.username;
      req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g, "");
      req.session.avatarUrl = user.avatarUrl;
      console.log("✅ saved kako data in DB. Next step");
      return res.status(200).json({
        data: {
          msg: "카카오 로그인 성공",
          session: req.session,
          sessionId: req.sessionID,
          access_token: user._id,
          avatarUrl: req.session.avatarUrl,
        },
      });
    }
  } else {
    console.log("X 엑세스토큰이 없음!");
    res.status(404).redirect("login");
  }
  // }
  // catch{
    //     console.log("kako REST API 연결실패!")
    //     res.status(404).redirect("login")
    // }
  };

export const key: RequestHandler = (req, res) => {
  const redirect_url = process.env.KAKAO_URL;
  const client_id = process.env.KAKAO_KEY;
  console.log("zzzzzzzzzzzzzzz", client_id);
  return res.json({
    data: {
      a: redirect_url,
      b: client_id,
    },
  });
};
