module.exports = function(express, app, path){
    var router = express.Router();

    router.get('/dashboard', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/driver.html');
    });

    app.use('/driver', router);
}