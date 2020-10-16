var socket = io.connect();

document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelector(".tabs")
  var tabsInstance = M.Tabs.init(tabs);

  var sidenavMenu = document.querySelectorAll('.sidenav');
  var sidenavMenuInstance = M.Sidenav.init(sidenavMenu, {
    onOpenEnd: function(){
      document.querySelector(".content").style.left = "300px"
    },
    onCloseEnd: function(){
      document.querySelector(".content").style.left = "0px"
    }
  });

  var sidenavAbout = document.querySelectorAll('.about');
  var sidenavAboutInstance = M.Sidenav.init(sidenavAbout, {
    edge: "right"
  });

  var modals = document.querySelectorAll('.modal');
  var modalsInstance = M.Modal.init(modals);

  var infoChips = document.querySelectorAll('.chip');
  var infoChipsInstance = M.Chips.init(infoChips, {
    placeholder: ""
  });
});




