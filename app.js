if(process.env.NEW_RELIC_LICENSE_KEY){
	require('newrelic');
}
var express    = require('express');
var app        = express();

var http       = require('http');
var logger     = require('morgan');
var bodyparser = require('body-parser');
var compress   = require('compression');
var helmet     = require('helmet');
var path       = require('path');

// Local Express JS Configuration
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

// Routes to access static pages
require('./routes')(express, app, path);
require('./routes/restaurant')(express, app, path);

// Initialize http server on specified port
http.globalAgent.maxSockets = 25;
http.createServer(app).listen(app.get('port'), function(){
	console.log('App is listening on port ' + app.get('port'));
    console.log('Max. no. of open sockets is ' + http.globalAgent.maxSockets);
});