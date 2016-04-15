module.exports = function(express, app, path){
    var router = express.Router();

    router.use(function(req, res, next){
        if (req.role != 'driver') {
            console.error('Unauthorized request: ' + req.originalUrl + ' at ' +
                new Date().toString() + ' from ' + req.ip + ' due to ' + err.message);
            res.redirect('/signin');
        }
        next();
    });

    router.get('/dashboard', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/driver.html');
    });

    app.use('/driver', router);
};