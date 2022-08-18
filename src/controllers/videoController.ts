import { RequestHandler } from "express";
import Video from "../models/video"




export const watch:RequestHandler = async (req,res) => {
    const Id = req.params.id // req.parmas.id == string 이기 때문에
    const videos = await Video.find({})
    // console.log(JSON.stringify(videos[0]._id).replace(/\"/g, ""),typeof(JSON.stringify(videos[0]._id)),Id,typeof(Id),JSON.stringify(videos[0]._id).replace(/\"/g, "")===Id)
    // const videoIndex = videos.findIndex(object => {return JSON.stringify(object._id).replace(/\"/g, "")===Id;})
    // const thisVideo = videos[videoIndex];  
    const video = await Video.findById(Id)  
    if(!video){ // video===null
        return res.render("404",{pageTitle:"Error"})
    }
    return res.render("watch",{pageTitle:video.title,videos:videos,video})
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
    
    return res.redirect(`/videos/${Id}`) 
}
export const remove:RequestHandler = async(req,res) => {
    const Id = req.params.id;
    const video = await Video.findById(Id);
    const {deleteTitle} = req.body
    console.log(deleteTitle)
    if(deleteTitle!=="accept" || !video){
        return res.render("404", {error:`잘못된 접근입니다.`,pageTitle:"Error",})
    }
    await Video.findByIdAndRemove(Id);
    return res.redirect("/")
    // const videoIndex = videos.findIndex(object => {return object.id === Id;})
    // const thisVideo = videos[videoIndex];
    // if(req.body.deleteTitle ==='accept'){
    //     videos.splice(videoIndex,1)
    //     return res.redirect("/")
    // }else{
    //     console.log(req.body)
    //     res.redirect('edit')
    // }
}

export const getUpload:RequestHandler = (req,res) => {
    return res.render(`upload`)
}
export const postUpload:RequestHandler  = async(req,res) => {
    const {title,hashtags,description} = req.body
    
    try{ 
        await Video.create({
            title,
            description,
            hashtags:hashtags.replace(/(\s*)/g, "").replace(/\#/g,"").split(",").map((word: string) => `#${word}`)
        })
        console.log(hashtags,1)
        return res.redirect("/")

    } catch(error:any) {
        console.log(error)
        return res.status(400).render("upload", {
            error:error._message,            
        })
    }
    // await newVideo.save()
    // videos.push(videoDiv)       
}
