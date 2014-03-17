//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script to set Emmanuel ZIDEL-CAUFFET and Edgar HIPP administrator of the EBM Chat Server             //
// Auteur      : Zidmann (zidmann@gmail.com)                                                            //
// Date        : 14/03/2014                                                                             //
// Version     : 0.0.1                                                                                  //
// Note        : Run mongo ebmChat  mongo-set-admin.js                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Test values for MongoDB
 * Run $mongo cia mongo-admin.js 
 */
var u = db.users;

// Yay admins !
u.update({},                                        {$set : { 'isAdmin' : false}}, false, true);
u.update({ login : { $in : ['ehipp', 'ezidel-c']}}, {$set : { 'isAdmin' : true }}, false, true);
