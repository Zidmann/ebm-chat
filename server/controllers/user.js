function signup(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function getUserInfos(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function updateUserInfos(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function getConnectedInfos(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}



module.exports.user = {
        signup          :       signup,
	get		: 	getUserInfos,
	getConnected	:	getConnectedInfos,
	update		:	updateUserInfos
};
