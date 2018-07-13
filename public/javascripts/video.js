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

  var navbarScore_source = $("#navbarScore").html();
  var navbarScore_template = Handlebars.compile(navbarScore_source);
  var scoreSidenav_context = {score: JSON.stringify(yummyfindscore.scorecard().score)}
  var navbarScore = navbarScore_template(scoreSidenav_context);

  var sidenavScore_source = $("#sidenavScore").html();
  var sidenavScore_template = Handlebars.compile(sidenavScore_source);
  var sidenavScore_context = {
    level_status: yummyfindscore.scorecard().status,
    level_quote: yummyfindscore.scorecard().quote,
    level_badge: yummyfindscore.scorecard().badge
  }
  var sidenavScore = sidenavScore_template(sidenavScore_context);

  var scoreSidenav_container = $("#sidenavScore_container");
  scoreSidenav_container.html(sidenavScore);

  var scoreNavbar_container = $("#navbarScore_container");
  scoreNavbar_container.html(navbarScore);

}

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
