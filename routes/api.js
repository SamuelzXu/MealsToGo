var request    = require('request');
var apiAddress = "https://pocketask-api.herokuapp.com/users/authenticate";
// var apiAddress = "http://localhost:8080/users/authenticate";

module.exports = function(express, app){
    var router = express.Router();

    router.get('/dashboard', function(req, res){
        if (!req.role) {
            return res.redirect('/signin');
        }
        res.redirect('/' + req.role +'/dashboard');
    });

    app.use('/', router);
};