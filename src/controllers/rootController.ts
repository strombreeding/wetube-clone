import bcrypt from "bcrypt"
import { RequestHandler } from "express"
import Video from "../models/video"
import User from "../models/User"


export const Home:RequestHandler = async (req,res) => {
    const videos = await Video.find({})
    return res.render("home",{pageTitle:"Home",videos:videos,})
}

export const checkEmail:RequestHandler = async(req,res) =>{
    const email = req.body.email
    const user = await User.exists({email:email})
    if(user){
        console.log("user = true")
        const msg = "❌ 이미 존재하는 이메일입니다."
        return res.json({boolean:user,user:email,msg})
    }else if(!user&&!email.includes("@")){
        console.log("user = fasle")
        const msg = "❌ 유효하지 않은 이메일 형식입니다."
        return res.json({boolean:user,user:email,msg})
    }else {
        console.log("user = fasle")
        const msg = "✅ 이 이메일은 사용 가능합니다."
        return res.json({boolean:user,user:email,msg})
    }

}
export const checkName:RequestHandler = async(req,res) =>{
    const {nickname} = req.body
    const username= await User.exists({nickname})
      if(username){
        console.log("username = true")
        const msg = "❌ 이미 존재하는 닉네임입니다."
        return res.json({boolean:username,user:nickname,msg})
    }else if(!username){
        console.log("username = false")
        const msg = "✅ 사용이 가능한 닉네임입니다."
        return res.json({boolean:username,user:nickname,msg})
    }

}

export const getJoin:RequestHandler = async(req,res) => {
    return res.render("join",{pageTitle:"Join"})
}
export const postJoin:RequestHandler = async (req,res) => {
    console.log(req.body)
    const {email,nickname,username,password1,password2,} = req.body
    const existsEmail = await User.exists({email})
    const existsName = await User.exists({nickname})
    const nameSpace = email.includes(" ");
    const emailSpace = nickname.includes(" ");
    console.log(password1)
    if(nameSpace){
        return res.status(400).render("join",{pageTitle:"Join",errorMsg:"❌  닉네임에 공백을 사용할 수 없습니다.",})
    }
    if(emailSpace){
        return res.status(400).render("join",{pageTitle:"Join",errorMsg:"❌  닉네임에 공백을 사용할 수 없습니다.",})
    }
    if(password1!==password2){
        return res.status(400).render("join",{pageTitle:"Join",errorMsg:"❌  비밀번호가 동일하지 않습니다.",})
    }
    if(existsEmail){
        return res.status(400).render("join",{pageTitle:"Join",errorMsg:"❌  이미 가입된 이메일입니다. 소셜로그인을 해보세요!"})
    }
    if(existsName){
        return res.status(400).render("join",{pageTitle:"Join",errorMsg:"❌  중복된 닉네임입니다."})
    }
    try{
        await User.create({
            email,
            nickname,
            username,
            password1:password1,
        })
        console.log("pw를 사용한 회원가입 완료")
        return res.render("login",{pageTitle:"Login",})
    }catch(error:any) {
        console.log(error)
        return res.status(400).render("join", {
            error:error._message,          
        })
    }
}
export const getLogin:RequestHandler = (req,res) => {
    res.render("login",{pageTitle:"Login",})
}

export const postLogin:RequestHandler = async(req,res) => {
    const {email,password1} = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).render('login', {pageTitle,errorMsg:"이메일이 유효하지 않습니다."})
    }
    const ok = await bcrypt.compare(password1, user.password1) // bcrypt의 라이브러리, compare(해시할것, 이미 해시화된것)
    if(!ok){
        console.log("비번 잘못 입력")
        return res.status(400).render('login', {pageTitle,errorMsg:"비밀번호를 확인해주세요."})
    }
    req.session.email = email;
    req.session.loggedIn = true;
    req.session.username =user.username
    req.session.nickname = user.nickname
    req.session.uniqueId = JSON.stringify(user._id).replace(/\"/g,"")
    console.log(`✅ login seccess! welcome ${user.username}`)
    console.log(req.session)
    return res.redirect('/')
}
export const serch:RequestHandler = async(req,res) =>  {
    const {searchWord} =  req.query
    let videos:{} = []
    if(searchWord){
        console.log(searchWord)
        videos = await Video.find( { $or: [ { title: {$regex: new RegExp(`${searchWord}` , "i")} }, { description:{$regex: new RegExp(`${searchWord}` , "i")} } , {hashtags:{$regex: new RegExp(`${searchWord}` , "i")}} ] } )
    } 
    // find( { tags: { $all: [ "#serchWord" ] } } ) 해쉬태그 만들때 쓸거
    return res.render("serch",{pageTitle:searchWord,searchWord,videos})
}
