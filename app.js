if(process.env.NEW_RELIC_LICENSE_KEY){
    require('newrelic');
}
var http         = require('http');
var path         = require('path');
var express      = require('express');
var app          = express();

// Local Express JS Configuration Setup
require('./config')(express, app);

// Routes Setup
require('./routes')(express, app, path);
require('./routes/api')(express, app);

app.use(function(req, res, next){
    console.log(req.session);
    if (!req.session.login) {
        res.redirect('/signin');
    }
    next();
});
require('./routes/restaurant')(express, app, path);
require('./routes/driver')(express, app, path);
require('./routes/admin')(express, app, path);

// Initialize http server on specified port
http.globalAgent.maxSockets = 25;
http.createServer(app).listen(app.get('port'), function(){
    console.log('App is listening on port ' + app.get('port'));
    console.log('Max. no. of open sockets is ' + http.globalAgent.maxSockets);
});