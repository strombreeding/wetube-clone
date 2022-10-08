"use strict";
$(document).ready(function () {
    const serchBar = document.getElementsByClassName("header__div")[0];
    const serchBtn = document.getElementsByClassName("header__serchBtn1")[0];
    const serchLogo = document.getElementsByClassName("header__logo")[0];
    const serchtogle = document.getElementsByClassName("header__togle_Item")[0];
    serchBar === null || serchBar === void 0 ? void 0 : serchBar.classList.toggle('active');
    serchBtn === null || serchBtn === void 0 ? void 0 : serchBtn.classList.toggle('active');
    serchLogo === null || serchLogo === void 0 ? void 0 : serchLogo.classList.toggle('active');
    serchtogle === null || serchtogle === void 0 ? void 0 : serchtogle.classList.toggle('active');
});
