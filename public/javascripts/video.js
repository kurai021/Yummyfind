var mediaSource = new MediaSource();

var video = document.getElementById("webcamfeed"); //the video
var takePhoto = document.getElementById("takePhoto"); //the button
var photosource = document.getElementById("photo-source"); //the canvas

photosource.width = 720;
photosource.height = 480;

takePhoto.ontouchend = function(){
  $('.progress').show();
  $('#takePhoto').addClass("disabled");
  
  photosource.width = video.videoWidth;
  photosource.height = video.videoHeight;

  photosource.getContext("2d").drawImage(video, 0, 0, photosource.width, photosource.height);
  var img = photosource.toDataURL("image/png");
  var base64result = img.substr(img.indexOf(',') + 1);

  socket.emit("food", base64result);
};

document.getElementById("searchTab").ontouchend = function(){
  document.querySelector(".videoContainer").style.display ="none"
  document.querySelector(".range-form").style.display = "none"
}

document.getElementById("cameraTab").ontouchend = function(){
  document.querySelector(".videoContainer").style.display = "block"
  document.querySelector(".range-form").style.display = "block"

  var param = {
    audio:false,
    video: {
      facingMode:{ideal: "environment"}
    }
  };

  navigator.mediaDevices.getUserMedia(param)
    .then(async stream => {
      video.srcObject = stream;
      await sleep(1000);

      var track = stream.getVideoTracks()[0];
      var capabilities = track.getCapabilities();
      var settings = track.getSettings();

      var zoom_control = document.querySelector('input[type="range"]');

      if (!('zoom' in capabilities)) {
        return Promise.reject('Zoom is not supported by ' + track.label);
      }

      // Map zoom to a slider element.
      zoom_control.min = capabilities.zoom.min;
      zoom_control.max = capabilities.zoom.max;
      zoom_control.step = capabilities.zoom.step;
      zoom_control.value = settings.zoom;

      zoom_control.oninput = function(event) {
        track.applyConstraints({advanced: [ {zoom: event.target.value} ]});
      }
  })
  .catch(err =>{
    console.log(err);
  });

  updateScore();
}

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
