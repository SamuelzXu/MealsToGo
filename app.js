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
// app.use(helmet.cacheControl());

var oneDay = 86400000;
app.use('/js', express.static(__dirname + '/public/js', {maxAge: oneDay}));
app.use('/css', express.static(__dirname + '/public/css', {maxAge: oneDay}));
app.use('/img', express.static(__dirname + '/public/img', {maxAge: oneDay}));
app.use('/partial', express.static(__dirname + '/public/partial'));

// Route Setup
app.get('/', function(req, res){
    res.sendfile(__dirname + '/public/');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('App is listening on port ' + app.get('port'));
});
// app.listen(app.get('port'));
// console.log('App is listening on port ' + app.get('port'));