import regeneratorRuntime from "regenerator-runtime";

import { QueryOptions } from "mongoose";
import { type } from "os";

const startBtn = document.getElementById("startBtn") as HTMLElement;
const video = document.getElementById("preview") as HTMLMediaElement;
const label = document.getElementById("lavel") as HTMLElement;
const download__a = document.getElementById("download__a") as HTMLAnchorElement
const downloadBtn = document.getElementById("downloadBtn") as HTMLElement
let stream:any;
let recorder:MediaRecorder;
let videoFile:any
console.log(videoFile)
const handleStop = () =>{
    console.log("스탑",videoFile)
    startBtn.textContent = "녹화하기"
    startBtn.className="fa-solid fa-record-vinyl"
    startBtn.removeEventListener("click", handleStop)
    startBtn.addEventListener("click", handleReady)
    recorder.stop()
    video.srcObject=null;
    
}


const handleReady = async()=>{
    init()
    label.className = "hidden"
    downloadBtn.className="hidden"
    startBtn.removeEventListener("click", handleReady)
    startBtn.textContent = "준비중..."
    startBtn.className=""
    setTimeout(()=>{
        startBtn.addEventListener("click", handleStop)
        
        startBtn.textContent = "녹화중지"
        
        recorder = new MediaRecorder(stream,{mimeType:"video/webm"}) as MediaRecorder
        recorder.ondataavailable = (e:any) => {
            videoFile = URL.createObjectURL(e.data)
            console.log(videoFile)
            video.srcObject =null;
            video.src=videoFile
            console.log(videoFile)
            video.loop=true;
            download__a.href=videoFile;
            download__a.download = "zz"
            downloadBtn.className="downLoad"
            label.className = ""
            video.play()
            return
        }
        
        recorder.start()
    },2000)
    console.log(videoFile)
}

// 자동실행
const init = async()=>{
    video.srcObject =null; 
    stream= await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    video.srcObject =stream 
    video.play()
}




startBtn.addEventListener("click", handleReady)




