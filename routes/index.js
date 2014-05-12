module.exports = function(express, app, path){
    var router = express.Router();

    router.get('/', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/index.html');
    });

    router.get('/aboutus', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/aboutus.html');
    });

    router.get('/ourclients', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/ourclients.html');
    });

    router.get('/pubsignup', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/signuppub.html');
    });

    router.get('/signin', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/signin.html');
    });

    router.get('/privacypolicy', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/privacypolicy.html');
    });

    router.get('/termofuse', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/termofuse.html');
    });

    app.use('/', router);
};