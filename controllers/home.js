//var Usuario = require('../models/user.js');

module.exports = function(app){

	var Usuario = app.models.user;

	// define o controller e suas respectivas chamadas
	var HomeController = {

		// GET
		index: function(req, res){

			var _mNoticias = [];
			Usuario.getListaAll(Usuario.tipos.NOTICIA, _mNoticias);
			
			res.render('home/index', {title: 'Microsoft Inovation Center', noticias : _mNoticias});
		},

		//GET
		login: function(req, res){
			
			if(req.session && req.session.usuario)
				res.redirect('/admin');	
			else
				res.render('home/login', {title:'Login'});
		}, 

		//POST
		doLogin: function(req, res){
			var query = {email: req.body.email, senha: req.body.pwd};

			Usuario.existe();

			Usuario.modelUsuario.findOne(query).select('email').exec(
				function(err, usuario){
					if(usuario){
						req.session.usuario = usuario;
						res.redirect('/admin');
						console.log('usuario autenticado');
					}else{
						console.log('usuario nao autenticado');
					}
				});
		},

		doLoginCreate: function(req, res){
			console.log('here');
			console.log(req.body.email);
			res.end(JSON.stringify("{msg: 'ok'}"));
		}
	};

	return HomeController;
};