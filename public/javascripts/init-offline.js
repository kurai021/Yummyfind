$('.modal').modal();

var modal = $('.modal');
var modal_offline = M.Modal.getInstance(modal);

window.onload = function(){
  modal_offline.open();
}
