var u        = require('../utils/utils.js'),
    List     = require('./list.js'),
    ObjectDB = require('./objectdb.js'),
    _        = require('underscore'),
    async    = require('async'),
    conf     = require('../conf.js');

function Msg(id, callback, obj) {
	id = (typeof id === 'string' && id.length == 24) ? u.ObjectID(id) : id;
	
	this.id      = id;
	this.room    = null;
	this.msg     = null;
	this.file    = null;
	this.creator = null;
	this.created = new Date();
	this.updated = null;

	// Object properties
	this.loaded = false;
	
	if (obj) {
		this.fromObj(obj);
		this.loaded = true;
	}
	
	if (id != null && !this.loaded) this.fetch(callback);
	else if (callback) callback(null, this);
};

Msg.prototype = new ObjectDB(conf.database.name, conf.database.msgsCollection);

Msg.getFromDb = function(callback) {
	var t = null;
	db.collection(conf.database.msgsCollection).find({}).toArray(function(err, t) {
		async.map(t, function(e, done) {
			new Msg(e._id, done, e);
		}, callback);
	});
}

Msg.prototype.toString = function() {
	return this.id;
};

Msg.prototype.fromObj = function(obj) {
	this.room    = obj.room;
	this.msg     = obj.msg;
	this.file    = obj.file;
	this.creator = obj.creator;
	this.created = obj.created;
	this.updated = obj.updated;
};

Msg.prototype.obj = function(id) {
	var o = {
		room       : this.room,
		msg        : this.msg, 
		file       : this.file,
		creator    : this.creator,
		created    : this.created,
		updated    : this.updated
	};
	if (id) o.id = this.id;
	return o;
};

Msg.prototype.remove = function() {
	var msg = this;
	db.collection(conf.database.msgsCollection).remove({ _id : msg.id }, {w : 0});
}

/* check : checks the availability of the parameters in the db
 * @param champ : name of the field to check
 */
Msg.prototype.check = function(champ, callback) {
	champ = champ || 'id';
	var c = _.pick(this.obj(), champ);
	db.collection(conf.database.msgsCollection).find(c).count(function(err, count) {
		callback(err, count==0);
	});
};

module.exports = Msg;