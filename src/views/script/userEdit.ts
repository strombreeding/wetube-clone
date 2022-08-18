function nicknameCheck(){
    const empty = /[\s*]/g;
    if(String($(`input[name=nickname]`).val())===""){
        $(`small[name=smallName]`).text("로그인에 사용되거나, 불리우게 될 이름입니다.")
    }else{
        let nickname = String($(`input[name=nickname]`).val());
        if( empty.test(nickname) === true){
            console.log("공백 오류")
            successName = false
            $("small[name=smallName]").text("❌ 닉네임에 공백이 들어가면 안돼요!")  
            return checkInfo()
        }
        $.ajax({
            type:"POST",
            url:"/check/name",
            data:{nickname},
            dataType:"JSON",
            success:function(response){
                if(response.msg ==="❌ 이미 존재하는 닉네임입니다."){
                    successName = false
                    $(`small[name=smallName`).text(`${response.msg}`)
                    return checkInfo()
                }
                console.log(response.user)
                console.log(response.msg)
                console.log(response.boolean)
                $(`small[name=smallName`).text(`${response.msg}`)
                successName = true
                checkInfo()
            }
        })
    }


}
function checkInfo () {
    if(successName){
        return $("input[name=join]").removeClass("hidden")
    }else{
        return $("input[name=join]").addClass("hidden")
    }

}