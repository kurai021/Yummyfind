var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var fs = require('fs');

/*var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  requestCert: false,
  rejectUnauthorized: false
};*/

var app = express();

//var server = require('https').Server(options, app);
var server = require('http').Server(app);
var io = require("socket.io")(server);
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

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
    var languageTranslator = new LanguageTranslatorV2({"url": "https://gateway.watsonplatform.net/language-translator/api", "username": "862fde39-3eb1-4eef-895e-f5f764720059", "password": "lWJeDyNJctFA"});

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

        var paramsTranslator = {
          text: en_food,
          model_id: 'en-es'
        };

        languageTranslator.translate(paramsTranslator, function(err, res) {
          if (err) {
            console.log(err);
          }
          else {
            switch(en_food){
              case "lasagna":
                socket.emit("food_response", "lasaña");
                break;
              case "california roll":
                socket.emit("food_response", "california roll");
                break;
              case "non food":
                socket.emit("food_response", "no es un alimento");
                break;
              default:
                es_food = res.translations[0].translation;
                socket.emit("food_response", es_food);
                break;
            }

          }
        });
      }

    });

  });
});

module.exports = {
  app: app,
  server: server
};
