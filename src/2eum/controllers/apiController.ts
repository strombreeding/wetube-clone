import {RequestHandler} from "express"
import User from "../../models/User"
export const GoogleLogin:RequestHandler = async(req,res) =>{
    const userdata = req.session.passport.user
    const email = userdata.email
    const existsUser = await User.findOne({email});
    if(existsUser){ //이미가입한유저
        req.session.email = existsUser.email;
        req.session.loggedIn = true;
        req.session.username =existsUser.username
        req.session.nickname =existsUser.nickname
        req.session.uniqueId = JSON.stringify(existsUser._id).replace(/\"/g,"")
        req.session.sosialOnly = true
        req.session.avatarUrl = existsUser.avatarUrl
        req.session.subscriber = existsUser.subscriber
        console.log("✅ login success by ")
        return res.status(200).json({
            statusCode:200,
            msg:"google 로그인 완료"
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
        const user = await User.create({
            email,
            avatarUrl:userdata.picture,
            username:`${userdata.family_name} ${userdata.given_name}`,
            nickname,
            password1: "123456789",
            sosialOnly : true,
            subscriber : 0,
            subscribe: [],
        })
        req.session.email = user.email
        console.log("✅ saved github data in DB. Next step")
        return res.status(201).json({
            statusCode:201,
            msg:"google 로그인 완료"
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