var http = require('http');
var config = require ("./config.js");
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/

app.use(session({
  secret: config.KEY.SESSION,
  resave: false,
  saveUnintialized: false
}))

mongoose.Promise = global.Promise;
// connect to mongo database 
mongoose.connect("mongodb://localhost/recipesdb", function(err){
  if (err) {
    throw new Error('Error connecting to Mongodb instance');
  }
});

var server = http.createServer(app);

server.listen(app.get('port'), "0.0.0.0", function() {
  console.log('Server running on port: ' + server. address().port);
  console.log('Host: ', server.address().address);
});