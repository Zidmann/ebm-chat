module.exports = {
    http   : 
    {
      host: 'localhost',
      port: 8080
    },
    rootUrl: 'http://www.monsite.fr',
    //TODO : Adapt configuration for our website
    cas    : 
    {
        casHost      : "cas.ec-lille.fr",                      // required
        casPath      : "/",                                    // your cas login route (defaults to "/cas")
        ssl          : true,                                   // is the cas url https? defaults to false
        port         : 443,                                    // defaults to 80 if ssl false, 443 if ssl true
        service      : "http://www.monsite.fr/api/login/cas",  // your site
        sessionName  : "cas_user",                             // the cas user_name will be at req.session.cas_user (this is the default)
        renew        : false,                                  // true or false, false is the default
        gateway      : false,                                  // true or false, false is the default
        redirectUrl  : 'http://www.monsite.fr',                // the route that cas.blocker will send to if not authed. Defaults to '/'
        connectedURL : 'http://www.monsite.fr/#/home',
        createUserUrl: 'http://www.monsite.fr/#/user/create'
    },
    mongo  : 'mongodb://localhost:27017/ebmChat',
    secretToken   : "d2s42dggjfqlry6Jfs9shrgrxjthty",
    secretSession : "J6kd8?YDéDB85éyèvip&",
    database :
    {
        name            : "ebmChat",
        userCollection  : "users",
        tokenCollection : "users.token",
        roomCollection  : "rooms",
        msgsCollection  : "rooms.messages"
    }
} 
