var request    = require('request');
var apiAddress = 'http://localhost:8080/users/authenticate';

module.exports = function(express, app){
    var router = express.Router();

    router.post('/signin', function(req, res){
        if (!req.body.username || !req.body.password) {
            res.json(400, 'At least one of the required query parameters is missing.');
            throw new Error('At least one of the required query parameters is missing.');
        }
        var requestUrl = {
            url: apiAddress,
            method: 'POST',
            form: {
                username: req.body.username,
                password: req.body.password
            }
        };
        request(requestUrl, function(error, response, body){
            if (error) {
                console.error(error);
                res.json(400, error.message);
            }
            body = JSON.parse(body);
            res.json(200, body);
        });
    });

    app.use('/api', router);
};