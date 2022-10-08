import { QueryOptions } from "mongoose";
import videoModel from "../../models/Video";

const video = document.querySelector("video") as HTMLVideoElement;
const preVideo = document.getElementById("video") as QueryOptions;
const form = document.getElementById("zz") as HTMLFormElement;
const videoBox = document.getElementById("videoContatiner") as HTMLElement;
const pc__uploadTogle=document.getElementsByClassName("pc__uploadTogle")[0] as HTMLUListElement
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
            // pc__uploadTogle.className="hidden"
        }
    })
}
preVideo.addEventListener("change",preView)
// window.onbeforeunload = function (event) {
//     const email =String($(`input[name=userEmail]`).val());
// 	    $.ajax({
//             type:"POST",
//             url:"/api/sosial/exit",
//             data:{email},
//             dataType:"JSON",
//             success:function(response){
//                 console.log(response)
//             }
//         })
//     event.preventDefault();
    
// }