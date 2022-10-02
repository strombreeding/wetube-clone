import { QueryOptions } from "mongoose";

//ts 에서 document 지정해줄때 오류가 난다면 꼭 as 뒤에걸 해보자!
//pc
const video =document.querySelector("video") as QueryOptions
const playBtn = document.getElementById("play") as HTMLElement;
const bgClickPlay = document.getElementById("bgClick__play") as HTMLElement;
const muteBtn = document.getElementById("mute") as HTMLElement;
const volumRange = document.getElementById("volum") as HTMLInputElement;
const currentTime = document.getElementById("currentTime") as HTMLElement;
const totalTime = document.getElementById("totalTime") as HTMLElement;
const timeline = document.getElementById("timeline") as QueryOptions;
const fullScreenBtn = document.getElementById("fullScreen") as HTMLElement;
const videoContainer = document.getElementById("videoContainer") as HTMLElement;
const videoControls = document.getElementsByClassName("videoControls")[0] as HTMLElement;
const fullScreenIcon = fullScreenBtn.querySelector("i") as QueryOptions;
const muteBtnIcon = muteBtn.querySelector("i")as QueryOptions;
const playBtnIcon = playBtn.querySelector("i")as QueryOptions;

//mobile
// const mobilePlay = document.getElementsByClassName("mobile__play")[0] as HTMLElement;
// const mobilePlayBtn = document.getElementById("mobilePlay") as HTMLElement;
// const mobilePlayBtnIcon = mobilePlayBtn.querySelector("i")as QueryOptions;



//전역변수
let controlsTimeout:any = null
let controlsMovementTimeout:any = null

// video.volume = Number(localStorage.getItem("preferredVol"))
// volumRange.value = String(localStorage.getItem("preferredVol"))


// const mobileHandlePlay = () =>{
//     //비디오가 실행중이면 멈추고
//     //아니면 실행시킨다
//     if(video.paused){
//         video.play();
//         mobilePlayBtnIcon.classList= "fas fa-pause"
//     }else{
//         video.pause()
//         mobilePlayBtnIcon.classList= "fas fa-play"
//     }
// }

// const handlePlay = () =>{
//     if(video.paused){
//         video.play();
//         playBtnIcon.classList= "fas fa-pause"
//     }else{
//         video.pause()
//         playBtnIcon.classList= "fas fa-play"
//     }
// }


// const handleMute = () =>{
//     if(video.muted){
//         video.muted = false
//         if(localStorage.getItem("preferredVol")==="0"){
//             localStorage.setItem("preferredVol","0.1")
//             video.volume = 0.1
//         }
//     }else {
//         video.muted = true
//     }
//     muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up"
    
//     volumRange.value= video.muted ?  "0": String(localStorage.getItem("preferredVol"))
//     console.log("현재음량 "+localStorage.getItem("preferredVol"))
// }
// const handleVolumeChange = (event:any) =>{
//     let {target: {value}} = event //==event.target.value
//     localStorage.setItem("preferredVol",String(`${value}`))
//     video.volume = value
//     if(video.volume===0){
//         video.muted = true
//         muteBtnIcon.classList ="fas fa-volume-mute"
//     }else{
//         video.muted = false
//         muteBtnIcon.classList ="fas fa-volume-up"
//     }
// }




const now = (time:Date) =>{
    const sec = time.toISOString().substr(17,2)
    const min = time.getMinutes()
    const hour = time.getHours()-9
    let playNow = ""
    if(sec<"60"){
        playNow = `0:${sec}`
    }
    if(min>0){
        playNow = `${min}:${sec}`
    }
    if(hour>0&&min<10){
        playNow = `${hour}:0${min}:${sec}`
    }
    if(hour>0&&min>=10){
        playNow = `${hour}:${min}:${sec}`
    }
    
    return playNow
}
const handleMetaData = ()=>{
    const totalTimes = new Date(Math.floor(video.duration)*1000)
    const a = now(totalTimes)
    totalTime.textContent = a;
    timeline.max = Math.floor(video.duration)
}
const handleTimeUpdate = ()=>{
    const nowTime =  new Date(Math.floor(video.currentTime)*1000)
    const a = now(nowTime)
    currentTime.textContent = a
    timeline.value = Math.floor(video.currentTime);
    if(video.duration===video.currentTime){
        video.pause()
        // playBtnIcon.classList= "fas fa-play"
    }
} 
const handleTimeLineChange = (event:any) =>{
    const {target: {value}} = event //==event.target.value
    video.currentTime = value;
}

// const handleFullScreen = () =>{
//     const fullScreen = document.fullscreenElement;
//     if(fullScreen){
//         alert(fullScreen)
//         document.exitFullscreen();
//         fullScreenIcon.className = "fas fa-expand"
//     }else {
//         videoContainer.requestFullscreen()
//         fullScreenIcon.className = "fas fa-compress"
//     }
// }
// const hideControls = () =>{
//     mobilePlay.className ="hidden"
//     videoControls.className="hidden"
// }
// const handleMouseMove = () =>{
//     if(controlsTimeout){
//         clearTimeout(controlsTimeout)
//         controlsTimeout = null;
//     }
//     if(controlsMovementTimeout){
//         clearTimeout(controlsMovementTimeout)
//         controlsMovementTimeout=null
//     }
//     mobilePlay.className ="mobile__play"
//     videoControls.className="videoControls"
//     controlsMovementTimeout=setTimeout(hideControls,3000)
// }
// const handleMouseLeave = () =>{
//     controlsTimeout = setTimeout(hideControls,3000)
// }






const 조회수 = () =>{
    const id = videoContainer.dataset.id
    const videoTime = Math.floor(video.duration*1000)
    const nowTime = Math.floor(video.currentTime*1000)
    const updateTime = videoTime-Math.floor(video.currentTime)
    controlsTimeout = setTimeout(()=>{
        $.ajax({
            type:"POST",
            url:`/api/video/${id}/view`,
            data:{id},
            dataType:"JSON",
        })
        console.log("조회수상승")
    },videoTime*0.9)
    //윈도우가 올랐을때
    $(document).on("submit", "form", function(event){
        window.onbeforeunload = null;
    });
    window.onbeforeunload = function (event) {
        clearTimeout(controlsTimeout)
    }    
}



video.addEventListener("canplay",조회수)
// playBtn.addEventListener("click",handlePlay)
// muteBtn.addEventListener("click",handleMute)
// volumRange.addEventListener("input",handleVolumeChange)
video.addEventListener("loadedmetadata",handleMetaData)
video.addEventListener("timeupdate",handleTimeUpdate)
timeline.addEventListener("input",handleTimeLineChange)
// fullScreenBtn.addEventListener("click",handleFullScreen)
// videoContainer.addEventListener("mousemove",handleMouseMove)
// videoContainer.addEventListener("mouseleave",handleMouseLeave)
// bgClickPlay.addEventListener("click",    handlePlay)
// //mobile
// mobilePlayBtn.addEventListener("click",mobileHandlePlay)
// videoContainer.addEventListener("touchstart",handleMouseMove)
// videoContainer.addEventListener("touchend",handleMouseLeave)