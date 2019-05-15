/*
$(document).ready(function() {
  $('ul li a').click(function() {
    $('ul li a').removeClass("active");
    $(this).addClass("active");
  });
});
*/
$(function() {
  // this will get the full URL at the address bar
  var url = window.location.href;
  var currentLocation = window.location.pathname;
  var singupurl =  "/signup";
  var user_url = "user";

  var currentLocation3 = window.location.pathname.split('/')[1];

  // passes on every "a" tag
  $(".accordion  a").each(function() {
    // checks if its the same on the address bar
    if (url == (this.href)) {
        $(this).closest("a").addClass("active2");
        $('#accordion').foundation('down', $(this).closest(".sublevel-1"));
    }
  });

  if(currentLocation == singupurl ){
    $("#newuseridnavi").closest("a").addClass("active2");
    $('#accordion').foundation('down', $("#newuseridnavi").closest(".sublevel-1"));
  }

  if(currentLocation3 == user_url){
    $("#cerrentuseridnavi").closest("a").addClass("active2");
    $('#accordion').foundation('down', $("#cerrentuseridnavi").closest(".sublevel-1"));
  }

});
