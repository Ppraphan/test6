// /*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด */
// $(document).ready(function() {
//   $('#addformBtn').click(function() {
//     $.ajax({
//       type: 'post',
//       url: 'http://127.0.0.1:8080/forms',
//       dataType: 'json',
//       success: function() {
//         alertbox.show('Hello! This is a message.');
//       }
//     });
//   });
//
//   /* attach a submit handler to the form */
//   $("#searchForm").submit(function(event) {
//
//     /* stop form from submitting normally */
//     event.preventDefault();
//
//     /* get some values from elements on the page: */
//     var $form = $(this),
//       term = $form.find('input[name="s"]').val(),
//       url = $form.attr('action');
//
//     /* Send the data using post */
//     var posting = $.post('http://127.0.0.1:8080/forms', {
//       s: term
//     });
//
//     /* Put the results in a div */
//     // posting.done(function(data) {
//     //   var content = $(data).find('#content');
//     //   $("#result").empty().append(content);
//     // });
//   });
//
// });
