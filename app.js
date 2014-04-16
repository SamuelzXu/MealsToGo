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

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
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