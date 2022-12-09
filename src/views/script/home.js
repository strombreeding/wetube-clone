"use strict";
const logout = () => {
    $.ajax({
        type: "GET",
        url: "/user/logout",
        data: {},
        dataType: "JSON",
        success: function (res) {
            if (res.ref) {
                window.location.reload();
            }
        }
    });
};
function miniSerch() {
    const serchBar = document.getElementsByClassName("header__div")[0];
    const serchBtn = document.getElementsByClassName("header__serchBtn1")[0];
    const serchLogo = document.getElementsByClassName("header__logo")[0];
    const serchtogle = document.getElementsByClassName("header__togle_Item")[0];
    serchBar === null || serchBar === void 0 ? void 0 : serchBar.classList.toggle('active');
    serchBtn === null || serchBtn === void 0 ? void 0 : serchBtn.classList.toggle('active');
    serchLogo === null || serchLogo === void 0 ? void 0 : serchLogo.classList.toggle('active');
    serchtogle === null || serchtogle === void 0 ? void 0 : serchtogle.classList.toggle('active');
}
function deleteCmt(id) {
    if (confirm("댓글을 삭제하시겠습니까?")) {
        $.ajax({
            type: "delete",
            url: `/api/comment/edit`,
            data: { id },
            success: (res) => {
                console.log(res);
                window.location.reload();
            }
        });
    }
}
function editCmt(id) {
    const val = document.getElementById(id);
    if (val) {
        const edit = prompt("수정할 내용을 입력후 확인을 눌러주세요.", val === null || val === void 0 ? void 0 : val.className);
        if (edit) {
            $.ajax({
                type: "post",
                url: `/api/comment/edit`,
                data: { edit, id },
                success: function (res) {
                    window.location.reload();
                }
            });
        }
    }
}
const subscribe = () => {
    var _a;
    const nickname = document.getElementsByClassName("owner_item1")[0].textContent;
    const userNickname = (_a = document.getElementById("header__avatar")) === null || _a === void 0 ? void 0 : _a.dataset.id;
    console.log(userNickname);
    const btn = document.getElementsByClassName("watch__Btn")[0];
    console.log(document.getElementsByClassName("watch__Btn")[0]);
    if (btn.textContent === "구독") {
        $.ajax({
            type: "POST",
            url: "/user/subscribe",
            data: { nickname, userNickname },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                location.reload();
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "/user/subscribe",
            data: { nickname, userNickname, subscribeing: true },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                location.reload();
            }
        });
    }
};
