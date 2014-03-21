var 	User  = require('../models/user.js'),
	Token = require('../models/token.js'),
	Err   = require('../utils/err.js'),
	_     = require('underscore'),
	u     = require('../utils/utils.js'),
	async = require('async'),
	jwt   = require('jwt-simple'),
	conf  = require('../conf.js');

//Generator of token
function generateToken(userId, res, next) {
    var token   = new Token();

    if (userId == null)
    {
	return next(new Err(400, 1301, "Les paramètres envoyés pour générer le token ne sont pas complets"));
    }	

    token.check(null, function(err, b) {
        if (err) return next(err);
        if (b) {
    	    token.save(function(err) {
		    if (err) return next(err);
    		    token.check(null, function(err, b) {
			if (err) return next(err);
				if (b) return next(new Err(400, 1303, "Erreur lors de la création du token"));
			});
		    });
	    token.updateToken(jwt.encode({id : token.id, userId: userId, random : this.token}, conf.secretToken));
	    res.json(200, _.omit(token.obj(true), 'lastActivity', 'loaded', 'id'));
        }
        else {
	    return next(new Err(400, 1302, "Le token généré est déjà utilisé"));
	}
    });
}

//Sign up with classic method : user, password
function signinClassic(req, res, next) {
	if (req.body.login == null || req.body.pass == null) {
		return next(new Err(400, 1002, "Les identifiants ne sont pas tous communiqués"));
	}
	
	var r = db.collection(conf.database.userCollection).find({login: req.body.login, pass: u.sha1(req.body.pass)}, {_id : 1});
	r.count(function(err, count) {
		if(err) return next(err);
		
		if(count != 1) return next(new Err(400, 1101, "Les identifiants sont incorrects"));
		
		r.nextObject(function(err, doc) {
			if (err) return next(err);
			generateToken(doc._id, res, next);
		});
	});
}

//Function to decrypt a token
function readToken(req, res, next) {
    var decoded = jwt.decode(req.params.token, conf.secretToken);
    res.json(200, decoded);
}

//Function to choose what method must be userd
function signin(req, res, next) {
	switch (req.params.door) {
		//Use Classical connection with login and password
		case "classic":
			signinClassic(req, res, next);
		break;

		//Use connection with RFID card
		case "rfid":
			return next(new Err(400, 1301, "La méthode d'accès n'est pas encore implémentée."));						
		break;

		//Use connection with Google API
		case "google":
			return next(new Err(400, 1301, "La méthode d'accès n'est pas encore implémentée."));						
		break;

		//Use connection with Twitter API
		case "facebook":
			return next(new Err(400, 1301, "La méthode d'accès n'est pas encore implémentée."));			
		break;

		//Case where connection door is unknown
		default: 
			return next(new Err(400, 1301, "La méthode d'accès est inconnue"));
		break;
	}
}

//Function to remove token
function signout(req, res, next) {
    var decoded = jwt.decode(req.params.token, conf.secretToken);
    if(decoded==null)
    {
	return next(new Err(404, 1305, "Le token est mal défini"));
    }
    else
    {
        new Token(decoded.id, function(err, target) {
    	    if (err) return next(err);
	    if (target.token==null) {
		return next(new Err(404, 1305, "Le token n'existe pas"));
	    }
	    target.remove();
	    res.send(200);
        });
    }
}

module.exports.login = {
        signin          :       signin,
        signout         :       signout,
	readToken	:	readToken
};

