import { QueryOptions } from "mongoose";
import videoModel from "../../models/Video";

const video = document.querySelector("video") as HTMLVideoElement;
const preVideo = document.getElementById("video") as QueryOptions;
const form = document.getElementById("zz") as HTMLFormElement;
const videoBox = document.getElementById("videoContatiner") as HTMLElement;
console.log(preVideo)
const preView = () =>{
    video.src = `/#t=0.5`
    console.log("바뀌는거감지")
    const formData = new FormData(form)
    console.log(formData)
    $.ajax({
        type:"POST",
        url:`/api/preview/save`,
        data:formData,
        dataType:"JSON",
        processData:false,
        contentType:false,
        success : (response)=>{
            videoBox.className = `upload_video`
            video.src = `/${response.path}#t=0.5`
            console.log(preVideo.src)
            console.log(response.path)
            let a =document.getElementById("lavel")?.className
            a="hidden"
        }
    })
}
preVideo.addEventListener("change",preView)