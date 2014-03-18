var 	Room  = require('../models/room.js'),
	Err   = require('../utils/err.js'),
	_     = require('underscore'),
	u     = require('../utils/utils.js'),
	async = require('async');

//////////////////
//ROOM FUNCTIONS//
//////////////////

//GET ROOM FUNCTION
function getRoomInfos(req, res, next) {
	new Room(req.params.id, function(err, room) {
		if (err) return next(err);
	
		if (room.loaded) {
			res.json(200, room);
		}
		else next(new Err(404, 1102, "Le salon n'existe pas"));
	});
}

function getAll(req, res, next) {
	Room.getFromDb(function(err, t) {
		if (err) return next(err);
		var t = _.map(t, function(room) {
			return _.omit(room.obj(true));
		});
		res.json(200,t);
	});

}


//CREATE ROOM FUNCTION
function createRoom(req, res, next) {
	Room.getFromDb(function(err, t) {
		if (err) return next(err);
		var t = _.map(t, function(room) {
			return room;
		});
		res.json(200,t);
	});

	var room = new Room();

	if (req.body.libelle == null || req.body.owner == null)
	{
		return next(new Err(400, 1301, "Les paramètres envoyés ne sont pas complets"));
	}	

	room.id          = req.body.id;
	room.libelle     = req.body.libelle;
	room.owner       = req.body.owner;
	room.description = req.body.description;
	room.created     = req.body.created;
	room.updated     = req.body.updated;
	
	room.check(null, function(err, b) {
		if (err) return next(err);
		
		if (b) {
			room.save(function(err) {
				if (err) return next(err);
				
				room.check(null, function(err, b) {
					if (err) return next(err);
					if (b) return next(new Err(400, 1303, "Erreur lors de la création du salon"));
					res.json(200, _);
				});
			});
		}
		else {
			return next(new Err(400, 1302, "Le libelle choisi est déjà utilisé"));
		}
	});
}

//DELETE ROOM FUNCTION
function destroyRoom(req, res, next) {
	new Room(req.params.id, function(err, target) {
		if (err) return next(err);
		if (req.params.id == null || target.libelle == null) {
			return next(new Err(404, 1305, "Le salon n'existe pas"));
		}
		target.remove();
		res.send(200);
	});
}

module.exports.room = {
	getOne		: getRoomInfos,
	getAll		: getAll,

	create 		: createRoom,
	destroy		: destroyRoom
};
