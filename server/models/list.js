var u        = require('../utils/utils.js'),
    _        = require('underscore'),
    Err      = require('../utils/err.js'),
    ObjectDB = require('./objectdb.js'),
    async    = require('async');

function List(id, callback, obj) {	
	id = (typeof id === 'string' && id.length == 24) ? u.ObjectID(id) : id;
	
	this.id = id || null;
	this.name = null;
	this.desc = null;
	this.fields = []; // Array of Field objects, not javascript object
	this.userFields = {
		login : false,
		firstName : true,
		lastName : true,
		mail : false,
		tel : false
	};
	this.category = {
		type : null,
		place : null,
		date : null,
		endDate : null
	}
	this.type = 0; // Default : open list
	this.creatorId = null;
	this.created = new Date();
	this.updated = null;
	
	this.loaded = false;
	
	if (obj) {
		this.fromObj(obj);
		this.loaded = true;
	}
	
	if (id != null && !this.loaded) this.fetch(callback);
	else if (callback) callback(null, this);
};

List.prototype = new ObjectDB('List', 'lists');

/* TYPES : static array containing all list type available.
 * The type number is the array index.
 */
List.TYPES = [{ // Type 0 : open list
	name : 'Ouverte',
	publicDisplay : true, // The user can see the list in list of available lists
	publicContent : true, // The user can see the links of the list
	memberContent : true, // The members can see the links of the list
	usersCanJoin : true, // The user can directly join the list
	usersCanRequest : true // The user can send a request to join the list
},{ // Type 1 : mod's approbation required
	name : 'Privée',
	publicDisplay : true,
	publicContent : false,
	memberContent : false,
	usersCanJoin : false,
	usersCanRequest : true
},{ // Type 2 : completely secret list
	name : 'Secrète',
	publicDisplay : false,
	publicContent : false,
	memberContent : false,
	usersCanJoin : false,
	usersCanRequest : false
}, { // Type 3 : sondage mode
  name : 'Sondage',
  publicDisplay : true,
  publicContent : false,
  memberContent : false,
  usersCanJoin : true,
  usersCanRequest : false
}];

List.CATEGORIES = [ 'other', 'association', 'club', 'event', 'poll', 'order' ];

/* getFromDb : static function returning an array containing all the lists in the db
 */
List.getFromDb = function(callback) {
	db.collection('lists').find({}).toArray(function(err, t) {
		async.map(t, function(e, done) {
			new List(e._id, done, e);
		}, callback);
	});
};

List.isValidUserFields = function(obj) {
	if (!obj) return false;
	// Step 1 : there are no extra field in the data object
	if (!_.isEmpty(_.omit(obj, 'login', 'firstName', 'lastName', 'mail', 'tel'))) return false;
	// Step 2 : all required fields are present
	if (_.size(obj) !== 5) return false;
	// Step 3 : all required fields are non-null
	if (!_.every(obj, _.isBoolean)) return false;
	
	return true;
}

/* fetch : reads the list's info from the database and stores them into this object
 */
List.prototype.fromObj = function(obj) {
	this.name = obj.name;
	this.desc = obj.desc;
	this.fields = obj.fields;
	this.userFields = obj.userFields;
	this.category = obj.category;
	this.type = obj.type;
	this.creatorId = obj.creatorId;
	this.created = obj.created;
	this.updated = obj.updated;
};

/* obj : returns the javascript object corresponding to the list
 */
List.prototype.obj = function(id) {
	var o = {
		name : this.name,
		desc : this.desc,
		fields : this.fields,
		userFields : this.userFields,
		category : this.category,
		type : this.type,
		creatorId : this.creatorId,
		created : this.created,
		updated : this.updated
	};
	if (id) o.id = this.id;
	return o;
};

List.prototype.removeBis = function() {
	var list = this;
	list.remove();
	db.collection('lists.users').remove({ listId : list.id }, {w : 0});
	db.collection('lists.mods').remove({ listId : list.id }, {w : 0});
};

/* isMod : tells whether the user is a moderator of this list
 * @param uid : the user's id
 */
List.prototype.isMod = function(user, callback) {
	var list = this;
	db.collection('lists.mods').find({userId : user.id, listId : list.id}).count(function(err, count) {
		callback(err, count>0);
	});
};

/* canSee : tells whether the user can access the list
 */
List.prototype.canSee = function(user, callback) {
	var list = this;
	this.isMember(user, function(err, b) {
		if (err) callback(err);
		list.isMod(user, function(err, b2) {
			callback(err, user.isAdmin || b || b2 || (list.type < List.TYPES.length && List.TYPES[list.type].publicDisplay), list);
		});
	});
};

List.prototype.canSeeLinks = function(user, callback) {
	var list = this;
	this.isMember(user, function(err, b) {
		if (err) callback(err);
		list.isMod(user, function(err, b2) {
			callback(err, user.isAdmin || b2 || (b && (list.type < List.TYPES.length && List.TYPES[list.type].memberContent)) || (list.type < List.TYPES.length && List.TYPES[list.type].publicContent), list);
		});
	});
};

/* canSee : tells whether the user can access the list
 */
List.prototype.canJoin = function(user, callback) {
	var list = this;
	this.isMod(user, function(err, b) {
		callback(err, user.isAdmin || b || (list.type < List.TYPES.length && List.TYPES[list.type].usersCanJoin));
	});
};

/* canSee : tells whether the user can access the list
 */
List.prototype.canRequest = function(user) {
	var list = this;
	this.isMod(user, function(err, b) {
		callback(err, user.isAdmin || b || (this.type < List.TYPES.length && List.TYPES[this.type].usersCanRequest));
	});
};

/* can Edit : tells whether the user can modify the list
 */
List.prototype.canEdit = function(user, callback) {
	this.isMod(user, function(err, b) {
		callback(err, user.isAdmin || b);
	});
};

/* isValidData : tells whether the data inputed is correct
 * @param data : data to check
 */
List.prototype.isValidData = function(data) {
	var t = null;
	if (!data) return false;
	// Step 1 : there are no extra field in the data object
	var toOmit =  _.map(this.fields, function(f){return f.name;});
	toOmit = toOmit.concat(['user_login', 'user_firstName', 'user_lastName', 'user_tel', 'user_mail']);
	if (!_.isEmpty(_.omit(data,toOmit))) return false;
	// Step 2 : all required fields are present
	t = _.map(_.filter(this.fields, function(f) {return f.required;}), function(f) {return f.name;}); // Names of required fields
	if (_.keys(_.pick(data, t)).length !== t.length) return false;
	// Step 3 : all required fields are non-null
	if (_.contains(_.values(_.pick(data, t)), null)) return false;
	
	return true;
};

/* isMember : tells whether the user is registered to this list
 * @param user : the user to check
 */
List.prototype.isMember = function(user, callback) {
	var list = this;
	if (user.id === null) return callback(null, false);
	db.collection('lists.users').find({userId : user.id, listId : list.id}).count(function(err, count) {
		callback(err, count==1);
	});
};

/* addUser : registers a user to this list
 * @param user : the user to add
 * @param data : the data inputed for the user
 */
List.prototype.addUser = function(user, data, callback) {
	var list = this;
	if (user) {
		this.isMember(user, function(err, b) {
			if (b) return callback(new Err(403, 1411, "L'utilisateur est déjà inscrit à la liste"));
			db.collection('lists.users').insert({
				userId : user.id,
				listId : list.id,
				data : data,
				created : new Date(),
				updated : null
			}, {w : 0}, callback);
		});
	}
	else {
		db.collection('lists.users').insert({
			userId : null,
			listId : list.id,
			data : data,
			created : new Date(),
			updated : null
		}, {w : 0}, callback);
	}
};

List.prototype.changeUser = function(user, data) {
	var list = this;
	db.collection('lists.users').update({
		listId : list.id,
		userId : user.id
	}, {$set : {
		data : data,
		updated : new Date()
	}}, {w : 0});
};

List.prototype.removeUser = function(user) {
	var list = this;
	this.isMember(user, function(err, b) {
		if (!b) return false;
		db.collection('lists.users').remove({listId : list.id, userId : user.id}, {w : 0});
	});
};

/* userList : returns the list of all registered users (with their data)
 */
List.prototype.userList = function(callback) {
	var list = this;
	db.collection('lists.users').find({listId : list.id}, {userId : 1, data : 1, created : 1, updated : 1}).sort("created", 1).toArray(callback);
};

List.prototype.addMod = function(user) {
	var list = this;
	db.collection('lists.mods').insert({
		userId : user.id,
		listId : list.id,
		created : new Date()
	}, {w : 0});
};

List.prototype.setMods = function(newList) {
	var list = this;
	var a = newList;
	this.modsList(function(err, oldList) {
		var newList = _.map(a, function(user) {
				return {id : user.id};
			}),
			oldList = _.map(oldList, function(user) {
				return {id: new u.ObjectID(user.userId.toString())};
			});
		
		async.each(oldList, function(e, done) {
			list.remMod(e, done);
		}, function(err) {
			_.each(newList, function(e) {
				list.addMod(e);
			});
		});
	});
};

List.prototype.remMod = function(user, callback) {
	var list = this;
	db.collection('lists.mods').remove({listId : list.id, userId : user.id}, {w : 0}, callback);
};

/* modsList : returns the moderator of this list
 */
List.prototype.modsList = function(callback) {
	var list = this;
	db.collection('lists.mods').find({listId : list.id}, {userId : 1, created : 1}).toArray(callback);
};

List.prototype.getRequests = function(callback) {
	var list = this;
	db.collection('lists.requests').find({listId : list.id}).toArray(callback);
};

List.prototype.addRequest = function(user, data) {
	var list = this;
	db.collection('lists.requests').insert({
		userId : user.id,
		listId : list.id,
		data : data,
		created : new Date(),
		updated : null
	}, {w : 0});
};

List.prototype.getRequest = function(rid, callback) {
	var list = this;
	rid = (typeof rid === 'string' && rid.length == 24) ? u.ObjectID(rid) : rid;
	
	db.collection('lists.requests').find({listId : list.id, _id : rid}).nextObject(callback);
};

List.prototype.changeRequest = function(rid, data) {
	var list = this;
	rid = (typeof rid === 'string' && rid.length == 24) ? u.ObjectID(rid) : rid;
	
	db.collection('lists.requests').update({_id : rid}, { $set : {
		data : data,
		updated : new Date()
	}}, {w : 0});
};

List.prototype.declineRequest = function(rid) {
	var list = this;
	rid = (typeof rid === 'string' && rid.length == 24) ? u.ObjectID(rid) : rid;
	
	db.collection('lists.requests').remove({_id : rid}, {w : 0});
};

List.prototype.acceptRequest = function(rid) {
	var list = this;
	rid = (typeof rid === 'string' && rid.length == 24) ? u.ObjectID(rid) : rid;
	
	db.collection('lists.requests').find({_id : rid}).nextObject(function(err, req) {
		db.collection('lists.users').insert({
			userId : req.userId,
			listId : req.listId,
			data : req.data,
			created : new Date(),
			updated : null
		}, {w : 0});
		db.collection('lists.requests').remove({_id : rid}, {w : 0});
	});
};

module.exports = List;
