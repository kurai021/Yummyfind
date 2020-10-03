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
      case "Carbs":
        return "Carbohidratos"
      case "Cholesterol":
        return "Colésterol"
      case "Monounsaturated":
        return "Grasas Monoinsaturadas"
      case "Polyunsaturated":
        return "Grasas Polinsaturadas"
      case "Sugars":
        return "Azucar"
      case "Fat":
        return "Grasas"
      case "Trans":
        return "Grasas Trans"
      case "Iron":
        return "Hierro"
      case "Fiber":
        return "Fibra"
      case "Folate":
        return "Ácido Fólico"
      case "Potassium":
        return "Potasio"
      case "Magnessium":
        return "Magnesio"
      case "Sodium":
        return "Sodio"
      case "Vitamin B6":
        return "Vitamina B6"
      case "Energy":
        return "Energía"
      case "Niacin (B3)":
        return "Niacina (B3)"
      case "Phosphorus":
        return "Fósforo"
      case "Protein":
        return "Proteina"
      case "Riboflavin (B2)":
        return "Riboflavina (B2)"
      case "Sugar, added":
        return "Azucar agregada"
      case "Saturated":
        return "Grasas Saturadas"
      case "Vitamin E":
        return "Vitamina E"
      case "Vitamin A":
        return "Vitamina A"
      case "Vitamin B12":
        return "Vitamina (B12)"
      case "Folate (food)":
        return "Ácido Fólico (comida)"
      case "Folic Acid":
        return "Ácido Fólico"
      case "Vitamin C":
        return "Vitamina C"
      case "Vitamin D":
        return "Vitamina D"
      case "Vitamin K":
        return "Vitamina K"
      case "Thiamin (B1)":
        return "Tiamina (B1)"
      case "Balanced":
        return "Balanceado"
      case "High-Fiber":
        return "Alto en fibra"
      case "High-Protein":
        return "Alto en proteina"
      case "Low-Carb":
        return "Bajo en carbohidratos"
      case "Low-Fat":
        return "Bajo en grasas"
      case "Low-Sodium":
        return "Bajo en sodio"
      case "Alcohol-Free":
        return "Libre de alcohol"
      case "Celery-Free":
        return "Libre de apio"
      case "Crustacean-Free":
        return "Libre de crustacios"
      case "Dairy-Free":
        return "Libre de lacteos"
      case "Egg-Free":
        return "Libre de huevos"
      case "Fish-Free":
        return "Libre de pescado"
      case "Gluten-Free":
        return "Libre de gluten"
      case "Kidney-Friendly":
        return "Amigable con los riñones"
      case "Kosher":
        return "Kosher"
      case "Low-Potassium":
        return "Bajo en potasio"
      case "Lupine-Free":
        return "Libre de altramuz"
      case "Mustard-Free":
        return "Libre de mostaza"
      case "Low-Fat-Abs":
        return "Bajo en grasa"
      case "No-Oil-Added":
        return "Sin aceite agregado"
      case "Low-Sugar":
        return "Bajo en azucar"
      case "Paleo":
        return "Paleolítico"
      case "Peanut-Free":
        return "Sin cacahuate/maní"
      case "Pecatarian":
        return "Pescetariano"
      case "Pescatarian":
        return "Pescetariano"
      case "Pork-Free":
        return "Libre de cerdo"
      case "Red-Meat-Free":
        return "Libre de carnes rojas"
      case "Sesame-Free":
        return "Libre de sésamo"
      case "Shellfish-Free":
        return "Libre de mariscos"
      case "Soy-Free":
        return "Libre de soya"
      case "Sugar-Conscious":
        return "Consiente del azúcar"
      case "Tree-Nut-Free":
        return "Sin frutos secos"
      case "Vegan":
        return "Vegano"
      case "Vegetarian":
        return "Vegetariano"
      case "Wheat-Free":
        return "Sin trigo"
      default:
        return options.fn(this);
    }

  })