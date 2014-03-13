var register=function (app,ctrl)
{
	app.get("/users",ctrl.user.get);
        app.get('/', function(req, res) {
             res.setHeader('Content-Type', 'text/plain');
             res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
        });
}


module.exports = 
{
  register: register
};

