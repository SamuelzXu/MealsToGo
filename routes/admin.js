module.exports = function(express, app, path){
    var router = express.Router();

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

    router.get('/driver', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/admindriver.html');
    });

    router.get('/signup', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/signup.html');
    });

    app.use('/admin', router);
};