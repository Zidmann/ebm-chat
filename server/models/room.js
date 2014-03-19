var u        = require('../utils/utils.js'),
    List     = require('./list.js'),
    ObjectDB = require('./objectdb.js'),
    _        = require('underscore'),
    async    = require('async'),
    conf     = require('../conf.js');

function Room(id, callback, obj) {
	id = (typeof id === 'string' && id.length == 24) ? u.ObjectID(id) : id;
	
	this.id          = id;
	this.libelle     = null;
	this.owner       = null;
	this.description = null;
	this.created     = new Date();
	this.updated     = null;
	
	// Object properties
	this.loaded = false;
	
	if (obj) {
		this.fromObj(obj);
		this.loaded = true;
	}
	
	if (id != null && !this.loaded) this.fetch(callback);
	else if (callback) callback(null, this);
};

Room.prototype = new ObjectDB(conf.database.name, conf.database.roomCollection);

Room.getFromDb = function(callback) {
	var t = null;
	db.collection(conf.database.roomCollection).find({}).toArray(function(err, t) {
		async.map(t, function(e, done) {
			new Room(e._id, done, e);
		}, callback);
	});
}

Room.prototype.toString = function() {
	return this.libelle;
};

Room.prototype.fromObj = function(obj) {
	this.libelle     = obj.libelle;
	this.owner       = obj.owner;
	this.description = obj.description;
	this.created     = obj.created;
	this.updated     = obj.updated;
};

Room.prototype.obj = function(id) {
	var o = {
		libelle    : this.libelle,
		owner      : this.owner,
                description: this.description,
                created    : this.created,
		updated    : this.updated
	};
	if (id) o.id = this.id;
	return o;
};

Room.prototype.remove = function() {
	var room = this;
	db.collection(conf.database.roomCollection).remove({ _id  : room.id }, {w : 0});
	db.collection(conf.database.msgsCollection).remove({ room : room.id }, {w : 0});
}

/* check : checks the availability of the parameters in the db
 * @param champ : name of the field to check
 */
Room.prototype.check = function(champ, callback) {
	champ = champ || 'libelle';
	var c = _.pick(this.obj(), champ);
	db.collection(conf.database.roomCollection).find(c).count(function(err, count) {
		callback(err, count==0);
	});
};

module.exports = Room;
