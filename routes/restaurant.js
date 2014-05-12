module.exports = function(express, app, path){
	var router = express.Router();

	router.get('/dashboard', function(req, res) {
		res.sendfile(path.dirname(__dirname) + '/public/dashboard.html');
	});

	router.get('/history', function(req, res) {
		res.sendfile(path.dirname(__dirname) + '/public/dashboard.html');
	});

	router.get('/changepassword', function(req, res) {
		res.sendfile(path.dirname(__dirname) + '/public/dashboard.html');
	});

	router.get('/mobilemanager', function(req, res) {
		res.sendfile(path.dirname(__dirname) + '/public/dashboard.html');
	});

	app.use('/restaurant', router);
};