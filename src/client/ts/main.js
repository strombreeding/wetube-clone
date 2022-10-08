"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../scss/styles.scss");
console.log("zzz");
//@media 반응형 헤더
const togle = document.getElementsByClassName("mobile__profile")[0];
const togleItem = document.getElementsByClassName("mobile__togle_Item")[0];
if (togle) {
    togle.addEventListener("click", () => { togleItem.classList.toggle('active'); });
}
