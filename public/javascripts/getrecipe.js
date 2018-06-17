var app_id = "0fff2101";
var app_key = "bd0bfdcb16a04cbedd6edb90bb76965f";

socket.on("food_response", function(data){
  $('#recipe .modal-content h4').html(data);

  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://test-es.edamam.com/search?q=+" + data + "+&app_id=" + app_id + "&app_key=" + app_key,
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
    return Number(options.fn(this)).parseInt;
  })

  var modal = $('.modal');
  var modal_recipe = M.Modal.getInstance(modal, {
    dismissible: false
  });
  $('.progress').hide();
  $('#takePhoto').removeClass("disabled");
  modal_recipe.open();

});
