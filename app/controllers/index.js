module.exports.index = function(application, req, res){
	res.render('index', {validacao:{}});
}

module.exports.autenticar = function(application, req, res){

  var dadosForm = req.body;

  req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
  req.assert('senha', 'senha não pode ser vazio').notEmpty();

  var erros= req.validationErrors();

  if (erros){
  	res.render("index", {validacao: erros});
  	return;
   }

   // autenticar user 
   // recupera a coneccção e passa como paramentro para o metodo de autenticação
   var connection = application.config.dbConnection;
   var UsuariosDAO= new application.app.models.UsuariosDAO(connection);
   
   UsuariosDAO.autenticar(dadosForm, req, res);

	//res.send('Tudop Ok para cadastrar');
}