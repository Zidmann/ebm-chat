function cas(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function signin(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}

function signout(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function UserInfos');
}


module.exports.login = {
	cas		:	cas,
        signin          :       signin,
        signout         :       signout
};

