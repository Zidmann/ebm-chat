//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script to clear then add information in mongo database                                               //
// Auteur      : Zidmann (zidmann@gmail.com)                                                            //
// Date        : 14/03/2014                                                                             //
// Version     : 0.0.1                                                                                  //
// Note        : Run mongo ebmChat  mongo-insert-data.js                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

var u = db.Users,
    r = db.Rooms,
    rm= db.Rooms.messages;

// Collections clearing
 u.remove();
 r.remove();
rm.remove();

// Sample data for Users
u.insert([{
		login      : 'ezidel-c',
		pass       : '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', //abc123
		avatar     : null,
		civilite   : "M.",
		firstName  : 'Emmanuel',
		lastName   : 'ZIDEL-CAUFFET',
		mail       : 'emmanuel.zidel@centraliens-lille.org',
		tel        : '0633514128',
		isAdmin    : false,
		created    : new Date(),
		updated    : null
	   },
	   {
		login      : 'ehipp',
		pass       : '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', //abc123
                avatar     : null,
		civilite   : "M.",
		firstName  : 'Edgar',
		lastName   : 'HIPP',
		mail       : 'edgar.hipp@centraliens-lille.org',
		isAdmin    : false,
		created    : new Date(),
		updated    : null
	   },
	   {
		login      : 'tbourdea',
		pass       : '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', //abc123
                avatar     : null,
		civilite   : "M.",
		firstName  : 'Thomas',
		lastName   : "BOURDEAUD\'HUY",
		mail       : 'thomas.bourdeaudhuy@ec-lille.fr',
		isAdmin    : false,
		created    : new Date(),
		updated    : null
	   }
	]);

// Sample data for Rooms
r.insert([{
		libelle    : 'Student Room',
                owner      : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
		description: "Chat reserved for user student",
		created    : new Date(),
		updated    : null
          },
          {
		libelle    : 'Teacher Room',
                owner      : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
		description: "Chat reserved for teacher",
		created    : new Date(),
		updated    : null
          }]);


// Sample data for Messages for Student Room
rm.insert([{
		RoomId  : r.find({libelle : 'Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
	        message : "Hello. Il y a quelqu'un",
		created : new Date()
        },
        {
		RoomId  : r.find({libelle : 'Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ehipp'}, {_id : 1}).next()._id,
	        message : "Oui, moi",
		created : new Date()
        },
        {
		RoomId  : r.find({libelle : 'Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
        	message : "Ok. On termine le Chat EBM Android ?",
		created : new Date()
        },
        {
		RoomId  : r.find({libelle : 'Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ehipp'}, {_id : 1}).next()._id,
	        message : "Ca marche",
		created : new Date()
        }]);

// Sample data for Messages for Teacher Room
rm.insert([{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "Hello. Il y a quelqu'un",
		created : new Date()
        },
	{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "Bon on dirait que je suis tous seul. Je transmets une pièce jointe au passage",
                file    : "",
		created : new Date()
        },
	{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "I go",
		created : new Date()
        }]);

