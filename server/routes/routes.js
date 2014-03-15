var register=function (app,ctrl,cas)
{

/* *
   * START API DEFINITION
   */
//  Public APIs
    app.get   ('/api/cas',         cas.bouncer, ctrl.login.cas);	//Connect with ECLille CAS system

    app.get   ("/api/login",       ctrl.user.get);		//Get current user information
    app.post  ("/api/login/:door", ctrl.login.signin);		//Connect to chat server website through a door (Classical, Gmail, Facebook, CAS, ...)
    app.delete("/api/login",       ctrl.login.signout);		//Disconnect from chat server website

// Private APIs (for classic client)
    app.put   ("/api/login",       ctrl.user.update);   	//Update user account parameters

    app.get   ("/api/users",       ctrl.user.getConnected);   	//Get connected user information list
    app.get   ("/api/users/:id",   ctrl.user.get);		//Get information on a specific user

    app.get   ("/api/rooms",     ctrl.room.get);		//Get room list on the chat
    app.post  ("/api/rooms",     ctrl.room.create);		//Create a new room on the chat
    app.get   ("/api/rooms/:id", ctrl.room.getMsg);		//Get information and messages on a specific room
    app.put   ("/api/rooms/:id", ctrl.room.postMsg);		//Write a message in a specifi room
    app.delete("/api/rooms/:id", ctrl.room.destroy);		//Destroy a specific room

    app.get   ("/api/files/:id", ctrl.file.download);		//Download from server to user a specific file
    app.post  ("/api/files/",    ctrl.file.upload);		//Upload from user to server a file
    app.put   ("/api/files/:id", ctrl.file.update);		//Update a file on the server
    app.delete("/api/files/:id", ctrl.file.destroy);		//Delete a specific file

// Admin APIs

}


module.exports = 
{
  register: register
};

