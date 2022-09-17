// import regeneratorRuntime from "regenerator-runtime";

import { QueryOptions } from "mongoose";
import { type } from "os";

const startBtn = document.getElementById("startBtn") as HTMLElement;
const video = document.getElementById("preview") as QueryOptions;

let stream:any;
let recorder:any;
const handleStop = () =>{
    startBtn.textContent = "녹화 시작"
    startBtn.removeEventListener("click", handleStop)
    startBtn.addEventListener("click", handleStart)
    recorder.stop()
    console.log(recorder)
}

const handleStart = ()=>{
    startBtn.textContent = "녹화 종료"
    startBtn.removeEventListener("click", handleStart)
    startBtn.addEventListener("click", handleStop)
    recorder = new MediaRecorder(stream)
    console.log(recorder)
    recorder.ondataavailable= (e:any)=>{
        const videoFile = URL.createObjectURL(e.data)
        console.log(videoFile)
    }
    recorder.start()
}
const init = async()=>{
    stream= await navigator.mediaDevices.getUserMedia({video:true,audio:false})
    video.srcObject =stream 
    video.play()
}
init()



startBtn.addEventListener("click", handleStart)
