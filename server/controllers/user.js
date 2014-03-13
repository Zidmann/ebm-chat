function getUserInfos(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

module.exports.user = {
	get		: 	getUserInfos,
	getConnected	:	null,
	update		:	null,
	destroy		:	null
};
