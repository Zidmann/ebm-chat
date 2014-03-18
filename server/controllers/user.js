var 	User  = require('../models/user.js'),
	Err   = require('../utils/err.js'),
	_     = require('underscore'),
	u     = require('../utils/utils.js'),
	async = require('async');

//GET USER FUNCTIONS
function getUserInfos(req, res, next) {
	new User(req.params.id, function(err, user) {
		if (err) return next(err);
	
		if (user.loaded) {
			res.json(200, _.omit(user.obj(true), 'pass', 'isAdmin', 'created', 'updated'));
		}
		else next(new Err(404, 1102, "L'utilisateur n'existe pas"));
	});
}

function getAll(req, res, next) {
	User.getFromDb(function(err, t) {
		if (err) return next(err);
		var t = _.map(t, function(user) {
			return _.omit(user.obj(true), 'pass', 'isAdmin');
		});
		res.json(200,t);
	});
}

//CREATE USER FUNCTIONS
function signup(req, res, next) {
	var user = new User();

	if (req.body.login == null || req.body.pass == null || req.body.firstName == null || req.body.lastName == null || req.body.mail == null)
	{
		return next(new Err(400, 1301, "Les paramètres envoyés ne sont pas complets"));
	}	

	user.login     = req.body.login;
	user.setPassword(req.body.pass);
        user.avatar    = req.body.avatar;
	user.civilite  = req.body.civilite;
	user.firstName = req.body.firstName;
	user.lastName  = req.body.lastName;
	user.setMail    (req.body.mail);
	user.setTel     (req.body.tel);
	
	user.check(null, function(err, b) {
		if (err) return next(err);
		
		if (b) {
			user.save(function(err) {
				if (err) return next(err);
				
				user.check(null, function(err, b) {
					if (err) return next(err);
					if (b) return next(new Err(400, 1303, "Erreur lors de la création du compte"));
					res.json(200, _.omit(user.obj(true), 'pass', 'isAdmin', 'created', 'updated'));
				});
			});
		}
		else {
			return next(new Err(400, 1302, "Le login choisi est déjà utilisé"));
		}
	});
}

//DELETE USER FUNCTIONS 
function deleteUser(req, res, next) {
	new User(req.params.id, function(err, target) {
		if (err) return next(err);
		if (req.params.id == null || target.firstName == null) {
			return next(new Err(404, 1305, "L'utilisateur n'existe pas"));
		}
		target.remove();
		res.send(200);
	});
}

module.exports.user = {
	getOne		: 	getUserInfos,
	getAll		: 	getAll,
        signup          :       signup,
        destroy 	: 	deleteUser
};
