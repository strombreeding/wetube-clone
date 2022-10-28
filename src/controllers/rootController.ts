import bcrypt from "bcrypt"
import { RequestHandler } from "express"
import Video from "../models/Video"
import User from "../models/User"


export const Home:RequestHandler = async (req,res) => {
    const videos = await Video.find({}).sort({createdAt:-1}).populate("owner")
    return res.render("home",{pageTitle:"Home",videos:videos,})
}

export const getJoin:RequestHandler = async(req,res) => {
    return res.render("join",{pageTitle:"Join"})
}
export const postJoin:RequestHandler = async (req,res) => {
    const {email,nickname,username,password1,password2,} = req.body
    const existsEmail = await User.exists({email})
    const existsName = await User.exists({nickname})
    const nameSpace = email.includes(" ");
    const emailSpace = nickname.includes(" ");
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
            avatarUrl:"https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa3feb67-0971-4269-aaaa-c65f02f58bed%2FUntitled.png?table=block&id=cb62347a-1d99-45e9-a5ac-55109896ae3d&spaceId=beaa8bbc-f504-4c20-b220-9fc699f70e12&width=2000&userId=14cc2ef3-04b9-41f7-9991-3bf06bfcb033&cache=v2",
            nickname,
            username,
            password1:password1,
            subscriber : 0,
            subscribe:[],
        })
        console.log("pw를 사용한 회원가입 완료")
        console.log(await User.find({email}))
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
    req.session.avatarUrl = user.avatarUrl
    // req.session.subscribe = user.subscribe
    req.session.subscriber = user.subscriber
    console.log(`✅ login seccess! welcome ${user.username}`)

    return res.redirect("back")
}
export const serch:RequestHandler = async(req,res) =>  {
    const {searchWord} =  req.query
    console.log(searchWord)
    if(searchWord){
        const users = await User.find({nickname:{$regex: new RegExp(`${searchWord}`, "i")}})
        const videos = await Video.find({ $or: [{
            title: {$regex: new RegExp(`${searchWord}` , "i")} 
        },
        {
            description:{$regex: new RegExp(`${searchWord}` , "i")} 
        },
        {
            hashtags:{$regex: new RegExp(`${searchWord}` , "i")}
        },]
        }).populate("owner")
        console.log(videos)
        if(videos){
            console.log("해당비디오 찾음")
            
        }
        if(users){
            const user = await User.find({nickname:{$regex: new RegExp(`${searchWord}`, "i")}})
            console.log("채널찾기")
            let videos = []
            for (let i = 0; i < user.length; i++) {
                for (let r = 0; r < user[i].own.length; r++) {
                    videos.push(await Video.findOne({_id:user[i].own[r]}).populate("owner")) 
                }
            }
            return res.render("serch",{pageTitle:searchWord,searchWord,videos,users})
        }
        console.log('찾을수가없네')
        return res.render("serch",{pageTitle:searchWord,searchWord,videos})
        
    }else{
        return res.render("serch",{pageTitle:searchWord,searchWord,videos:[]})
    }
}
