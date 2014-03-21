var u        = require('../utils/utils.js'),
    List     = require('./list.js'),
    ObjectDB = require('./objectdb.js'),
    _        = require('underscore'),
    async    = require('async'),
    conf     = require('../conf.js');

function User(id, callback, obj) {	
	id = (typeof id === 'string' && id.length == 24) ? u.ObjectID(id) : id;
	this.id           = id;
	this.login        = null;
	this.pass         = null;
	this.avatar       = null;
	this.civilite     = null;
	this.firstName    = null;
	this.lastName     = null;
	this.mail         = null;
	this.tel          = null;
	this.isAdmin      = false;
	this.created      = new Date();
	this.updated      = null;
	
	// Object properties
	this.loaded = false;
	if (obj) {
		this.fromObj(obj);
		this.loaded = true;
	}
	if (id != null && !this.loaded) this.fetch(callback);
	else if (callback) callback(null, this);
};

User.prototype = new ObjectDB(conf.database.name, conf.database.userCollection);

User.getFromDb = function(callback) {
	var t = null;
	db.collection(conf.database.userCollection).find({}).toArray(function(err, t) {
		async.map(t, function(e, done) {
			new User(e._id, done, e);
		}, callback);
	});
}

User.prototype.toString = function() {
	return this.login;
};

User.prototype.fromObj = function(obj) {
	this.login        = obj.login;
	this.pass         = obj.pass;
	this.avatar       = obj.avatar;
	this.civilite     = obj.civilite;
	this.firstName    = obj.firstName;
	this.lastName     = obj.lastName;
	this.mail         = obj.mail;
	this.tel          = obj.tel;
	this.isAdmin      = obj.isAdmin;
	this.token        = obj.token;
	this.lastActivity = obj.lastActivity;
	this.created      = obj.created;
	this.updated      = obj.updated;
};

User.prototype.obj = function(id) {
	var o = {
		login        : this.login,
		pass         : this.pass,
                avatar       : this.avatar,
                civilite     : this.civilite,
		firstName    : this.firstName,
		lastName     : this.lastName,
		mail         : this.mail,
		tel          : this.tel,
		isAdmin      : this.isAdmin,
		token        : this.token,
		lastActivity : this.lastActivity,
		created      : this.created,
		updated      : this.updated
	};
	if (id) o.id = this.id;
	return o;
};

User.prototype.remove = function() {
	var user = this;
	db.collection(conf.database.userCollection).remove({ _id : user.id }, {w : 0});
}

User.prototype.setPassword = function(pass) {
	if (pass) this.pass = u.sha1(pass);
};

User.prototype.setMail = function(mail) {
	var re = new RegExp('^[_a-zA-Z0-9+-]+[_.a-zA-Z0-9+-]*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,4})$');
	if (re.test(mail)) {
		this.mail = mail;
		return true;
	}
	return false;
};

User.prototype.setTel = function(tel) {
	var re = new RegExp('^((0|(\\+[0-9]{0,3}[-. ]?))[1-689]([-. ]?[0-9]{2}){4})?$');
	if (re.test(tel)) {
		this.tel = tel;
		return true;
	}
	return false;
};

User.prototype.isAuthorized = function(login, password, callback) {
	if (login === null || password === null) return callback(null, false);
	db.collection(conf.database.userCollection).find({login : login, pass : u.sha1(password)}).count(function(err, count) {
		callback(err, count==1);
	});
};


/* check : checks the availability of the parameters in the db
 * @param champ : name of the field to check
 */
User.prototype.check = function(champ, callback) {
	champ = champ || 'login';
	var c = _.pick(this.obj(), champ);
	db.collection(conf.database.userCollection).find(c).count(function(err, count) {
		callback(err, count==0);
	});
};

module.exports = User;
