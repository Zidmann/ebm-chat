module.exports = {
    http   : 
    {
      host: '0.0.0.0',
      port: 8080
    },
    rootUrl: 'http://82.230.128.180:8080',
    //TODO : Adapt configuration for our website
    cas    : 
    {
        casHost      : "cas.ec-lille.fr",                           // required
        casPath      : "/",                                         // your cas login route (defaults to "/cas")
        ssl          : true,                                        // is the cas url https? defaults to false
        port         : 443,                                         // defaults to 80 if ssl false, 443 if ssl true
        service      : "http://82.230.128.180:8080/api/cas",        // your site
        sessionName  : "cas_user",                                  // the cas user_name will be at req.session.cas_user (this is the default)
        renew        : false,                                       // true or false, false is the default
        gateway      : false,                                       // true or false, false is the default
        redirectUrl  : 'http://82.230.128.180:8080/',               // the route that cas.blocker will send to if not authed. Defaults to '/'
	connectedURL : 'http://82.230.128.180:8080/',
	createUserUrl: 'http://82.230.128.180:8080/'
    },
    mongo  : 'mongodb://localhost:27017/ebmChat',
    secretToken   : "d2s42dggjfqlry6Jfs9shrgrxjthty",
    secretSession : "J6kd8?YDéDB85éyèvip&",
    database :
    {
        name            : "ebmChat",
        userCollection  : "users",
	cardCollection  : "users.card",
        tokenCollection : "users.token",
        roomCollection  : "rooms",
        msgsCollection  : "rooms.messages"
    }
} 
