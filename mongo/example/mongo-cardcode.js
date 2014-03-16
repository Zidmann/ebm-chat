/* Test values for MongoDB
 * Run $mongo cia mongo-cardcode.js 
 */

var t = db.suggest.find({}, { login : 1, cardCode : 1}).toArray();

for (i = 0; i<t.length; i++) {
	db.users.update({ login : t[i].login }, { $set : {
		cardCode : t[i].cardCode
	}});
}