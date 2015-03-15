var jwt       = require('jsonwebtoken');
var fs        = require('fs');
var tokenLife = 12 * 60 * 60; // token expiry time in seconds

exports.verifyToken = function(req, res, next) {
    var token = req.cookies.token;
    var cert = fs.readFileSync(__dirname + '/pub-key.pem');
    if (!token) {
        return res.redirect('/signin');
    }
    jwt.verify(token, cert, function(err, decoded) {
        var currentTime = new Date().getTime() / 1000;
        if (err) {
            console.error('Unauthorized request: ' + req.originalUrl + ' at ' +
                new Date().toString() + ' from ' + req.ip + ' due to ' + err.message);
            return res.redirect('/signin');
        } else if (currentTime - decoded.iat > tokenLife) {
            console.info('Token of ' + req.username + ' has expired at ' + new Date().toString());
            return res.redirect('/signin');
        } else {
            req.username = decoded.username;
            req.id       = decoded.id;
            req.role     = decoded.role;
            return next();
        }
    });
};