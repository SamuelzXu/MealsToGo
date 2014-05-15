module.exports = function(express, app, path){
    var router = express.Router();

    router.get('/dashboard', function(req, res) {
        res.sendfile(path.dirname(__dirname) + '/public/driver.html');
    });

    app.use('/driver', function(req, res, next){
        if (req.session.role !== "driver")
            res.redirect('/signin');
        next();
    }, router);
};