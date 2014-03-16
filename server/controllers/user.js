function signup(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function signup');
}

function getUserInfos(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function getUserInfos');
}

function deleteUser(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Function deleteUser');
}


module.exports.user = {
        signup          :       signup,
	get		: 	getUserInfos,
        destroy 	: 	deleteUser
};
