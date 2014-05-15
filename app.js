if(process.env.NEW_RELIC_LICENSE_KEY){
    require('newrelic');
}
var express      = require('express');
var app          = express();

var http         = require('http');
var logger       = require('morgan');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore   = require('connect-redis')(session);
var bodyParser   = require('body-parser');
var compress     = require('compression');
var helmet       = require('helmet');
var path         = require('path');

// Local Express JS Configuration
app.set('port', process.env.PORT || 3000);
app.enable('trust proxy');
app.disable('x-powered-by');
app.disable('etag');
app.use(logger('dev'));
app.use(bodyParser());
app.use(compress());

// app.use(helmet.csp());
app.use(helmet.xframe());
app.use(helmet.hsts());
app.use(helmet.iexss());
app.use(helmet.contentTypeOptions());
app.use(helmet.cacheControl());

app.use(cookieParser());
if(process.env.REDISCLOUD_URL){
    app.use(session({
        key: 'sessionId',
        secret: 'pocketask-dev@2014Apr3',
        cookie: {
            maxAge: 12*60*60*1000
        },
        store: new RedisStore({
            url: process.env.REDISCLOUD_URL,
            ttl: 12*60*60
        })
    }));
} else {
    app.use(session({
        key: 'sessionId',
        secret: 'pocketask-dev@2014Apr3',
        cookie: {
            maxAge: 12*60*60*1000
        }
    }));
}

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/partial', express.static(__dirname + '/public/partial'));

// Routes to access static pages
require('./routes')(express, app, path);

require('./routes/api')(express, app);

app.use(function(req, res, next){
    console.log(req.session);
    if (!req.session.login) {
        res.redirect('/signin');
    }
    next();
});

app.get('/dashboard', function(req, res){
    if (!req.session.role) {
        res.redirect('/signin');
    }
    res.redirect('/' + req.session.role +'/dashboard');
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