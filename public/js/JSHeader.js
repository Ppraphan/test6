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

  // passes on every "a" tag
  $(".accordion  a").each(function() {
    // checks if its the same on the address bar
    if (url == (this.href)) {
        $(this).closest("a").addClass("active2");
        $('#accordion').foundation('down', $(this).closest(".sublevel-1"));
    }


  });



});
