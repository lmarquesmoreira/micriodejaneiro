module.exports = function (app) {
	var mongoose = require('mongoose');
	var Schema = require('mongoose').Schema;
	//ObjectId = Schema.ObjectId;

	var _tipos = { USUARIO: 1, NOTICIA: 2};

	var usuario = Schema({
		nome: {type: String, require:true},
		email: {type: String, require: true},
		senha: {type: String, require: true }
	});

	var noticia = Schema({
		url: { type: String, require: true, unique: true}, 
		nome_usuario : {type: String, require: true} //FK para USUARIO
	});

	var _modelU = mongoose.model('usuarios', usuario);
	var _modelN = mongoose.model('noticias', noticia);

/////////////////////////////////////////////////////
/// Útil
////////
	// verifica se o json é nulo
	var verifica = function(obj){
		for(var x in obj){
			if(obj.hasOwnProperty(x))
				return false;
		}
		return true;
	}
/////////////////////////////////////////////////////

	var _criarNovo = function(){
		console.log("criando...");
		var u = new _modelU ({  nome: 'lucas',
								email: 'lmarquesmoreira@outlook.com',
								senha: 'lucas'});

		u.save(function(err){
			if(err) return console.error(err);
			console.log("usuario inserido com sucesso");
		});
	}

	var _existe = function(){
		_modelU.find(function(err, res){
			if(verifica(res)) _criarNovo();
		});
	}

	var _adicionarNoticia = function(obj){
		var n = new _modelN ({ url: obj.url, nome_usuario: obj.nome});
		n.save(function(err){
			if(err) return console.error(err);
			console.log("noticia inserida com sucesso");
		});
	}

	var _getListaAll = function(type, callback){
		if(type == 1)
		{
			_modelU.find(function(err, cursor){
						if(!err)
							cursor.forEach(function(data){
								callback.push(data);
							});
			});
		}
		if(type == 2)
		{
			_modelN.find(function(err, cursor){
				if(!err)
					cursor.forEach(function(data){
						console.log(data);
						callback.push(data);
					});
			});
		}
	}

	return {
		schema: Schema, 
		modelUsuario: _modelU,
		modelNoticia: _modelN,
		tipos: _tipos, 
		existe: _existe, 
		criar: _criarNovo,
		addNoticia: _adicionarNoticia, 
		getListaAll: _getListaAll
	}
}