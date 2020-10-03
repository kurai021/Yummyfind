const fs = require('fs')
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3')
const { IamAuthenticator } = require('ibm-watson/auth')
const fetch = require("node-fetch")

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

          var foodRecognition = new VisualRecognitionV3({
            version: '2018-03-19',
            authenticator: new IamAuthenticator({
              apikey: process.env.VISUALRECOGKEY,
            }),
            serviceUrl: process.env.VISUALRECOGURL,
          });
  
          var paramsFoodRecognition = {
            imagesFile: fs.createReadStream('./' + socket.id + '.png'),
            classifierIds: ['food'],
            acceptLanguage: "es"
          }

          foodRecognition.classify(paramsFoodRecognition)
            .then(res => {
              var resFood;

              resFood = res.result.images[0].classifiers[0].classes[0].class.replace(/-/g, ' ');

              fetch("https://kurai021-cors-anywhere.herokuapp.com/https://test-es.edamam.com/search?q=" + resFood + "&app_id=" + process.env.EDAMAMID + "&app_key=" + process.env.EDAMAMKEY)
                .then((res) => {
                  return res.json()
                })
                .then((data) => {
                  socket.emit("food_response",resFood,data.hits)
                })
                .catch(err => console.log(err))

            })
            .catch(err => {
              console.log(err)
            })
  
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

        socket.on('foodForm',function(data){

          fetch("https://kurai021-cors-anywhere.herokuapp.com/https://test-es.edamam.com/search?q=" + data + "&app_id=" + process.env.EDAMAMID + "&app_key=" + process.env.EDAMAMKEY)
                .then((res) => {
                  return res.json()
                })
                .then((data) => {
                  socket.emit("food_response_as_form",data,data.hits)
                })
                .catch(err => console.log(err))


          socket.on('calculateScoreForm', function(level) {
            var res;
            if (level < 10) {
              res = Math.round(level * 0.5);
            } else {
              res = Math.round(level * 5);
            }
            socket.emit("resScoreForm", res);
          });

        })
  });
}

module.exports = {
    start: start
}