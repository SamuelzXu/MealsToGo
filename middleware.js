var jwt   = require('jsonwebtoken');
var fs    = require('fs');
var path  = require('path');

// token expiry time in seconds
var tokenLife = 12 * 60 * 60;

exports.verifyToken = function(req, res, next) {
    var token = req.headers.token;
    var cert = fs.readFileSync(__dirname + '/pub-key.pem');
    jwt.verify(token, cert, function(err, decoded) {
        var currentTime = new Date().getTime() / 1000;
        if (err) {
            console.error('Unauthorized request: ' + req.originalUrl + ' at ' +
                new Date().toString() + ' from ' + req.ip + ' due to ' + err.message);
            return res.json(404, {msg: "The page you are looking for doesn't exist."});
        } else if (currentTime - decoded.iat > tokenLife) {
            return res.json(401, {msg: "Your token has expired."});
        } else {
            req.username = decoded.username;
            req.id       = decoded.id;
            req.role     = decoded.role;
            return next();
        }
    });
};