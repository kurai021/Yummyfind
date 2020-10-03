var searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    $('.progress').show();
    $('#takePhoto').addClass("disabled");
    
    socket.emit("foodForm",searchInput.value)
  }
});

socket.on("food_response_as_form", function(nameFood,recipeList){
  $('#recipe .modal-content h4').html(nameFood);

  var recipes_source = $("#recipes-list").html();
  var recipes_template = Handlebars.compile(recipes_source);
  var wrapper = {objects: recipeList};

  var recipes = recipes_template(wrapper);
  var recipes_container = $("#recipes_container");
  recipes_container.html(recipes);

  var modal = $('.modal');
  var modal_recipe = M.Modal.getInstance(modal, {
    dismissible: false
  });

  searchInput.value = '';
  modal_recipe.open();
  $('.progress').hide();
  $('#takePhoto').removeClass("disabled");

  socket.emit("calculateScoreForm", yummyfindscore.scorecard().level);

  socket.on("resScoreForm", function(data){
    updateScore(data);
  })

});
