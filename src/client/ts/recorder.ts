import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg,fetchFile } from "@ffmpeg/ffmpeg";
// import { a } from "../../controllers/apiController";
// const ffmpeg = createFFmpeg({log:true});

const startBtn = document.getElementById("startBtn") as HTMLElement;
const video = document.getElementById("preview") as HTMLMediaElement;
const label = document.getElementById("lavel") as HTMLElement;
const download__a = document.getElementById("download__a") as HTMLAnchorElement
const downloadBtn = document.getElementById("downloadBtn") as HTMLElement
let stream:any;
let recorder:MediaRecorder;
let videoFile:any
const handleStop = () =>{
    startBtn.textContent = "녹화하기"
    startBtn.className="fa-solid fa-record-vinyl"
    startBtn.removeEventListener("click", handleStop)
    startBtn.addEventListener("click", handleReady)
    recorder.stop()
    video.srcObject=null;
    
}

const downLoad =async () => {
    // await ffmpeg.load();
    // ffmpeg.FS("writeFile","recording.webm",await fetchFile(video.src))
    // await ffmpeg.run("-i","recodring.webm","-r","60","output.mp4")
    // download__a.href=video.src
    download__a.click()
    console.log("zz")
}
const handleReady = async()=>{
    await init()
    label.className = "hidden"
    downloadBtn.className="hidden"
    startBtn.removeEventListener("click", handleReady)
    startBtn.textContent = "준비중..."
    startBtn.className=""
    try{
        console.log("츄라이")
        startBtn.addEventListener("click", handleStop)
        startBtn.textContent = "녹화중지"
        recorder = new MediaRecorder(stream,{mimeType:"video/webm"}) as MediaRecorder
        recorder.ondataavailable = (e:any) => {
            videoFile = URL.createObjectURL(e.data)
            video.srcObject =null;
            video.src=videoFile
            video.loop=true;
            downloadBtn.className="downLoad"
            label.className = ""
            // download__a.download="zzz"
            video.play()
            
        }
        recorder.start()
        console.log(videoFile,"Zz")
    }
    catch(error){
        console.log(error)
    }
    // setTimeout(()=>{
    //     }
    // },2000)
    // console.log(videoFile)
}

// 자동실행
const init = async()=>{
    video.srcObject =null; 
    stream= await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    video.srcObject =stream 
    video.play()
}



download__a.addEventListener("click", downLoad)
startBtn.addEventListener("click", handleReady)




