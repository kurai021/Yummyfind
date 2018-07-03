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

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

var app = express();

var server = require('https').Server(options, app);
//var server = require('http').Server(app);
var io = require("socket.io")(server);

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const {translate} = require('deepl-translator');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

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
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var opts = {};
opts.port = process.argv[2] || "";

io.on("connection", function(socket) {
  console.log("cliente conectado: " + socket.id);

  socket.on('food', function(data) {

    fs.writeFile(socket.id + '.png', data, {encoding: 'base64'});

    var classifier_ids = ["food"];
    var foodRecognition = new VisualRecognitionV3({iam_apikey: "wGzSoa7OKxMHlhohXCF3CVkl74AS6eXBPU5fcoWGG9oU", url: "https://gateway.watsonplatform.net/visual-recognition/api", version: '2018-03-19'});

    var paramsFoodRecognition = {
      images_file: fs.createReadStream('./' + socket.id + '.png'),
      classifier_ids: classifier_ids
    }

    foodRecognition.classify(paramsFoodRecognition, function(err, res) {
      var en_food;
      var es_food;

      if (err) {
        console.log(err);
      }

      else {
        en_food = res.images[0].classifiers[0].classes[0].class.replace(/-/g, ' ');

        translate(en_food, 'ES', 'EN').then(function (res) {
          switch(en_food){
            case "california roll":
              socket.emit("food_response", "california roll");
              break;
            case "saltine":
              socket.emit("food_response", "galleta de soda");
              break;
            case "asparagus":
              socket.emit("food_response", "esparragos");
              break;
            case "non food":
              socket.emit("food_response", "no es un alimento");
              break;
            default:
              socket.emit("food_response", res.translation);
              break;
          }
        }).catch(console.error);

      }

    });

  });

  socket.on('calculateScoreForm', function(level){
    var res;
    if(level < 10){
      res = Math.round(level*0.5);
      console.log("form menor 10: " + level);
    }
    else {
      res = Math.round(level*5);
      console.log("form mayor 10: " + level);
    }
    socket.emit("resScoreForm", res);
  });

  socket.on('calculateScoreCamera', function(level){
    var res;
    if(level < 10){
      res = Math.round(level);
      console.log("camara menor 10");
    }
    else {
      res = Math.round(level*10);
      console.log("camara mayor 10");
    }
    socket.emit("resScoreCamera", res);
  });
});

module.exports = {
  app: app,
  server: server
};
