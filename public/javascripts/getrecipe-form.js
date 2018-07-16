var searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    $('.progress').show();
    $('#takePhoto').addClass("disabled");
    getrecipewithform(searchInput.value);
  }
});

function getrecipewithform(data){
  $('#recipe .modal-content h4').html(data);

  $.ajax({
    url: "https://cors-anywhere-kurai021.herokuapp.com/https://test-es.edamam.com/search?q=" + data + "&app_id=" + app_id + "&app_key=" + app_key,
    type: "GET",
    datatype: "application/json; charset=utf-8",
    success: function(res){
        var recipes_source = $("#recipes-list").html();
        var recipes_template = Handlebars.compile(recipes_source);
        var wrapper = {objects: res.hits};
        console.log(wrapper);

        var recipes = recipes_template(wrapper);
        var recipes_container = $("#recipes_container");
        recipes_container.html(recipes);
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    },
    timeout:120000
  });

  Handlebars.registerHelper('integer', function(options){
    var value = Number(options.fn(this));
    return Math.round(value);
  })

  var modal = $('.modal');
  var modal_recipe = M.Modal.getInstance(modal, {
    dismissible: false
  });

  $('.progress').hide();
  $('#takePhoto').removeClass("disabled");

  searchInput.value = '';
  modal_recipe.open();

  socket.emit("calculateScoreForm", yummyfindscore.scorecard().level);

  socket.on("resScoreForm", function(data){
    updateScore(data);
  })

}
