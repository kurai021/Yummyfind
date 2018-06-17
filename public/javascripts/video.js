var video = document.getElementById("webcamfeed"); //the video
var takePhoto = document.getElementById("takePhoto"); //the button
var photosource = document.getElementById("photo-source"); //the canvas

photosource.width = 720;
photosource.height = 480;

takePhoto.ontouchend = function(){
  photosource.width = video.videoWidth;
  photosource.height = video.videoHeight;

  photosource.getContext("2d").drawImage(video, 0, 0, photosource.width, photosource.height);
  var img = photosource.toDataURL("image/png");
  var base64result = img.substr(img.indexOf(',') + 1);
  console.log(base64result);

  socket.emit("food", base64result);

  $('.progress').show();
  $('#takePhoto').addClass("disabled");
};

window.onload = function(){
  $('.modal').modal();

  var param = {
    audio:false,
    video: {
      facingMode:{ideal: "environment"}
    }
  };
  console.log(param);

  navigator.mediaDevices.getUserMedia(param).then(function(stream){
    if (window.URL) {
      video.src = window.URL.createObjectURL(stream); //deprecated soon
    } else {
      video.src = stream;
      video.play();
    };
  }, function(err){
    console.log(err);
  });

}
