
const logout = () => {
    $.ajax({
        type:"GET",
        url:"/user/logout",
        data:{},
        dataType:"JSON",
        success:function(res){
            if(res.ref){
                window.location.reload()
            }
        }
    })
}
function miniSerch(){
    const serchBar =  document.getElementsByClassName("header__div")[0] 
    const serchBtn =  document.getElementsByClassName("header__serchBtn1")[0]
    const serchLogo =  document.getElementsByClassName("header__logo")[0] 
    const serchtogle =  document.getElementsByClassName("header__togle_Item")[0] 
    serchBar?.classList.toggle('active')
    serchBtn?.classList.toggle('active')
    serchLogo?.classList.toggle('active')
    serchtogle?.classList.toggle('active')
}

const subscribe = () => {
    const nickname = document.getElementsByClassName("owner_item1")[0].textContent
    const userNickname = document.getElementById("header__avatar")?.dataset.id
    console.log(userNickname)
    const btn = document.getElementsByClassName("watch__Btn")[0]
    console.log(document.getElementsByClassName("watch__Btn")[0])
    if(btn.textContent==="구독"){
        $.ajax({
            type:"POST",
            url: "/user/subscribe",
            data:{nickname,userNickname},
            dataType:"JSON",
            success:function(response){
                console.log(response)
                location.reload()                
            }
        })
    }else{
        $.ajax({
            type:"POST",
            url: "/user/subscribe",
            data:{nickname,userNickname,subscribeing:true},
            dataType:"JSON",
            success:function(response){
                console.log(response)
                location.reload()                
            }
        })
    }

}