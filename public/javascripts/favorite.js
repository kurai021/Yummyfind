var db = new Dexie("FavoriteRecipes");

$( document ).ready(function() {
  db.version(1).stores({
     recipes: "++id,image,label,ingredients,totalfacts,dietlabels,url"
   });

   db.recipes.toArray().then(function (myFavoriteRecipes){
     var favorite_source = $("#favorite-list").html();
     var favorite_template = Handlebars.compile(favorite_source);
     var wrapper = {objects: myFavoriteRecipes};
     console.log(wrapper);

     var favorites = favorite_template(wrapper);
     var favorite_container = $("#favorite_container");
     favorite_container.html(favorites);

   }).catch(function (e) {
       alert ("Error: " + (e.stack || e));
   });
});

$('#recipe').on('click', '.favoritebtn', function(elem) {

  var $target = $(elem.target);

  db.recipes.add({
    image: $target.parents('.card').find('img.activator').attr('src'),
    label: $target.parents('.card').find('.card-content .card-title').html(),
    ingredients: $target.parents('.card').find('#ingredients tbody').html(),
    totalfacts: $target.parents('.card').find('#totalfacts tbody').html(),
    dietlabels: $target.parents('.card').find('.chip-container').html(),
    url: $target.parents('.card').find('.card-action a').attr('href')
  }).then(function(){
    return db.recipes.toArray();
  }).then(function (myFavoriteRecipes) {

     var favorite_source = $("#favorite-list").html();
     var favorite_template = Handlebars.compile(favorite_source);
     var wrapper = {objects: myFavoriteRecipes};
     console.log(wrapper);

     var favorites = favorite_template(wrapper);
     var favorite_container = $("#favorite_container");
     favorite_container.html(favorites);

   }).catch(function (e) {
       alert ("Error: " + (e.stack || e));
   });

});


$('#favorite').on('click', '.deletebtn', function(elem) {

  var $target = $(elem.target);

  db.recipes.where("url").equals($target.parents('.card').find('.card-action a').attr('href')).delete().then(function(){
    return db.recipes.toArray();
  }).then(function (myFavoriteRecipes){

    var favorite_source = $("#favorite-list").html();
    var favorite_template = Handlebars.compile(favorite_source);
    var wrapper = {objects: myFavoriteRecipes};
    console.log(wrapper);

    var favorites = favorite_template(wrapper);
    var favorite_container = $("#favorite_container");
    favorite_container.html(favorites);

  }).catch(function (e) {
      alert ("Error: " + (e.stack || e));
  });

});
