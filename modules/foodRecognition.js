var fs = require('fs');
var VisualRecognitionV3 = require(
    'watson-developer-cloud/visual-recognition/v3'
);
var LanguageTranslatorV3 = require(
    'watson-developer-cloud/language-translator/v3'
);

function start(io) {
    io.on("connection", function(socket) {
        console.log("cliente conectado: " + socket.id);
  
        socket.on('food', function(data) {
  
          fs.writeFile(socket.id + '.png', data, 'base64', function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("procesando imagen...");
            }
          });
  
          var classifier_ids = ["food"];
          var foodRecognition = new VisualRecognitionV3({
            iam_apikey: "29FGiJOHYzd4DqSP9TI8ofWFK-WcskFDhEkwsbHWRhE0",
            url: "https://gateway.watsonplatform.net/visual-recognition/api",
            version: '2018-03-19'
          });
          var languageTranslator = new LanguageTranslatorV3({
            url: "https://gateway.watsonplatform.net/language-translator/api",
            iam_apikey: "vuMQmo4aBjtjgFEkO8OKsjfAF299CrWSI_MTI-nk9Hvu",
            version: "2018-05-01"
          });
  
          var paramsFoodRecognition = {
            images_file: fs.createReadStream('./' + socket.id + '.png'),
            classifier_ids: classifier_ids
          }
  
          foodRecognition.classify(paramsFoodRecognition, function(err, res) {
            var en_food;
            var es_food;
  
            if (err) {
              console.log(err);
            } else {
              en_food = res.images[0].classifiers[0].classes[0].class.replace(/-/g, ' ');
  
              var paramsTranslator = {
                text: en_food,
                model_id: 'en-es'
              };
  
              languageTranslator.translate(paramsTranslator, function(err, res) {
                  if (err) {
                    console.log(err);
                  } else {
                    switch (en_food) {
                      case "lasagna":
                        socket.emit("food_response", "lasaña");
                        break;
                      case "california roll":
                        socket.emit("food_response", "california roll");
                        break;
                      case "saltine":
                        socket.emit("food_response", "galleta de soda");
                        break;
                      case "crackers":
                        socket.emit("food_response", "galleta");
                        break;
                      case "pico de gallo":
                        socket.emit("food_response", "pico de gallo");
                        break;
                      case "Valencia orange":
                        socket.emit("food_response", "naranja");
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
  
          socket.on('calculateScoreForm', function(level) {
            var res;
            if (level < 10) {
              res = Math.round(level * 0.5);
            } else {
              res = Math.round(level * 5);
            }
            socket.emit("resScoreForm", res);
          });
  
          socket.on('calculateScoreCamera', function(level) {
            var res;
            if (level < 10) {
              res = Math.round(level);
            } else {
              res = Math.round(level * 10);
            }
            socket.emit("resScoreCamera", res);
          });
        });
  });
}

module.exports = {
    start: start
}