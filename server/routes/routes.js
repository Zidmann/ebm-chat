var register=function (app, ctrl, cas)
{

/*
 * START API DEFINITION
 */
//  Public APIs (do not require token to identificate)
    app.post  ("/api/users",       ctrl.user.getConnected);   	        //Create a new user on database
    app.post  ("/api/login/:door", ctrl.login.signin);		        //Connect to chat server website through a door (Classical, Gmail, Facebook, CAS, ...)

// Private APIs (require token to identificate user)
    app.delete("/api/login",       ctrl.login.signout);                 //Disconnect from chat server website

    app.get   ("/api/users",       ctrl.user.getConnected);   	        //Get user list
    app.get   ("/api/users/:id",   ctrl.user.get);		        //Get information on a specific user
    app.delete("/api/users/:id",   ctrl.user.get);		        //Get information on a specific user

    app.get   ("/api/rooms",     ctrl.room.get);		        //Get room list on the chat
    app.post  ("/api/rooms",     ctrl.room.create);		        //Create a new room on the chat
    app.get   ("/api/rooms/:id", ctrl.room.getMsg);		        //Get information and messages on a specific room
    app.post  ("/api/rooms/:id", ctrl.room.postMsg);		        //Write a message in a specifi room
    app.delete("/api/rooms/:id", ctrl.room.destroy);		        //Destroy a specific room

    //File Services
    //Note : To get a file just go to /files/<filename>
    app.post  ("/api/files",     ctrl.file.upload);		        //Upload from user to server a file
    app.delete("/api/files/:id", ctrl.file.destroy);		        //Delete a specific file

// Admin APIs (require token to identificate as administrator)

}


module.exports = 
{
  register: register
};

