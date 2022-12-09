"use strict";
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = document.getElementById("commentText");
const repairBtn = document.getElementsByClassName("repair");
const reportBtn = document.getElementsByClassName("report");
const deleteBtn = document.getElementsByClassName("delete");
const video = videoContainer.dataset.id;
const handleSubmit = (e) => {
    e.preventDefault();
    const btn = form.childNodes[1];
    const text = textarea.value;
    const user = document.getElementsByClassName("header__avatar")[0];
    if (text.length >= 2) {
        $.ajax({
            type: "POST",
            url: `/api/videos/${video}/comment`,
            data: { text, user: user.dataset.id, video },
            success: (res) => {
                console.log(res);
                // div class cmtContainer data-id res.commentId
                //     div comment__box
                //     div
                const commentList = document.getElementById("commentList"); // 여기다가 prepend해줄것
                const cmtContainer = document.createElement("div");
                cmtContainer.className = "cmtContainer";
                cmtContainer.dataset.id = res.commentId;
                const comment__box = document.createElement("div");
                comment__box.className = "comment__box";
                const comment__box_a = document.createElement("a");
                comment__box_a.className = "mobile__search";
                const comment__box_a_img = document.createElement("img");
                comment__box_a_img.className = "search_avatar";
                comment__box_a_img.src = res.avatarUrl;
                comment__box_a.appendChild(comment__box_a_img);
                const comment__box_div = document.createElement("div");
                const comment__box_div_div1 = document.createElement("div");
                comment__box_div_div1.className = "search__meta";
                const comment__box_div_div1_a = document.createElement("a");
                comment__box_div_div1_a.href = `/user/${res.nickname}/userPlace`;
                comment__box_div_div1.appendChild(comment__box_div_div1_a);
                const comment__box_div_div1_a_small = document.createElement("small");
                comment__box_div_div1_a_small.textContent = `${res.nickname} ﹒ 방금 전`;
                comment__box_div_div1_a.appendChild(comment__box_div_div1_a_small);
                const comment__box_div_div2 = document.createElement("div");
                comment__box_div_div2.className = "comment__text";
                const comment__box_div_div2_p = document.createElement("p");
                comment__box_div_div2_p.textContent = res.text;
                comment__box_div_div2.appendChild(comment__box_div_div2_p);
                comment__box_div.appendChild(comment__box_div_div1);
                comment__box_div.appendChild(comment__box_div_div2);
                comment__box.appendChild(comment__box_a);
                comment__box.appendChild(comment__box_div);
                const dev = document.createElement("div");
                cmtContainer.appendChild(comment__box);
                commentList === null || commentList === void 0 ? void 0 : commentList.prepend(cmtContainer);
            }
        });
    }
    else {
        alert("2글자 이상 적어주세요.");
    }
    textarea.value = "";
};
const showCommentBtn = () => {
    const addCommentBtn = document.getElementById("addCommentBtn");
    if (textarea.value.length < 2) {
        addCommentBtn.className = "hidden";
    }
    else {
        addCommentBtn.className = "";
    }
};
textarea.addEventListener("input", showCommentBtn);
if (form) {
    form.addEventListener("submit", handleSubmit);
}
