require("dotenv").config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var fs = require('fs');
var compression = require('compression');
var enforce = require('express-sslify');

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

var app = express();
app.use(compression());
app.use(enforce.HTTPS({
  trustProtoHeader: true
}))

var server = require('https').Server(options, app);
//var server = require('http').Server(app);
var io = require("socket.io")(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/icons/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ?
    err :
    {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var opts = {};
opts.port = process.argv[2] || "";

var consumer = require("./modules/foodRecognition")
consumer.start(io)

module.exports = {
  app: app,
  server: server
};
