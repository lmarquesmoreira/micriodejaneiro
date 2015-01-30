module.exports = function(app){
	
	//resgata a instancia do controller
	var home = app.controllers.home;

	//define as requisições e as respectivas chamadas para o controller.
	app.get('/', home.index);
}; 