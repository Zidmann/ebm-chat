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
    app.get   ("/api/users",       ctrl.user.getAll);  	                //Get user list
    app.get   ("/api/users/:id",   ctrl.user.getOne);		        //Get information on a specific user
    app.post  ("/api/users",       ctrl.user.signup);   	        //Create a new user on database
    app.delete("/api/users/:id",   ctrl.user.destroy);		        //Get information on a specific user

    //Login APIs
    app.get  ("/api/login/:door", ctrl.login.signin);		        //Connect to chat server website through a door (Classical, Gmail, Facebook, CAS, ...)
    app.delete("/api/login",       ctrl.login.signout);                 //Disconnect from chat server website

    //Room APIs
    app.get   ("/api/rooms",       ctrl.room.getAll);		        //Get room list on the chat
    app.get   ("/api/rooms/:id",   ctrl.room.getOne);		        //Get information on a specific room
    app.post  ("/api/rooms",       ctrl.room.create);		        //Create a new room on the chat
    app.delete("/api/rooms/:id",   ctrl.room.destroy);		        //Destroy a specific room

    //Messages APIs
    app.get   ("/api/rooms/:room/msg",     ctrl.msg.getAll);		//Get all messages in a room
    app.get   ("/api/rooms/:room/msg/:id", ctrl.msg.getOne);		//Get one specific message in a room
    app.post  ("/api/rooms/:room/msg",     ctrl.msg.post);		//Publish a message on a room
    app.delete("/api/rooms/:room/msg/:id", ctrl.msg.destroy);		//Destroy a specific message in a room

    //File APIs
    //Note : To get a file just go to /files/<filename>
    app.post  ("/api/files",     ctrl.file.upload);		        //Upload from user to server a file
    app.delete("/api/files/:id", ctrl.file.destroy);		        //Delete a specific file
}


module.exports = 
{
  register: register
};

