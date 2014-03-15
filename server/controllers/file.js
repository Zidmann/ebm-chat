function uploadFile(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function destroyFile(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}


module.exports.file = {
	upload   : uploadFile,
	destroy  : destroyFile
};
