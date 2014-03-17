var Err   = require('../utils/err.js');

function ObjectDB (name, col) {
	this.loaded = false;
	this.odb = {
		col : col,
		name : name
	};
}

ObjectDB.prototype.fetch = function(callback) {
	var obj = this;
	this.loaded = false;
	if (!this.id && callback) return callback(new Err(1005, 400, "L'identifiant de l'objet recherché est inexistant"));
	db.collection(obj.odb.col).find({_id : obj.id}).toArray(function(err, t) {
		if (err && callback) callback(err);
		if (t.length > 0) {
			obj.fromObj(t[0]);
			obj.loaded = true;
		}
		if (callback) callback(err, obj);
	});
};

ObjectDB.prototype.save = function(callback) {
	var c = db.collection(this.odb.col),
		obj = this;
	
	if (obj.loaded) { //Update
		obj.updated = new Date();
		c.update({_id:obj.id},{$set:obj.obj()}, {w : 0}, function(err, res) {
			if (callback) callback(err);
		});
	}
	else { //Insert
		c.insert(obj.obj(), {w : 0}, function(err, res) {
			obj.id = res[0]._id;
			if (callback) callback(err);
		});
	}
};

ObjectDB.prototype.remove = function() {
	console.log("APP2");
	db.collection(this.odb.col).remove({_id : this.id}, {w : 0});
};

module.exports = ObjectDB;
