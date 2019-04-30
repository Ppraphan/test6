var $navList = $('.menu-fancy');

$navList.on('click', 'li:not(.is-selected)', function(e){
  $navList.find(".is-selected").removeClass("is-selected");
  $(e.currentTarget).addClass("is-selected");
});


$(document).ready(function() {
  $('#ME_ID_editPersonalInfo').click(function() {
    document.getElementById("ME_Elm_PersonalInfo").style.display = "block";

    document.getElementById("ME_Elm_WorkInfo").style.display = "none";
    document.getElementById("ME_Elm_resetPassword").style.display = "none";
  });

  $('#ME_ID_editWorkInfo').click(function() {
    document.getElementById("ME_Elm_WorkInfo").style.display = "block";

    document.getElementById("ME_Elm_PersonalInfo").style.display = "none";
    document.getElementById("ME_Elm_resetPassword").style.display = "none";
  });

  $('#ME_ID_resetPassword').click(function() {
    document.getElementById("ME_Elm_resetPassword").style.display = "block";

    document.getElementById("ME_Elm_WorkInfo").style.display = "none";
    document.getElementById("ME_Elm_PersonalInfo").style.display = "none";
  });
});
