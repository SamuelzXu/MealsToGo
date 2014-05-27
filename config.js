// Include all the necessary express js libraries
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var compress     = require('compression');
var helmet       = require('helmet');

/**
 * [export description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function(express, app){
    app.set('port', process.env.PORT || 3000);
    app.enable('trust proxy');
    app.disable('x-powered-by');
    app.disable('etag');

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
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
};