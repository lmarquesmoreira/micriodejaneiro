$(document).ready(function () {
	$('#formAddNoticia').submit(function(){
		var dados = "url=" + $("#addNoticiaUrl").val() + "&nome=" + $(".btn-usuario").text().replace(/\s+/g,'');
		$.ajax({
			type: "POST", 
			url: "/admin",
			data: dados, 
			dataType: 'json', 
			success: function(data){
				console.log(data);
				alert("adicionado com sucesso...");
			}, 
			error: function (err) {
				console.log(err);
			}, 
			complete : function(){
				console.log("completado");
			}
		});
		return false;
	});
});