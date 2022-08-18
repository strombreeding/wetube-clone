import { RequestHandler } from "express";
import axios from "axios";
import User from "../models/User"
import bcrypt from "bcrypt"

export const myPage:RequestHandler = (req,res) => {
    return res.send(`${req.params.id}'s page`)
}
export const startGithubLogin:RequestHandler = (req,res) => {
    const baseUrl ="https://github.com/login/oauth/authorize"
    const config:any = {
        client_id : process.env.GH_CLIENT,
        allow_signup : false,
        scope : "read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log("🔥 스타트 깃허브는 끝냈고, 이제 파이널 url 갈거야")
    return res.redirect(finalUrl)
}
export const finishGithubLogin:RequestHandler = async(req,res) => {
    const baseUrl ="https://github.com/login/oauth/access_token"
    const config:any = {
        client_id : process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code: req.query.code
    };
    const { data: requestToken } = await axios.post(baseUrl, config, {
      headers: { Accept: "application/json" },
    });
    if("access_token" in requestToken){
        const { access_token } = requestToken; 
        const apiUrl = "https://api.github.com";
        //유저 퍼블릭 정보를 
        const { data: userdata } = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `token ${access_token}` },
        }); 

        const { data: emailDataArr } = await axios.get(`${apiUrl}/user/emails`, {
        headers: { Authorization: `token ${access_token}` },
        }); 
        const emailObj = emailDataArr.find((email:any) => email.primary===true&& email.verified===true)
        if(!emailObj){
            console.log("프라이머리와 베리파이드가 true인 이메일이 깃허브 정보에 존재하지 않음.")
            return res.status(400).redirect("/");
        }
        //아래부턴 깃허브이메일이 웹에서 이미 회원가입된 경우 진행
        const existsUser = await User.findOne({email:emailObj.email});
        if(existsUser){ //깃허브 이메일로 가입된 유저가 있는경우
                req.session.email = existsUser.email;
                req.session.loggedIn = true;
                req.session.username =existsUser.username
                req.session.nickname =existsUser.nickname
                req.session.uniqueId = JSON.stringify(existsUser._id).replace(/\"/g,"")

                req.session.sosialOnly = true
                console.log("✅ login success by github")
                return res.redirect("/")
        }else{
            console.log("🔥 DB can't this user in Db")
            //깃허브 이메일로 가입된 유저가 없을 겅유
            const existsUser = await User.findOne({email:emailObj.email});
            const overlapNick = await User.find({nickname:existsUser?.nickname})
            const overlapNickLength = overlapNick.length
            console.log(userdata.login)
            const newUser = await User.create({
                email:emailObj.email,
                avatarUrl:userdata.avatar_url,
                username:userdata.name,
                nickname:`${userdata.login}_${overlapNickLength}`,
                password1: "123456789",
                sosialOnly : true
            })
        console.log("✅ saved github data in DB. Next step")
            res.render("sosialJoin",{pageTitle:`${newUser.nickname}`,userEmail:newUser.email})
        }
    }
    else {
    res.redirect("/login")

    }
}
export const sosialCreatePw:RequestHandler = async(req,res) => {
    const {password1,userEmail} = req.body
    console.log(req.body)
    const realPw = await bcrypt.hash(password1,10)
    if(password1){
        await User.updateOne(
        { email: userEmail },
        {
            $set: { password1: realPw },
            $currentDate: { lastModified: true }
        }
        )
        const existsUser = await User.findOne({email:userEmail});

        req.session.email = existsUser?.email;
        req.session.loggedIn = true;
        req.session.username =existsUser?.username
        req.session.nickname =existsUser?.nickname
        req.session.sosialOnly = true
        console.log("✅ login success by github")
        return res.redirect("/")
    }
      
}
export const sosialDelete:RequestHandler = async(req,res) => {
    const email = req.body.email
    console.log(req.body)
    console.log("target email : "+email)
    await User.deleteOne({email:email});
    console.log("❌ login fail. and delete info from DB");
    return res.status(404);
}
export const getEdit:RequestHandler = (req,res) => {
        if(req.params.id === req.session.nickname){
        return res.render("userEdit",{pageTitle:req.session.username+"'s page"})
    }else{
        return res.status(400).send("수상한 녀석이군..  처단하라!!")
    }
}
export const postEdit:RequestHandler = async(req,res) => {
    const {password1,nickname} = req.body
    console.log(req.body)
    const pageTitle = "Edit"
    const user = await User.findOne({nickname:req.params.id})
    if(!user){
        console.log("입구컷")
        return res.status(400).render("userEdit",{pageTitle})
    }
    //위 이프문을 실행하면 user는 자동적으로 있다는 것!
    try{
        console.log("try")
        const compare = await bcrypt.compare(password1, user.password1)
        if(!compare){
            console.log("비번 잘못 입력")
            return res.status(400).render('userEdit', {pageTitle,errorMsg:"❌ 비밀번호를 확인해주세요."})
        }else if(compare){
            req.session.certification = true
            return res.redirect(`/user/${user.nickname}/edit-profile`)
        }
    }
    catch{    
        const newNickname = await User.exists({nickname:nickname});
        console.log("✅"+newNickname)
        if(!newNickname&&nickname!==""){
            await User.updateOne(
            { email: user.email },
                {
                    $set: { nickname: nickname },
                    $currentDate: { lastModified: true }
                })
            req.session.nickname = nickname
            return res.redirect(`/user/${nickname}/userPlace`)
        }else{
            return res.status(400).render(`userEdit`,{pageTitle,errorMsg:`❌ "${nickname}"은 유효하지 않은 닉네임입니다.`})
        } 
    }
}

export const Delete:RequestHandler = (req,res) => res.send("회원 탈퇴")
export const logOut:RequestHandler = (req,res) => {
    req.session.destroy(()=>req.session);
    return res.redirect("/")
}
export const getIndividualPage:RequestHandler= async(req,res)=>{
    const who = req.params.id
    console.log("들어옴",who)
    const zz =await User.findOne({nickname:who})
    if (zz){
        return res.render("userPlace",{pageTitle:zz?.nickname+"'s page"})
    }else{
        return res.send("연결 실패")
    }
}
export const postIndividualPage:RequestHandler= async(req,res)=>{
    const who = req.params.id
    const zz =await User.find({nickname:who})
    return res.render("userPlace",{pageTitle:req.session.username+"'s page"})
}