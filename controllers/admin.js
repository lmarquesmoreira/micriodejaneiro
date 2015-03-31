
module.exports = function(app){

	var Usuario = app.models.user;

	// define o controller e suas respectivas chamadas
	var AdminController = {

		// GET
		index: function(req, res){
			Usuario.existe();
			
			var _mUsuarios =  [] ;
			Usuario.getListaAll(Usuario.tipos.USUARIO, _mUsuarios);

			var _mNoticias = [];
			Usuario.getListaAll(Usuario.tipos.NOTICIA, _mNoticias);

			Usuario.modelUsuario.find(function(err, us){
				res.render('admin/index', {title: 'Microsoft Inovation Center', u: { user : _mUsuarios, noticia: _mNoticias }});
			});
		}, 

		create: function(req, res){
			console.log("criando...");
			var noticia = {url : req.body.url, nome: req.body.nome};
			Usuario.addNoticia(noticia);
			res.end();
		},

		// GET
		sair: function(req, res){
			//console.log("saindo");
			req.session.destroy();
			res.redirect('/login');
		}
	};

	return AdminController;
};