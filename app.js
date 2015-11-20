var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var setttings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

// view engine setup
app.engine('.html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:setttings.cookieSecret,
  key:setttings.db,
  cookie:{ secure:false,maxAge:1000*60*60*24*30},
  store:new MongoStore({
    db:setttings.db,
    host:setttings.host,
    port:setttings.port
  })
}));
=

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('back/errorStack', {
    message: err.message,
    error: {}
  });
});

app.get("/",function(req,res){
  res.redirect("/back");
})
app.use('/back', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('back/error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000);
module.exports = app;
