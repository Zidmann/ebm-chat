var 	Room  = require('../models/room.js'),
	Msg   = require('../models/msg.js'),
	Err   = require('../utils/err.js'),
	_     = require('underscore'),
	u     = require('../utils/utils.js'),
	async = require('async');

//////////////////
//MSG FUNCTIONS //
//////////////////

//GET MSG FUNCTION
//Note : First check if room exist
function getMsgInfos(req, res, next) {
	new Msg(req.params.id, function(err, msg) {
		if (err) return next(err);
	
		if (msg.loaded) {
			res.json(200, msg);
		}
		else next(new Err(404, 1102, "Le message n'existe pas"));
	});
}

function getAll(req, res, next) {
	Msg.getFromDb(req.params.room, function(err, t) {
		if (err) return next(err);
		var t = _.map(t, function(msg) {
			return _.omit(msg.obj(true));
		});
		res.json(200,t);
	});

}


//CREATE MSG FUNCTION
//Note : First check if room exist
function publishMsg(req, res, next) {
	var msg = new Msg();

	if (req.params.room == null || req.body.txt == null || req.body.creator == null)
	{
		return next(new Err(400, 1301, "Les paramètres envoyés ne sont pas complets"));
	}

	msg.room    = u.ObjectID(req.params.room);
	msg.txt     = req.body.txt;
	msg.file    = req.body.file;
	msg.creator = u.ObjectID(req.body.creator);
	msg.created = req.body.created;
	msg.updated = req.body.updated;

	msg.check(null, function(err, b) {
		if (err) return next(err);
		
		if (b) {
			msg.save(function(err) {
				if (err) return next(err);
				
				msg.check(null, function(err, b) {
					if (err) return next(err);
					if (b) return next(new Err(400, 1303, "Erreur lors de la création du message"));
					res.json(200, msg.obj(true));
				});
			});
		}
		else {
			return next(new Err(400, 1302, "La clé est déjà utilisée"));
		}
	});
}

//DELETE MSG FUNCTION
//Note : First check if room exist
function destroyMsg(req, res, next) {
	new Msg(req.params.id, function(err, target) {
		if (err) return next(err);
		if (req.params.id == null) {
			return next(new Err(404, 1305, "Le message n'existe pas"));
		}
		target.remove();
		res.send(200);
	});
}


module.exports.msg = {
	getOne 		: getMsgInfos,
	getAll 		: getAll,
	post		: publishMsg,
	destroy		: destroyMsg
};
