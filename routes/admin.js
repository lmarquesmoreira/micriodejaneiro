module.exports = function(app){
	
	//resgata a instancia do controller
	var autenticator = require('../middleware/autenticator');
	var admin = app.controllers.admin;

	//define as requisições e as respectivas chamadas para o controller.
	app.get('/admin', autenticator, admin.index);
	app.post('/admin', autenticator, admin.create);
	app.get('/admin/sair', autenticator, admin.sair);
}; 