"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { a } from "../../controllers/apiController";
// const ffmpeg = createFFmpeg({log:true});
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
const label = document.getElementById("lavel");
const download__a = document.getElementById("download__a");
const downloadBtn = document.getElementById("downloadBtn");
let stream;
let recorder;
let videoFile;
const handleStop = () => {
    startBtn.textContent = "녹화하기";
    startBtn.className = "fa-solid fa-record-vinyl";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleReady);
    recorder.stop();
    video.srcObject = null;
};
const downLoad = () => __awaiter(void 0, void 0, void 0, function* () {
    // await ffmpeg.load();
    // ffmpeg.FS("writeFile","recording.webm",await fetchFile(video.src))
    // await ffmpeg.run("-i","recodring.webm","-r","60","output.mp4")
    // download__a.href=video.src
    download__a.click();
    console.log("zz");
});
const handleReady = () => __awaiter(void 0, void 0, void 0, function* () {
    yield init();
    label.className = "hidden";
    downloadBtn.className = "hidden";
    startBtn.removeEventListener("click", handleReady);
    startBtn.textContent = "준비중...";
    startBtn.className = "";
    try {
        console.log("츄라이");
        startBtn.addEventListener("click", handleStop);
        startBtn.textContent = "녹화중지";
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        recorder.ondataavailable = (e) => {
            videoFile = URL.createObjectURL(e.data);
            video.srcObject = null;
            video.src = videoFile;
            video.loop = true;
            downloadBtn.className = "downLoad";
            label.className = "";
            // download__a.download="zzz"
            video.play();
        };
        recorder.start();
        console.log(videoFile, "Zz");
    }
    catch (error) {
        console.log(error);
    }
    // setTimeout(()=>{
    //     }
    // },2000)
    // console.log(videoFile)
});
// 자동실행
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    video.srcObject = null;
    stream = yield navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = stream;
    video.play();
});
download__a.addEventListener("click", downLoad);
startBtn.addEventListener("click", handleReady);
