
$(document).on("submit", "form", function(event){
        window.onbeforeunload = null;
});

window.onbeforeunload = function (event) {
    const email =String($(`input[name=userEmail]`).val());
	    $.ajax({
            type:"POST",
            url:"/api/sosial/exit",
            data:{email},
            dataType:"JSON",
            success:function(response){
                console.log(response)
            }
        })
    event.preventDefault();
    
}
