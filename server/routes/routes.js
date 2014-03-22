var _    = require('underscore');

// Load controller
var ctrl = _.extend({}, require('../controllers/user.js'),
			require('../controllers/login.js'),
			require('../controllers/file.js'),
			require('../controllers/room.js'),
			require('../controllers/msg.js'));


var register=function (app, cas)
{
// START API DEFINITION
    //User APIs
    app.get   ("/api/users",       ctrl.user.getAll);   	      	//PRIVATE          //Get user list
    app.get   ("/api/users/:id",   ctrl.user.getOne);	          	//PRIVATE          //Get information on a specific user
    app.post  ("/api/users",       ctrl.user.signup);         		//PUBLIC           //Create a new user on database
    app.delete("/api/users/:id",   ctrl.user.destroy);	      		//PRIVATE          //Get information on a specific user

    //Login APIs
    app.get   ("/api/login/:token", ctrl.login.readToken);    		//PUBLIC           //Get UserId with token
    app.get   ("/api/cas",          cas.bouncer, ctrl.login.cas);	//PUBLIC           //Authentificate with ECLille CAS
    app.post  ("/api/login/:door",  ctrl.login.signin);	     		//PUBLIC           //Connect to chat server website through a door (Classical, Gmail, Facebook, CAS, ...) and return a token
    app.delete("/api/login/:token", ctrl.login.signout);     		//PRIVATE          //Disconnect from chat server website by removing the token
 
    //Room APIs
    app.get   ("/api/rooms",       ctrl.room.getAll);	      		//PRIVATE          //Get room list on the chat
    app.get   ("/api/rooms/:id",   ctrl.room.getOne);	      		//PRIVATE          //Get information on a specific room
    app.post  ("/api/rooms",       ctrl.room.create);	      		//PRIVATE          //Create a new room on the chat
    app.delete("/api/rooms/:id",   ctrl.room.destroy);	      		//PRIVATE	         //Destroy a specific room

    //Messages APIs
    app.get   ("/api/rooms/:room/msg",     ctrl.msg.getAll);  		//PRIVATE          //Get all messages in a room
    app.get   ("/api/rooms/:room/msg/:id", ctrl.msg.getOne);  		//PRIVATE          //Get one specific message in a room
    app.post  ("/api/rooms/:room/msg",     ctrl.msg.post);    		//PRIVATE          //Publish a message on a room
    app.delete("/api/rooms/:room/msg/:id", ctrl.msg.destroy); 		//PRIVATE          //Destroy a specific message in a room

    //File APIs
    //Note : To get a file just go to /files/<filename>
    app.post  ("/api/files",     ctrl.file.upload);	      		//PRIVATE          //Upload from user to server a file
    app.delete("/api/files/:id", ctrl.file.destroy);	      		//PRIVATE          //Delete a specific file
}


module.exports = 
{
  register: register
};

