var Uploader = require('../lib/express-uploader/express-uploader');

function uploadFile(req, res, next) {
    var uploader = new Uploader({
        debug         : false,
        validate      : true,
        thumbnails    : true,
        thumbToSubDir : true,
        tmpDir        : __dirname + '/../tmp',
        publicDir     : __dirname + '/../public',
        uploadDir     : __dirname + '/../public/files',
        uploadUrl     : '/files/',
        thumbSizes    : [140,[100, 100]]
    });
    uploader.uploadFile(req, function(data) {
        res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
    });
}

function destroyFile(req, res, next) {
    var uploader = new Uploader({
        debug         : false,
        validate      : true,
        thumbnails    : true,
        thumbToSubDir : true,
        tmpDir        : __dirname + '/../tmp',
        publicDir     : __dirname + '/../public',
        uploadDir     : __dirname + '/../public/files',
        uploadUrl     : '/files/',
        thumbSizes    : [140,[100, 100]]
    });
    uploader.removeFile(req.params.id, function(data) {
        res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
    });
}


module.exports.file = {
	upload   : uploadFile,
	destroy  : destroyFile
};
