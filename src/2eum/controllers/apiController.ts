import axios from "axios"
import {RequestHandler} from "express"
import User from "../../models/User"
export const GoogleLogin:RequestHandler = async(req,res) =>{
    console.log(req.session.passport)
    const userdata = req.session.passport.user
    const email = userdata.email
    const existsUser = await User.findOne({email});
    if(existsUser){ //이미가입한유저
        console.log("✅ login success by ")
        return res
        .status(200)
        .json({
            statusCode:200,
            msg:"이미 가입된 유저, 로그인 완료",
            data:{
                email:existsUser.email,
                username:existsUser.username,
                nickname:existsUser.nickname,
                avatarUrl:existsUser.avatarUrl,
                uniqueId:JSON.stringify(existsUser._id).replace(/\"/g,""),
                sessionId:req.sessionID
            }
        })
    }else if(!existsUser){
        //깃허브 이메일로 가입된 유저가 없을 겅유
        let nickCheck = await User.findOne({nickname:userdata.displayName}) 
        let nickname= userdata.displayName
        let num = 0
        if(nickCheck!==null){
            console.log("🔥 `"+nickname+"`는 이미 존재해!")
            while(nickCheck!==null){
                nickCheck = await User.findOne({nickname:userdata.displayName+"_"+String(num)})
                ++num
                console.log("🔥 닉네임 중복을 피하는중..." )
            }
            console.log("🔥 없는 닉네임 찾았다!! ->"+userdata.displayName+"_"+String(num))
            nickname = userdata.displayName+"_"+String(num)
            console.log(nickname)
        }
        console.log(nickname)
        await User.create({
            email,
            avatarUrl:userdata.picture,
            username:`${userdata.family_name} ${userdata.given_name}`,
            nickname,
            password1: "123456789",
            sosialOnly : true,
            subscriber : 0,
            subscribe: [],
        })
        const user = User.find({email})
        console.log("✅ saved github data in DB. Next step")
        return res
        .status(201)
        .json({
            statusCode:201,
            msg:"google 회원가입 완료! 로그인 진행해주세요.",
            data: {user}
        })
        }
    else {
        req.flash("error","로그인중 오류가 발생했습니다.")
        new Error("오류발생")
        res.status(500).json({
            statusCode:500,
            msg:"오류발생"
        })
    }
}
export const startKakaoLogin:RequestHandler = (req,res) => {
    const baseUrl ="https://kauth.kakao.com/oauth/authorize?"
    const config:any = {
        client_id : process.env.REST_API_KEY,
        redirect_uri : process.env.REDIRECT_URI,
        response_type :"code",
        scope : "profile_nickname,profile_image,account_email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}${params}`;
    console.log(finalUrl)
    console.log("🔥 스타트 깃허브는 끝냈고, 이제 파이널 url 갈거야")
    return res.redirect(finalUrl)
}
export const finisKakaoLogin:RequestHandler = async(req,res) =>{
    const baseUrl ="https://kauth.kakao.com/oauth/token"
    const config:any = {
        grant_type:"authorization_code",
        client_id : process.env.REST_API_KEY,
        redirect_uri : process.env.REDIRECT_URI,
        client_secret:process.env.RES_API_SECRET,
        code:req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    try{
        const a = await axios.post(baseUrl,params, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" },
        });
        console.log(a)
        const access_token = a.data.access_token
        
        if(access_token){
            console.log("🔥 액세스 토큰이 존재함!")
            const apiUrl = "https://kapi.kakao.com/v2/user/me"
            const profile = await axios.get(apiUrl,{headers:{"Authorization":`Bearer ${access_token}`}})
            const email = profile.data.kakao_account.email;
            const nickname = profile.data.properties.nickname;
            const avatarUrl = profile.data.properties.profile_image;
            const user = await User.findOne({email})
            if(user){
                // console.log("kakao 로그인 : 해당 이메일로 가입된 사용자가 있음. ")
                // req.session.email = email;
                // req.session.loggedIn = true;
                // req.session.username =user.nickname
                // req.session.nickname =user.nickname
                // req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g,"")
                // req.session.sosialOnly = true
                // req.session.avatarUrl = user.avatarUrl
                // req.session.subscriber = user.subscriber
                
                // console.log("✅ login success by github")
                return res.redirect("https://strombreeding.github.io/2eum/")
            }else{
                //깃허브 이메일로 가입된 유저가 없을 겅유
                // let nickCheck = await User.findOne({nickname:profile.data.properties.nickname}) 
                // let nickname= profile.data.properties.nickname
                // let num = 0
                // if(nickCheck!==null){
                //     console.log("🔥 `"+nickname+"`는 이미 존재해!")
                //     while(nickCheck!==null){
                //         nickCheck = await User.findOne({nickname:nickname+"_"+String(num)})
                //         ++num
                //         console.log("🔥 닉네임 중복을 피하는중..." )
                //     }
                //     console.log("🔥 없는 닉네임 찾았다!! ->"+nickname+"_"+String(num))
                //     nickname = nickname+"_"+String(num)
                //     console.log(nickname)
                // }
                // const user = await User.create({
                //     email,
                //     avatarUrl,
                //     username:nickname,
                //     nickname,
                //     password1: "123456789",
                //     sosialOnly : true,
                //     subscriber : 0,
                //     subscribe: [],
                // })
                // req.session.email = user.email
                // console.log("✅ saved kako data in DB. Next step")
                // console.log(req.get('referer'))
                res.status(200).redirect("https://strombreeding.github.io/2eum/")
            }
        }else{
            console.log("X 엑세스토큰이 없음!")
            res.status(404).redirect("https://strombreeding.github.io/2eum/")
        }
    }
    catch{
        console.log("kako REST API 연결실패!")
        res.status(404).redirect("https://strombreeding.github.io/2eum/")
    }
}