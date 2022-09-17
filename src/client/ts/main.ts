import "../scss/styles.scss"

console.log("zzz")
//@media 반응형 헤더
const togle = document.getElementsByClassName("mobile__profile")[0] as HTMLElement
const togleItem =  document.getElementsByClassName("mobile__togle_Item")[0] as HTMLElement



togle.addEventListener("click",()=>{togleItem.classList.toggle('active')})