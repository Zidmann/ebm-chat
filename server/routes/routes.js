var register=function (app,ctrl)
{
        app.get('/', function(req, res) {
             res.setHeader('Content-Type', 'text/plain');
             res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
        });

        app.get   ("/users", ctrl.user.get);
        app.post  ("/users", ctrl.user.get);
        app.put   ("/users", ctrl.user.get);
        app.delete("/users", ctrl.user.get);

        app.get   ("/users/:id", ctrl.user.get);
        app.post  ("/users/:id", ctrl.user.get);
        app.put   ("/users/:id", ctrl.user.get);
        app.delete("/users/:id", ctrl.user.get);

        app.get   ("/login/:door", ctrl.user.get);
        app.delete("/login",       ctrl.user.get);

        app.get   ("/rooms", ctrl.user.get);
        app.post  ("/rooms", ctrl.user.get);

        app.get   ("/rooms/:id", ctrl.user.get);
        app.put   ("/rooms/:id", ctrl.user.get);
        app.delete("/rooms/:id", ctrl.user.get);

        app.get   ("/file/:id", ctrl.user.get);
        app.post  ("/file/:id", ctrl.user.get);
        app.put   ("/file/:id", ctrl.user.get);
        app.delete("/file/:id", ctrl.user.get);

}


module.exports = 
{
  register: register
};

