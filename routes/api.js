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
            if (response.statusCode == 200) {
                req.session.regenerate(function(err){
                    if (err) {
                        console.error('Unable to regenerate a new session.');
                        res.json(400, 'Something wrong with the login process. Please try again.');
                    }
                    req.session.login = true;
                    req.session.role = body.role;
                    res.json(200, {token: body.token});
                });
            } else {
                res.json(response.statusCode, body);
            }
        });
    });

    router.get('/signout', function(req, res){
        req.session.destroy(function(err){
            if (err) {
                console.error('Unable to destroy the session.');
                return res.json(400, 'Unable to destroy the session. Please try again.');
            }
            res.redirect(200, '/signin');
        });
    });

    app.use('/api', router);
};