function getRoomInformation(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function createRoom(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function destroyRoom(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function publishMessage(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function getMessage(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function publishMessage(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

module.exports.room = {
	get 		: getRoomInformation,
	create 		: createRoom,
	destroy		: destroyRoom,
	
	getMsg 		: getMessage,
	postMsg		: publishMessage
};
