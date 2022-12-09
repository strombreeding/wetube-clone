"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imgChange = document.getElementById("avatar");
const form = document.getElementById("zz");
const img = document.getElementById("host__img");
console.log(form);
const changeImg = () => {
    const formData = new FormData(form);
    console.log(formData);
    $.ajax({
        type: "POST",
        url: `/api/avatarUrl/save`,
        data: formData,
        dataType: "JSON",
        processData: false,
        contentType: false,
        success: (response) => {
            console.log(response.path);
            img.src = `/${response.path}`;
        }
    });
};
imgChange.addEventListener("change", changeImg);
