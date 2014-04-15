var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var bodyparser = require('body-parser');
var compress   = require('compression');
var app        = express();

// var helmet = require('helmet');
// var route = require('./route');

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(compress());

// Route Setup
app.get('/', function(req, res){
    res.json('Hello World!');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('App is listening on port ' + app.get('port'));
});
// app.listen(app.get('port'));
// console.log('App is listening on port ' + app.get('port'));