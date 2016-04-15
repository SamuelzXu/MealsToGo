module.exports = function(express, app, path){
    var router = express.Router();

    router.use(function(req, res, next){
        if (req.role != 'admin') {
            console.error('Unauthorized request: ' + req.originalUrl + ' at ' +
                new Date().toString() + ' from ' + req.ip + ' due to ' + err.message);
            res.redirect('/signin');
        }
        next();
    });

    router.get('/dashboard', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/all_profile', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/admin_history', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    // app.get('/admin/change_status', function(req, res) {
    //  res.sendfile(__dirname + '/public/admin.html');
    // });

    router.get('/changepassword', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/assigndriver', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/assigncateringdriver', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/driver', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admindriver.html');
    });

    router.get('/signup', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/signup.html');
    });

    router.get('/recent', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    router.get('/map', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/tracking.html');
    });

    router.get('/public_signup', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admin.html');
    });

    app.use('/admin', router);
};