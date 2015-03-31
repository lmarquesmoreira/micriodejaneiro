
var express = require('express');
var session = require('express-session');

var engine = require('ejs-locals');
/*var favicon = require('serve-favicon');
var logger = require('morgan');*/

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var load = require('express-load');
var mongoose = require('mongoose');
var app = express();

global.db = mongoose.connect('mongodb://localhost/micrjapp');


// configuracoes iniciais
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
            secret: 'micrjapp',   
            resave: true,
            saveUninitialized: true,
            key: 'session'}
        ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//roteamento
load('models').then('controllers').then('routes').into(app);
//app.use('/', routes);
//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
