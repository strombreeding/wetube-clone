import Video from "../models/Video";
import { RequestHandler } from "express";
import User from "../models/User"
import Comment from "../models/Comment"
import { s3 } from "../middlewares";


export const watch:RequestHandler = async (req,res) => {
    const Id = req.params.id // req.parmas.id == string 이기 때문에
    const video = await Video.findById(Id).populate("owner").populate("comments")
    let comments = [];
    console.log(req.session)
    if(video){
        for(let i =0; i<video?.comments.length;i++){
            // Comment에서 video.commet
            const comment = await Comment.findById(video.comments[i]).populate("owner")
            comments.push(comment)
        }
    }
    const user = await User.findOne({nickname:req.session.nickname})
    if(!video){ // video===null
        return res.render("404",{pageTitle:"Error"})
    }
    const owner = String(video.owner?._id)
    let subscribeing = false
    if(user?.subscribe){
        for (let i = 0; i < user?.subscribe.length; i++) {
            if(user.subscribe[i] === owner){
                subscribeing=true
            }
        }
    }
    return res.render("watch",{pageTitle:video.title,video,comments,subscribeing})
}
export const getEdit:RequestHandler = async(req,res) => {
    const Id = req.params.id
    const thisVideo = await Video.findById(Id)
    if(!thisVideo){ //thisVideo === null){
        return res.status(404).render("404",{pageTitle:"Error"})
    }
    // console.log(JSON.stringify(videos[0]._id).replace(/\"/g, ""),typeof(JSON.stringify(videos[0]._id)),Id,typeof(Id),JSON.stringify(videos[0]._id).replace(/\"/g, "")===Id)
    // const videoIndex = videos.findIndex(object => {return JSON.stringify(object._id).replace(/\"/g, "")===Id;})
    // const thisVideo = videos[videoIndex]; 
    return res.render("mediaEdit",{thisVideo:thisVideo,pageTitle:thisVideo.title})
}
export const postEdit:RequestHandler =async(req,res)=>{
    const Id = req.params.id 
    const video = await Video.findById(Id)
    const {title,description,hashtags} = req.body;
    if(!video){
        return res.render("404",{pageTitle:"Error",error:"수정하려는 비디오가 없어요"})
    }
    await Video.findByIdAndUpdate(Id,{
        title,
        description,
        hashtags : hashtags.replace(/(\s*)/g, "").replace(/\#/g,"").split(",").map((word: string) => `#${word}`)
    })
    req.flash("edit","비디오 업데이트")
    return res.redirect(`/videos/${Id}`) 
}
export const remove:RequestHandler = async(req,res) => {
    const Id = req.params.id;
    const video = await Video.findById(Id).populate("owner").populate("comments");
    const {deleteTitle,createdAt} = req.body
    //db에서 비디오와 엮인 모든것 삭제.
    if(video?.comments){
        for(let i = 0; i<video?.comments.length; i++){
            await Comment.findByIdAndDelete(video.comments[i])
        }
    }
    if(deleteTitle!=="삭제" || !video){
        return res.sendStatus(500).render("404", {error:`잘못된 접근입니다.`,pageTitle:"Error",})
    }
    await Video.findByIdAndRemove(Id);
    await User.findByIdAndUpdate(video.owner,{
        $pull:{own:String(video._id)}
    })
    if(video.owner){
        await User.updateOne(
            {_id : video.owner._id},
            {
                $pull:{own:video.owner._id},
            })
    }
    // s3 에서 비디오파일 삭제
    console.log(`${req.session.email}${createdAt}.mp4`)
    try{
        s3.deleteObject({
            Bucket: `wetube-jinytree/video`,
            Key: `${req.session.email}${createdAt}.mp4`
          }, (err, data) => {
            if (err) { throw err; }
            console.log('s3 deleteObject ', data)
          })
    }catch(err){
        console.log(err)
    }
    return res.redirect("/")
}

export const getUpload:RequestHandler = (req,res) => {
    return res.render(`upload`)
}

import fs from "fs"
export const postUpload:RequestHandler  = async(req,res) => {
    const {title,hashtags,description} = req.body
    console.log(req.file)
    // console.log(JSON.stringify(req.file)+"zz")
    try{ 
        const video = await Video.create({
            fileUrl:req.file?.location,
            owner:req.session.uniqueId,
            title,
            s3Id:req.session.random,
            description,
            hashtags:hashtags.replace(/(\s*)/g, "").replace(/\#/g,"").split(",").map((word: string) => `#${word}`)
        })
        await User.updateOne({
            nickname:req.session.nickname
        },
        {
            $push:{
                own:String(video._id)
            }
        })
        const fsExtra = require("fs-extra");
        const directory = process.cwd()+"/uploads/storage/"
        fs.unlink("/"+req.session.nickname+".mp4",(err)=>{
            if(err){
                console.log("완료")
            }
        })
        fsExtra.emptyDirSync(directory)    

        return res.redirect(`/user/${req.session.nickname}/userplace`)

    } catch(error:any) {
        console.log(error)
        return res.status(400).render("upload", {
            error:error._message,            
        })
    }
    // await newVideo.save()
    // videos.push(videoDiv)       
}

