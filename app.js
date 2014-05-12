if(process.env.NEW_RELIC_LICENSE_KEY){
	require('newrelic');
}
var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var bodyparser = require('body-parser');
var compress   = require('compression');
var helmet     = require('helmet');
var app        = express();

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.enable('trust proxy');
app.use(logger('dev'));
app.use(compress());

// app.use(helmet.csp());
app.use(helmet.xframe());
app.use(helmet.hsts());
app.use(helmet.iexss());
app.use(helmet.contentTypeOptions());
app.use(helmet.cacheControl());

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/partial', express.static(__dirname + '/public/partial'));

// Route Setup
// public pages
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/aboutus', function(req, res) {
	res.sendfile(__dirname + '/public/aboutus.html');
});
app.get('/ourclients', function(req, res) {
	res.sendfile(__dirname + '/public/ourclients.html');
});
app.get('/pubsignup', function(req, res) {
	res.sendfile(__dirname + '/public/signuppub.html');
});
app.get('/signin', function(req, res) {
	res.sendfile(__dirname + '/public/signin.html');
});
app.get('/privacypolicy', function(req, res) {
	res.sendfile(__dirname + '/public/privacypolicy.html');
});
app.get('/termofuse', function(req, res) {
	res.sendfile(__dirname + '/public/termofuse.html');
});

// admin only pages
app.get('/admin/dashboard', function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});
app.get('/admin/all_profile', function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});
app.get('/admin/admin_history', function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});
// app.get('/admin/change_status', function(req, res) {
// 	res.sendfile(__dirname + '/public/admin.html');
// });
app.get('/admin/changepassword', function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});
app.get('/admin/assigndriver', function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});
app.get('/admindriver', function(req, res) {
	res.sendfile(__dirname + '/public/admindriver.html');
});
app.get('/signup', function(req, res) {
	res.sendfile(__dirname + '/public/signup.html');
});

// restaurant only pages
app.get('/restaurant/dashboard', function(req, res) {
	res.sendfile(__dirname + '/public/dashboard.html');
});
app.get('/restaurant/history', function(req, res) {
	res.sendfile(__dirname + '/public/dashboard.html');
});
app.get('/restaurant/changepassword', function(req, res) {
	res.sendfile(__dirname + '/public/dashboard.html');
});
app.get('/restaurant/mobilemanager', function(req, res) {
	res.sendfile(__dirname + '/public/dashboard.html');
});

// driver only pages

http.createServer(app).listen(app.get('port'), function(){
	console.log('App is listening on port ' + app.get('port'));
});
// app.listen(app.get('port'));
// console.log('App is listening on port ' + app.get('port'));