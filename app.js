if(process.env.NEW_RELIC_LICENSE_KEY){
    var newrelic = require('newrelic');
}
// var newrelic   = require('newrelic');
var http       = require('http');
var path       = require('path');
var express    = require('express');
var app        = express();
var middleware = require('./middleware');

// Local Express JS Configuration Setup
require('./config')(express, app);

// Routes Setup
require('./routes')(express, app, path);

app.get('/signout', function(req, res){
    res.clearCookie('token');
    res.json(200);
});

app.use(middleware.verifyToken);
require('./routes/api')(express, app);

require('./routes/restaurant')(express, app, path);
require('./routes/driver')(express, app, path);
require('./routes/admin')(express, app, path);

// Initialize http server on specified port
http.globalAgent.maxSockets = 25;
http.createServer(app).listen(app.get('port'), function(){
    console.log('App is listening on port ' + app.get('port'));
    console.log('Max. no. of open sockets is ' + http.globalAgent.maxSockets);
});