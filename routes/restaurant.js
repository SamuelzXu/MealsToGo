module.exports = function(express, app, path){
    var router = express.Router();

    router.use(function(req, res, next){
        if (req.role != 'restaurant') {
            console.error('Unauthorized request: ' + req.originalUrl + ' at ' +
                new Date().toString() + ' from ' + req.ip + ' due to ' + err.message);
            res.redirect('/signin');
        }
        next();
    });

    router.get('/dashboard', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    router.get('/history', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    router.get('/cateringhistory', function(req, res){
        res.sendfile('./public/dashoboard.html');
    });

    router.get('/changepassword', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    router.get('/mobilemanager', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    router.get('/invoice', function(req, res) {
        res.sendfile('./public/partial/invoice.html');
    });

    app.use('/restaurant', router);
};