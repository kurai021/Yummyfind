socket.on("food_response", function(nameFood,recipeList){
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

  modal_recipe.open();
  $('.progress').hide();
  $('#takePhoto').removeClass("disabled");

  socket.emit("calculateScoreCamera", yummyfindscore.scorecard().level);

  socket.on("resScoreCamera", function(data){
    updateScore(data);
  })

});
