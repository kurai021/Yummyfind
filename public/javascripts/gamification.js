var yummyfindscore = new Score(
 {
    persistant:true,          // uses localStorage — default: true
    //callback:function(){}   // callback when levelling up
    levels:                  // custom levels
    [
       {
          "checkmark": 0,
          "status": "Apprenti",
          "quote": "Tu camino para convertirte en un chef profesional comienza"
       },
       {
          "checkmark": 5,
          "status": "Plongeur",
          "quote": "No te olvides de limpiar los platos"
       },
       {
          "checkmark": 10,
          "status": "Marmiton",
          "quote": "Por supuesto también limpia las ollas"
       },
       {
          "checkmark": 25,
          "status": "Garcon de cousine",
          "quote": "Ya tienes la experiencia para asistir en la cocina"
       },
       {
          "checkmark": 50,
          "status": "Tournant",
          "quote": "Debes ser más rápido ayudando a los demás en la cocina"
       },
       {
          "checkmark": 100,
          "status": "Garde Manger",
          "quote": "Prueba preparando aperitivos"
       },
       {
          "checkmark": 200,
          "status": "Entremetier Legumier",
          "quote": "¿Has probado a cocinar platos veganos?"
       },
       {
          "checkmark": 500,
          "status": "Entremetier Potager",
          "quote": "¿Qué te parece intentar con cocidos?"
       },
       {
          "checkmark": 1000,
          "status": "Boucher",
          "quote": "Eres el encargado de cortar las aves y carnes"
       },
       {
          "checkmark": 2000,
          "status": "Saucier",
          "quote": "Como Saucier tu deber es preparar las salsas y emplatar"
       },
       {
          "checkmark": 3000,
          "status": "Grillardin",
          "quote": "En las grandes cocinas tu deber seria asar carnes y pescado"
       },
       {
          "checkmark": 5000,
          "status": "Friturier",
          "quote": "¿Qué tan bueno eres haciendo frituras?... no olvides vigilar la sartén"
       },
       {
          "checkmark": 7000,
          "status": "Rostisseur",
          "quote": "Eres una figura respetada por el Grillardín y el Friturier"
       },
       {
          "checkmark": 10000,
          "status": "Poissonier",
          "quote": "Tienes el nivel para preparar pescados y mariscos, hora de demostrar tus habilidades"
       },
       {
          "checkmark": 20000,
          "status": "Patissier",
          "quote": "Hora de aprender sobre reposteria, panadería y heladería"
       },
       {
          "checkmark": 40000,
          "status": "Commis",
          "quote": "El commis reporta directamente al Chef de partie y se encarga del mantenimiento de su estación de trabajo"
       },
       {
          "checkmark": 60000,
          "status": "Cousinier",
          "quote": "Tu trabajo es encargarte de la preparación de un plato específico"
       },
       {
          "checkmark": 100000,
          "status": "Chef de partie",
          "quote": "Hora de gestionar tu estación de trabajo"
       },
       {
          "checkmark": 250000,
          "status": "Sous-chef de cousine",
          "quote": "Tu camino para convertirte en un Chef de cousine está casi completo, no olvides repasar los platos que has aprendido"
       },
       {
          "checkmark": 500000,
          "status": "Chef de cousine",
          "quote": "Eres todo un maestro, como jefe de cocina ahora debes crear menús, ayuda a tus Apprentie y no olvides vigilar la limpieza de la cocina"
       }
    ]
 }
);
