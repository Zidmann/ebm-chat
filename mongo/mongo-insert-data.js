//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script to clean then add information in mongo database                                               //
// Auteur      : Zidmann (zidmann@gmail.com)                                                            //
// Date        : 14/03/2014                                                                             //
// Version     : 0.0.1                                                                                  //
// Note        : Run mongo ebmChat  mongo-insert-data.js                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

var u = db.users,
    r = db.rooms,
    rm= db.rooms.messages;

// Database
db.dropDatabase();

// Sample data for Users
u.insert([//Students of EC Lille 
           {
		login      : 'ezidel-c',
		pass       : 'e38ad214943daad1d64c102faec29de4afe9da3d', //password1
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
		pass       : '2aa60a8ff7fcd473d321e0146afd9e26df395147', //password2
                avatar     : null,
		civilite   : "M.",
		firstName  : 'Edgar',
		lastName   : 'HIPP',
		mail       : 'edgar.hipp@centraliens-lille.org',
		isAdmin    : false,
		created    : new Date(),
		updated    : null
	   },
           //Teachers of previous students
	   {
		login      : 'tbourdea',
		pass       : '1119cfd37ee247357e034a08d844eea25f6fd20f', //password3
                avatar     : null,
		civilite   : "M.",
		firstName  : 'Thomas',
		lastName   : "BOURDEAUD\'HUY",
		mail       : 'thomas.bourdeaudhuy@ec-lille.fr',
		isAdmin    : false,
		created    : new Date(),
		updated    : null
	   },
           {
                login      : 'jbourrey',
                pass       : 'a1d7584daaca4738d499ad7082886b01117275d8', //password4
                avatar     : null,
                civilite   : "M.",
                firstName  : 'Jean-Pierre',
                lastName   : "BOURREY",
                mail       : 'jean-pierre.bourrey@ec-lille.fr',
                isAdmin    : false,
                created    : new Date(),
                updated    : null
           }
	]);

// Sample data for Rooms
r.insert([{
		libelle    : 'EBM Student Room',
                owner      : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
		description: "Chat used by students of EBM option in EC-Lille",
		created    : new Date(),
		updated    : null
          },
          {
                libelle    : 'AE Student Room',
                owner      : u.find({login : 'jbourrey'}, {_id : 1}).next()._id,
                description: "Chat used by students of AE option in EC-Lille",
                created    : new Date(),
                updated    : null
          },
          {
		libelle    : 'Teacher Room',
                owner      : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
                description: "Chat used by students of AE option in EC-Lille",
		created    : new Date(),
		updated    : null
          }]);


// Sample data for Messages for EBM Student Room
rm.insert([{
		RoomId  : r.find({libelle : 'EBM Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
	        message : "Bonjour quelqu'un est là ?",
		created : new Date()
        },
        {
		RoomId  : r.find({libelle : 'EBM Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ehipp'}, {_id : 1}).next()._id,
	        message : "Oui, moi.",
		created : new Date()
        },
        {
		RoomId  : r.find({libelle : 'EBM Student Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'ezidel-c'}, {_id : 1}).next()._id,
        	message : "Salut Edgar. Ca baigne, comment tu trouves notre nouveau chat made in EBM",
		created : new Date()
        }]);

// No message in AE Student Room

// Sample data for Messages for Teacher Room
rm.insert([{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "Bonjour. Qui est là ?",
		created : new Date()
        },
	{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "Bonjour Thomas. Je vois que tes étudiants s'amusent maintenant à inventer de nouvelles méthodes pour parler entres eux et pas suivre en cours !!!",
                file    : "",
		created : new Date()
        },
	{
		RoomId  : r.find({libelle : 'Teacher Room'}, {_id : 1}).next()._id,
		userId  : u.find({login : 'tbourdea'}, {_id : 1}).next()._id,
	        message : "A ça, non c'est moi qui leur ait demandé pour leurs donner une note aux TPs Android.",
		created : new Date()
        }]);

