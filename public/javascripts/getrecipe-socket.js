socket.on("food_response", function(data){
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

  modal_recipe.open();

  socket.emit("calculateScoreCamera", yummyfindscore.scorecard().level);

  socket.on("resScoreCamera", function(data){
    yummyfindscore.increment(data);
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
  })

});
