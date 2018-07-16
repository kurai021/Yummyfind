var yummyfindscore = new Score(
 {
    persistant:true,          // uses localStorage — default: true
    //callback:function(){}   // callback when levelling up
    levels:                  // custom levels
    [
       {
          "checkmark": 0,
          "status": "Apprenti",
          "quote": "Tu camino para convertirte en un chef profesional comienza",
          "badge": "images/badges/badge-apprenti.svg"
       },
       {
          "checkmark": 5,
          "status": "Plongeur",
          "quote": "No te olvides de limpiar los platos",
          "badge": "images/badges/badge-plongeur.svg"
       },
       {
          "checkmark": 10,
          "status": "Marmiton",
          "quote": "Por supuesto también limpia las ollas",
          "badge": "images/badges/badge-marmiton.svg"
       },
       {
          "checkmark": 25,
          "status": "Aboyeur",
          "quote": "¡No te olvides de tomar ninguna orden!",
          "badge": "images/badges/badge-aboyeur.svg"
       },
       {
          "checkmark": 50,
          "status": "Garcon de cousine",
          "quote": "Ya tienes la experiencia para asistir en la cocina",
          "badge": "images/badges/badge-garcon.svg"
       },
       {
          "checkmark": 100,
          "status": "Garde Manger",
          "quote": "Prueba preparando aperitivos",
          "badge": "images/badges/badge-garde-manger.svg"
       },
       {
          "checkmark": 200,
          "status": "Entremetier Legumier",
          "quote": "¿Has probado a cocinar platos veganos?",
          "badge": "images/badges/badge-entremetier-legumier.svg"
       },
       {
          "checkmark": 500,
          "status": "Entremetier Potager",
          "quote": "¿Qué te parece intentar con cocidos?",
          "badge": "images/badges/badge-entremetier-potager.svg"
       },
       {
          "checkmark": 1000,
          "status": "Boucher",
          "quote": "Eres el encargado de cortar las aves y carnes",
          "badge": "images/badges/badge-boucher.svg"
       },
       {
          "checkmark": 2000,
          "status": "Saucier",
          "quote": "Como Saucier tu deber es preparar las salsas y emplatar",
          "badge": "images/badges/badge-saucier.svg"
       },
       {
          "checkmark": 3000,
          "status": "Grillardin",
          "quote": "Aprende como asar carnes y pescado",
          "badge": "images/badges/badge-grillardin.svg"
       },
       {
          "checkmark": 5000,
          "status": "Friturier",
          "quote": "¿Qué tan bueno eres haciendo frituras?... no olvides vigilar la sartén",
          "badge": "images/badges/badge-friturier.svg"
       },
       {
          "checkmark": 7000,
          "status": "Rotisseur",
          "quote": "Eres una figura respetada por el Grillardín y el Friturier",
          "badge": "images/badges/badge-rotisseur.svg"
       },
       {
          "checkmark": 10000,
          "status": "Poissonier",
          "quote": "Tienes el nivel para preparar pescados y mariscos, hora de demostrar tus habilidades",
          "badge": "images/badges/badge-poissonier.svg"
       },
       {
          "checkmark": 20000,
          "status": "Patissier",
          "quote": "Aprende sobre reposteria, panadería y heladería",
          "badge": "images/badges/badge-patissier.svg"
       },
       {
          "checkmark": 40000,
          "status": "Commis",
          "quote": "El commis reporta directamente al Chef de partie y se encarga del mantenimiento de su estación de trabajo",
          "badge": "images/badges/badge-commis.svg"
       },
       {
          "checkmark": 60000,
          "status": "Cousinier",
          "quote": "Tu trabajo es encargarte de la preparación de un plato específico",
          "badge": "images/badges/badge-cousinier.svg"
       },
       {
          "checkmark": 100000,
          "status": "Chef de partie",
          "quote": "Hora de gestionar tu estación de trabajo",
          "badge": "images/badges/badge-chef-de-partie.svg"
       },
       {
          "checkmark": 250000,
          "status": "Sous-chef de cousine",
          "quote": "Tu camino para convertirte en un Chef de cousine está casi completo, no olvides repasar los platos que has aprendido",
          "badge": "images/badges/badge-sous-chef-de-cousine.svg"
       },
       {
          "checkmark": 500000,
          "status": "Chef de cousine",
          "quote": "Eres todo un maestro, como jefe de cocina ahora debes crear menús, ayuda a tus Apprentie y no olvides vigilar la limpieza de la cocina",
          "badge": "images/badges/badge-chef-de-cousine.svg"
       }
    ]
 }
);


function updateScore(getScore){
  if(getScore !== undefined){
    yummyfindscore.increment(getScore);
  }
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
