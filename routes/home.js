module.exports = function(app){
	
	//resgata a instancia do controller
	var home = app.controllers.home;

	//define as requisições e as respectivas chamadas para o controller.
	app.get('/', home.index);
	app.get('/login', home.login);
	app.post('/login', home.doLogin);
	app.post('/login/create', home.doLoginCreate);
}; 