module.exports = function(express, app, path){
    var router = express.Router();

    router.use(function(req, res, next){
        if (req.session.role != 'restaurant') {
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

    router.get('/changepassword', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    router.get('/mobilemanager', function(req, res) {
        res.sendfile('./public/dashboard.html');
    });

    app.use('/restaurant', router);
};