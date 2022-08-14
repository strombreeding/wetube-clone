"use strict";
function comparePw() {
    let pw = String($(`input[name=password1]`).val());
    let pw2 = String($(`input[name=password2]`).val());
    console.log(pw, pw2);
    const str = /[a-zA-Z]/g;
    const num = /[0-9]/g;
    const empty = /[\s]/g;
    const specialN = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let specialInPw = specialN.test(pw) === true;
    let wordInPw = str.test(pw) === true;
    let numInPw = num.test(pw) === true;
    if (empty.test(pw) === true) {
        console.log("공백 오류");
        return $("small[name=check]").text("❌ 에러 : 비밀번호에 공백이 들어가면 안돼요!");
    }
    if (!specialInPw) {
        console.log("특수문자 미입력");
        return $("small[name=check]").text("❌ 에러 : 비밀번호에 특수문자가 들어가 있지 않습니다.");
    }
    if (!wordInPw) {
        console.log("문자 미입력");
        return $("small[name=check]").text("❌ 에러 : 비밀번호에 문자가 들어가 있지 않습니다.");
    }
    if (!numInPw) {
        console.log("숫자 미입력");
        return $("small[name=check]").text("❌ 에러 : 비밀번호에 숫자가 들어가 있지 않습니다.");
    }
    if (!(numInPw && specialInPw && wordInPw)) {
        console.log("조합 부적합");
        return $("small[name=check]").text("❌ 에러 : 특수문자와 문자,숫자를 포함한 비밀번호를 적어주세요.");
    }
    if (pw !== pw2) {
        console.log("비번 안일치");
        return $("small[name=check]").text("❌ 에러 : 비밀번호가 일치하지 않습니다.");
    }
    else if (pw === pw2) {
        $("small[name=check]").text("✅ 비밀번호 일치!");
    }
    return $("input[name=join]").removeClass("hidden");
}
// $.ajax({
//     url: "/join",
//     type: "POST",
//     data : {},
//     success : function(){
//     }
// });
