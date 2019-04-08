var $navList = $('.menu-fancy');

$navList.on('click', 'li:not(.is-selected)', function(e){
  $navList.find(".is-selected").removeClass("is-selected");
  $(e.currentTarget).addClass("is-selected");
});


// $(document).ready(function() {
//   $('#id_ME_userPermission').click(function() {
//       document.getElementById('id_ME_userPermission').value = '';
//   });
// });
