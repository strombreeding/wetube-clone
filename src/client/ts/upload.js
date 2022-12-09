"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video = document.querySelector("video");
const preVideo = document.getElementById("video");
const form = document.getElementById("zz");
const videoBox = document.getElementById("videoContatiner");
const pc__uploadTogle = document.getElementsByClassName("pc__uploadTogle")[0];
console.log(preVideo);
const preView = () => {
    video.src = `/#t=0.5`;
    console.log("바뀌는거감지");
    const formData = new FormData(form);
    console.log(formData);
    $.ajax({
        type: "POST",
        url: `/api/preview/save`,
        data: formData,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: (response) => {
            var _a;
            videoBox.className = `upload_video`;
            video.src = `/${response.path}#t=0.5`;
            console.log(preVideo.src);
            console.log(response.path);
            let a = (_a = document.getElementById("lavel")) === null || _a === void 0 ? void 0 : _a.className;
            a = "hidden";
            // pc__uploadTogle.className="hidden"
        }
    });
};
preVideo.addEventListener("change", preView);
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
