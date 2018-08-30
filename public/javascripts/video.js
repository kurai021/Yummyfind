var mediaSource = new MediaSource();

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

  var param = {
    audio:false,
    video: {
      facingMode:{ideal: "environment"}
    }
  };

  navigator.mediaDevices.getUserMedia(param)
  updateScore();

}
