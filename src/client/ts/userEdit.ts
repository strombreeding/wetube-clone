import { QueryOptions } from "mongoose";
import jQuery from "jquery";
const imgChange = document.getElementById("avatar") as QueryOptions;
const form = document.getElementById("zz") as HTMLFormElement;
const img = document.getElementById("host__img") as HTMLImageElement ;
console.log(form)

const changeImg = () =>{
    const formData = new FormData(form)
    console.log(formData)
    $.ajax({
        type:"POST",
        url:`/api/avatarUrl/save`,
        data:formData,
        dataType:"JSON",
        processData:false,
        contentType:false,
        success : (response)=>{
            console.log(response.path)
            img.src=`/${response.path}`
        }
    })
}

imgChange.addEventListener("change",changeImg)