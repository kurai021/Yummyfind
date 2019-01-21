socket.on("food_response", function(data){
  $('#recipe .modal-content h4').html(data);

  $.ajax({
    url: "https://test-es.edamam.com/search?q=" + data + "&app_id=" + app_id + "&app_key=" + app_key,
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

  Handlebars.registerHelper('tohttps', function(options){
    var value = options.fn(this).replace(/^http:\/\//i, 'https://');
    return value;
  })

  Handlebars.registerHelper('translate', function(options) {

    switch (options.fn(this)) {
      case "Calcium":
        return "Calcio"
        break;
      case "Carbs":
        return "Carbohidratos"
        break;
      case "Cholesterol":
        return "Colésterol"
        break;
      case "Monounsaturated":
        return "Grasas Monoinsaturadas"
        break;
      case "Polyunsaturated":
        return "Grasas Polinsaturadas"
        break;
      case "Sugars":
        return "Azucar"
        break;
      case "Fat":
        return "Grasas"
        break;
      case "Trans":
        return "Grasas Trans"
        break;
      case "Iron":
        return "Hierro"
        break;
      case "Fiber":
        return "Fibra"
        break;
      case "Folate":
        return "Ácido Fólico"
        break;
      case "Potassium":
        return "Potasio"
        break;
      case "Magnessium":
        return "Magnesio"
        break;
      case "Sodium":
        return "Sodio"
        break;
      case "Vitamin B6":
        return "Vitamina B6"
        break;
      case "Energy":
        return "Energía"
        break;
      case "Niacin (B3)":
        return "Niacina (B3)"
        break;
      case "Phosphorus":
        return "Fósforo"
        break;
      case "Protein":
        return "Proteina"
        break;
      case "Riboflavin (B2)":
        return "Riboflavina (B2)"
        break;
      case "Sugar, added":
        return "Azucar, agregada"
        break;
      case "Saturated":
        return "Grasas Saturadas"
        break;
      case "Vitamin E":
        return "Vitamina E"
        break;
      case "Vitamin A":
        return "Vitamina A"
        break;
      case "Vitamin B12":
        return "Vitamina (B12)"
        break;
      case "Folate (food)":
        return "Ácido Fólico (comida)"
        break;
      case "Folic Acid":
        return "Ácido Fólico (comida)"
        break;
      case "Vitamin C":
        return "Vitamina C"
        break;
      case "Vitamin D":
        return "Vitamina D"
        break;
      case "Vitamin K":
        return "Vitamina K"
        break;
      case "Thiamin (B1)":
        return "Tiamina (B1)"
        break;
      case "Balanced":
        return "Balanceado"
        break;
      case "High-Fiber":
        return "Alto en fibra"
        break;
      case "High-Protein":
        return "Alto en proteina"
        break;
      case "Low-Carb":
        return "Bajo en carbohidratos"
        break;
      case "Low-Fat":
        return "Bajo en grasas"
        break;
      case "Low-Sodium":
        return "Bajo en sodio"
        break;
      case "Alcohol-Free":
        return "Libre de alcohol"
        break;
      case "Celery-Free":
        return "Libre de apio"
        break;
      case "Crustacean-Free":
        return "Libre de crustacios"
        break;
      case "Dairy-Free":
        return "Libre de lacteos"
        break;
      case "Egg-Free":
        return "Libre de huevos"
        break;
      case "Fish-Free":
        return "Libre de pescado"
        break;
      case "Gluten-Free":
        return "Libre de gluten"
        break;
      case "Kidney-Friendly":
        return "Amigable con los riñones"
        break;
      case "Kosher":
        return "kosher"
        break;
      case "Low-Potassium":
        return "Bajo en potasio"
        break;
      case "Lupine-Free":
        return "Libre de altramuz"
        break;
      case "Mustard-Free":
        return "Libre de mostaza"
        break;
      case "Low-Fat-Abs":
        return "Bajo en grasa"
        break;
      case "No-Oil-Added":
        return "Sin aceite agregado"
        break;
      case "Low-Sugar":
        return "Bajo en azucar"
        break;
      case "Paleo":
        return "Paleolítico"
        break;
      case "Peanut-Free":
        return "Sin cacahuate/maní"
        break;
      case "Pecatarian":
        return "Pescetariano"
        break;
      case "Pescatarian":
        return "Pescetariano"
        break;
      case "Pork-Free":
        return "Libre de cerdo"
        break;
      case "Red-Meat-Free":
        return "Libre de carnes rojas"
        break;
      case "Sesame-Free":
        return "Libre de sésamo"
        break;
      case "Shellfish-Free":
        return "Libre de mariscos"
        break;
      case "Soy-Free":
        return "Libre de soya"
        break;
      case "Sugar-Conscious":
        return "Consiente del azúcar"
        break;
      case "Tree-Nut-Free":
        return "Sin frutos secos"
        break;
      case "Vegan":
        return "Vegano"
        break;
      case "Vegetarian":
        return "Vegetariano"
        break;
      case "Wheat-Free":
        return "Sin trigo"
        break;
      default:
        return options.fn(this);
        break;
    }

  })

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
