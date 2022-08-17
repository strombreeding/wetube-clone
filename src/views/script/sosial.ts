
$(document).on("submit", "form", function(event){
        window.onbeforeunload = null;
});

window.onbeforeunload = function (event) {
    const email =String($(`span[name=userEmail]`).text());
	    $.ajax({
            type:"POST",
            url:"/user/sosial/exit",
            data:{email},
            dataType:"JSON",
            success:function(response){
                console.log(response)
            }
        })
    event.preventDefault();
    
}
