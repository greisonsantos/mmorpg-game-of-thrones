function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoclient.close();
		});
	});
}

//recebe os dados do form do user e compara com os dados do db
UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray(function(err,result){
				console.log(result);
			
       //se o resultado for diferente de vazio crio a sessão
               if(result[0] !=undefined){

                  req.session.autorizado = true;  //inica a sessão
                  
                  req.session.usuario = result[0].usuario;  //inica a sessão
                  req.session.casa = result[0].casa;  //inica a sessão

               }
               if (req.session.autorizado){
                    res.redirect("jogo");
               }else{
               	  res.render("index",{validacao:{}});
               }
			// ou assim  collection.find(usuario);

		});
		mongoclient.close();
	});
		});

}

module.exports = function(){
	return UsuariosDAO;
}