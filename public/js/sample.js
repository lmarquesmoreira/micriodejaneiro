$(function () {
	$('#btnsalvar').click(function(){

		//validate

		var dataString = "email=tiago@lucas.com";

		$.ajax({
			type: "POST", 
			url: "login/create", 
			data: dataString, 
			success: function(){
				alert(" >> dados enviados com sucesso");
			},
			complete: function(){
				alert("completado");
			}

		});


	});
});

//http://code.tutsplus.com/tutorials/submit-a-form-without-page-refresh-using-jquery--net-59