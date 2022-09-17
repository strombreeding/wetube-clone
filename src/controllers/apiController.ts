import { RequestHandler } from "express"
import { Schema } from "mongoose"
import User from "../models/User"
import Video from "../models/Video"


// join 
export const checkEmail:RequestHandler = async(req,res) =>{
    const email = req.body.email
    console.log("체크이메일")
    const user = await User.exists({email:email})
    if(user){
        console.log("user = true")
        const errorMsg = "❌ 이미 존재하는 이메일입니다."
        return res.json({boolean:user,user:email,errorMsg})
    }else if(!user&&!email.includes("@")){
        console.log("user = fasle")
        const errorMsg = "❌ 유효하지 않은 이메일 형식입니다."
        return res.json({boolean:user,user:email,errorMsg})
    }else {
        console.log("user = fasle")
        const errorMsg = "✅ 이 이메일은 사용 가능합니다."
        return res.json({boolean:user,user:email,errorMsg})
    }

}
export const checkName:RequestHandler = async(req,res) =>{
    console.log("체크닉네임")
    const {nickname} = req.body
    const username= await User.exists({nickname})
    const sameNick = await User.findOne({nickname})
    console.log(sameNick)
    console.log(username)
        
        if(req.session.nickname===nickname){
            return res.json({errorMsg:"기존의 닉네임입니다."})
        }else if(username){
            console.log("username = true")
            const errorMsg = "❌ 이미 존재하는 닉네임입니다."
            return res.json({boolean:username,user:nickname,errorMsg})
        }else if(!username){
            console.log("username = false")
            const errorMsg = "✅ 사용이 가능한 닉네임입니다."
            return res.json({boolean:username,user:nickname,errorMsg})
        }
}
// sosial join
import fs from "fs"

export const a:RequestHandler = (req,res)=>{
    console.log(req.file)
    const filePath = req.file?.path
    // const fsExtra = require("fs-extra");
    // const directory = process.cwd()+"/uploads/storage/"
    // fs.unlink("/"+filePath,(err)=>{
    //     if(err){
    //         console.log("완료")
    //     }
    // })
    // fsExtra.emptyDirSync(directory)
    res.status(200).json({path:filePath})
}

export const sosialDelete:RequestHandler = async(req,res) => {
    console.log(req.body.email)
    console.log("target email : "+req.body.email)
    await User.deleteOne({email:req.body.email});
    req.session.destroy(()=>req.session);
    console.log("❌ login fail. and delete info from DB");
    return res.status(404).redirect("/login");
}

// 조회수 증가
export const registerView:RequestHandler = async(req,res) =>{
    const id = req.body.id;
    const video = await Video.findById(id)
    console.log(id)
    if(!video){
        return res.sendStatus(404)
    }
    video.views = Number(video.views)+1
    video.save()
    res.sendStatus(200)
}  

export const storageAvatarz:RequestHandler = async(req,res)=>{
    console.log(req.file)
    return res.json({path:req.file?.path})
}