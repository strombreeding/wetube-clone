$(document).ready(function () {
    const serchBar =  document.getElementsByClassName("header__div")[0] 
    const serchBtn =  document.getElementsByClassName("header__serchBtn1")[0]
    const serchLogo =  document.getElementsByClassName("header__logo")[0] 
    const serchtogle =  document.getElementsByClassName("header__togle_Item")[0] 
    serchBar?.classList.toggle('active')
    serchBtn?.classList.toggle('active')
    serchLogo?.classList.toggle('active')
    serchtogle?.classList.toggle('active')

});



