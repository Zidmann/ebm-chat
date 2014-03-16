/* Test values for MongoDB
 * Run $mongo cia mongo-sample.js 
 */
var u = db.users,
	l = db.lists,
	lm = db.lists.mods,
	lu = db.lists.users,
	lr = db.lists.requests;

// Collections clearing
u.remove();
l.remove();
lm.remove();
lu.remove();
lr.remove();

// Sample date for Users
u.insert({
	login : 'lundi',
	pass : '6367c48dd193d56ea7b0baad25b19455e529f5ee', //abc123
	firstName : 'Alphonse',
	lastName : 'A',
	mail : 'alphonse.a@centraliens-lille.org',
	tel : '0123456789',
	isAdmin : false,
	created : new Date(),
	updated : null
});
u.insert({
	login : 'mardi',
	pass : '0b3d8b29493059afd7f9912106279c4643ac4939', //def456
	firstName : 'Bruno',
	lastName : 'B',
	mail : 'b.b@leet.org',
	tel : '+33 1 23 45 67 89',
	isAdmin : true,
	created : new Date(),
	updated : null
});
u.insert({
	login : 'mercredi',
	pass : 'ffcb2deee9131e6cda4faa78bb40423c9b847ff0', //ghi789
	firstName : 'Caro',
	lastName : 'C',
	mail : 'carosse@mail.com',
	tel : '09-87-65-43-21',
	isAdmin : false,
	created : new Date(),
	updated : null
});

// Sample data for Lists
l.insert({
	name : 'Centrale pétanque',
	desc : 'Le groupe des boulistes !',
	fields : [{name : 'name', description : 'Juste ton nom', label : 'Nom', type : 'text', required : true},
	          {name : 'role', description : 'Tireur ou pointeur ?', label : 'Rôle', type : 'select', required : true}],
	userFields : {
		login : false,
		firstName : true,
		lastName : true,
		mail : true,
		tel : false
	},
	category : {
		type : 0,
		place : 'Foyer',
		date : new Date(),
		endDate : null
	},
	type : 1,
	creatorId : u.find({login : 'lundi'}, {_id : 1}).next()._id,
	created : new Date(),
	updated : new Date()
});
l.insert({
	name : 'Centrale chats',
	desc : 'Meoooow',
	fields : [{name : 'name', description : 'Juste ton nom', label : 'Nom', type : 'text', required : true},
	          {name : 'nbre', description : 'Combien as-tu de chats ?', label : 'Nombre de chats', type : 'number', required : false},
	          {name : 'race', description : 'Quelle est ta race préférée ?', label : 'Race préférée', type : 'select', required : false}],
	userFields : {
		login : true,
		firstName : true,
		lastName : false,
		mail : false,
		tel : true
	},
	category : {
		type : 1,
		place : 'Cafét\'',
		date : new Date(),
		endDate : new Date()
	},
	type : 2,
	creatorId : u.find({login : 'mercredi'}, {_id : 1}).next()._id,
	created : new Date(),
	updated : null
});


// Sample data for Lists.mods
lm.insert({
	userId : u.find({login : 'lundi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale pétanque'}, {_id : 1}).next()._id,
	created : new Date()
});
lm.insert({
	userId : u.find({login : 'mardi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale chats'}, {_id : 1}).next()._id,
	created : new Date()
});
lm.insert({
	userId : u.find({login : 'mercredi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale chats'}, {_id : 1}).next()._id,
	created : new Date()
});

// Sample data for Lists.users
lu.insert({
	userId : u.find({login : 'lundi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale pétanque'}, {_id : 1}).next()._id,
	data : {
		name : 'Alph',
		role : 'Tireur'
	},
	checkedIn : null,
	created : new Date(),
	updated : null
});
lu.insert({
	userId : u.find({login : 'mardi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale pétanque'}, {_id : 1}).next()._id,
	data : {
		name : 'Brubru',
		role : 'Pointeur'
	},
	checkedIn : null,
	created : new Date(),
	updated : new Date()
});
lu.insert({
	userId : u.find({login : 'lundi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale chats'}, {_id : 1}).next()._id,
	data : {
		name : 'Alph',
		nbre : 3,
		race : 'Je ne connais'
	},
	checkedIn : null,
	created : new Date(),
	updated : null
});
lu.insert({
	userId : u.find({login : 'mardi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale chats'}, {_id : 1}).next()._id,
	data : {
		name : 'Brubru',
		nbre : 18,
		race : 'pas de race'
	},
	checkedIn : null,
	created : new Date(),
	updated : null
});
lu.insert({
	userId : u.find({login : 'mercredi'}, {_id : 1}).next()._id,
	listId : l.find({name : 'Centrale chats'}, {_id : 1}).next()._id,
	data : {
		name : 'Cacaro',
		nbre : 1,
		race : 'de chats'
	},
	checkedIn : null,
	created : new Date(),
	updated : null
});
