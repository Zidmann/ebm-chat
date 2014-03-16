var http           = require('http');
var path           = require('path');
var fs             = require('fs');
var debug          = require('debug')('EBMChatServer');
var express        = require('express');
var lessMiddleware = require('less-middleware');
var _              = require('underscore');
var Err            = require('./utils/err.js');
var cas            = require('./lib/grand_master_cas/index.js');
var conf           = require('./conf.js');

// Global var containing database connections pool
db = null;
require('mongodb').MongoClient.connect(conf.mongo, function(err, myDb) {
        if (err) 
        {
                console.log('Could not connect to database');
        }
        else 
        {
                db = myDb;
                console.log('Established connection to database');
        }
});


// var
var server = null;

// Load controller
var ctrl = _.extend({},
  require('./controllers/user.js'),
  require('./controllers/login.js'),
  require('./controllers/file.js'),
  require('./controllers/room.js')
);

// Load cas
cas.configure(conf.cas);

function setup() 
{
    var app = express();

  // logs all requests
  app.use(express.logger());

  // indicate /public contains static files
  app.use(express["static"](__dirname + '/public'));

  // static files
  app.use('/', express.static(path.join(__dirname, '..', 'front', 'dist')));

  // activate favicon
  app.use(express.favicon(__dirname + '/public/favicon.ico')) 

  // change allow origin
  app.use('/api', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', conf.rootUrl);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.end();
    }
    next();
  });

  // launcher
  app.use(function(req, res, next) {
    if(req.url !== '/')
      return next();
    fs.readFile(path.join(__dirname, '..', 'front', 'dist', 'index_cached.html'), 'utf8', function(err, text) {
      if(err) {
        return debug(err);
      }
      res.send(text);
    });
  });
 
 // access to POST data
  app.use(express.bodyParser());

  // cookie support
  app.use(express.cookieParser());

  // session support
  app.use(express.session({secret: "J6kd8?YDéDB85éyèvip&"}));

    // Setting up database connections pool
    app.use(function(req, res, next) {
        if (db == null) return next(new Err(500, 1006, "Impossible de se connecter à la base de données"));
        else next();
    });

   // BEGIN APIs
    require('./routes/routes.js').register(app,ctrl,cas);


  // if no matching api
  app.use('/api', function(req, res, next) {
    next(new Err(404, 1004, "L'api n'existe pas"));
  });

    // error handler
    app.use(function(err, req, res, next) {
      var error = (err instanceof Error) ? err : new Error(err);
      res.statusCode = error.status || 400 + error.message;
      res.json({
        code   : error.code || 0,
        message: error.message,
        errors : error.errors
      });
    });

    return app;
}

function start(port, host, callback) 
{
    // init app
    var app = setup();

    // start server
    server = http.createServer(app);

    server.listen(port ? port : conf.http.port, host ? host : conf.http.host, function(err) 
    {
        if(err) 
        {
            return debug(err);
        }
        console.log('Starting server on ' + server.address().address + ':' + server.address().port);
        if(callback) 
        {
            callback();
        }

    });

}

function stop(callback) 
{
    server.close(callback);
    console.log('Stopping server');
}

module.exports = 
{
  setup: setup,
  start: start,
  stop : stop
};

