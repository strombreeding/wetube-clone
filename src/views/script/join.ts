let successPw =false;
let successEmail = false;
let successName = false;
function showBtn () {
    if(successEmail&&successName&&successPw){
        return $("input[name=join]").removeClass("hidden")
    }else{
        return $("input[name=join]").addClass("hidden")
    }

}
function comparePw () {
    let pw = String($(`input[name=password1]`).val());
    let pw2 = String($(`input[name=password2]`).val());
    console.log(pw,pw2)
    const str = /[a-zA-Z]/g;
    const num = /[0-9]/g;
    const empty = /[\s]/g;
    const specialN = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let specialInPw = specialN.test(pw) === true;
    let wordInPw = str.test(pw) === true;
    let numInPw = num.test(pw) === true;
    if( empty.test(pw) === true){
        console.log("공백 오류")
        return $("small[name=check]").text("❌  비밀번호에 공백이 들어가면 안돼요!")  
    }
    if(!specialInPw){
        console.log("특수문자 미입력")
        return $("small[name=check]").text("❌  비밀번호에 특수문자가 들어가 있지 않습니다.")  
    }
    if(!wordInPw){
        console.log("문자 미입력")
        return $("small[name=check]").text("❌  비밀번호에 문자가 들어가 있지 않습니다.")  
    }
    if(!numInPw){
        console.log("숫자 미입력")
        return $("small[name=check]").text("❌  비밀번호에 숫자가 들어가 있지 않습니다.")  
    }
    if(!(numInPw&&specialInPw&&wordInPw)){
        console.log("조합 부적합")
        return $("small[name=check]").text("❌  특수문자와 문자,숫자를 포함한 비밀번호를 적어주세요.")  
    }
    if(pw!==pw2){
        console.log("비번 안일치")
        return  $("small[name=check]").text("❌  비밀번호가 일치하지 않습니다.")  
    }else if(pw===pw2){
        $("small[name=check]").text("✅ 비밀번호 일치!")  
        successPw = true
        showBtn()
    }
}
function emailCheck(){
    if(String($(`input[name=email]`).val())===""){
        $(`small[name=smallEmail]`).text("인증번호가 이메일로 전송됩니다.")
    }else{
        let email = String($(`input[name=email]`).val());
        console.log(email);
        email = email.replace(/(\s*)/g , "");
        console.log(typeof(email));
        $.ajax({
            type:"POST",
            url:"/check/email",
            data:{email},
            dataType:"JSON",
            success:function(response){
                console.log(response.user);
                console.log(response.msg);
                console.log(response.boolean);
                if (response.msg === "✅ 이 이메일은 사용 가능합니다."){
                    $(`small[name=smallEmail]`).text(`${response.msg}`)
                    successEmail = true
                    return showBtn()
                }else{
                    $(`small[name=smallEmail]`).text(`${response.msg}`)
                    successEmail = false
                    showBtn()
                }
                
            }
        })
    }


}
function nameCheck(){
    const empty = /[\s*]/g;
    if(String($(`input[name=nickname]`).val())===""){
        $(`small[name=smallName]`).text("로그인에 사용되거나, 불리우게 될 이름입니다.")
    }else{
        let name = String($(`input[name=username]`).val());
        if( empty.test(name) === true){
            console.log("공백 오류")
            successName = false
            $("small[name=smallName]").text("❌ 닉네임에 공백이 들어가면 안돼요!")  
            return showBtn()
        }
        $.ajax({
            type:"POST",
            url:"/check/name",
            data:{name},
            dataType:"JSON",
            success:function(response){
                if(response.msg ==="❌ 이미 존재하는 닉네임입니다."){
                    successName = false
                    $(`small[name=smallName`).text(`${response.msg}`)
                    return showBtn()
                }
                console.log(response.user)
                console.log(response.msg)
                console.log(response.boolean)
                $(`small[name=smallName`).text(`${response.msg}`)
                successName = true
                showBtn()
            }
        })
    }


}

// $.ajax({
//     url: "/join",
//     type: "POST",
//     data : {},
//     success : function(){

//     }
// });
