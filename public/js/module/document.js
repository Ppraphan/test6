/* ไฟล์เฉพาะ ฟีเจอร์เอกสาร */
// $('input[type=file]').change(function() {
//   var hasNoFiles = this.files.length == 0;
//   $(this).closest('form') /* Select the form element */
//     .find('input[type=submit]') /* Get the submit button */
//     .prop('disabled', hasNoFiles); /* Disable the button. */
// });

// $(document).ready(function() {
//     $("#ID_documentForm input[type=submit]").click(function() {
//         $("#ID_documentForm input").each(function() {
//             if(!isNaN(this.value)) {
//                 // alert(this.value + " is a valid number");
//                 document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");
//                 $('#ID_DC_comfirm_newDoc').attr('disabled', 'disabled');
//             }else{
//               document.getElementById("ID_DC_insert_emptyname").classList.add("hide");
//               $('#ID_DC_comfirm_newDoc').removeAttr('disabled');
//             }
//         });
//         return false;
//     });
// });
//
$(document).ready(function() {
  $('#ID_DC_newForm').click(function() {
    var availableTagsForADDdocname = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');
    document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
    document.getElementById("ID_DC_insert_emptyname").classList.add("hide");

    availableTagsForADDdocname = [];

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/forms/getallofname',
      dataType: 'json',
      success: function(docname) {
        for (var i = 0; i < docname.length; i++) {
          availableTagsForADDdocname.push(docname[i].documentName);
        }
      }
    });

    /*Check Error*/
    $('#ID_documentForm #ID_DC_input_newDocName').keyup(function() {
      /*ตรวจสอบไฟล์ใน Input*/
      $('#ID_documentForm input[type=file]').change(function() {
        if (!isNaN(this.value)) {
          document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");
          $('#ID_DC_comfirm_newDoc').attr('disabled', 'disabled');
        }
      });

      let inputNewDocName = document.getElementById('ID_DC_input_newDocName').value;
      let inputNewDocNamelowcase = inputNewDocName.toLowerCase();
      let choices4NewDocName = availableTagsForADDdocname;
      for (let i = 0; i < choices4NewDocName.length; i++) {

        var resultOfsearchTagsForDocName = choices4NewDocName.includes(inputNewDocNamelowcase);
        if (resultOfsearchTagsForDocName == false) {
          if ($.trim($('#ID_documentForm #ID_DC_input_newDocName').val()) == '') {
            /*Emptyinput*/
            $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');

            document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
            document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");

          } else {
            /*เคสผ่าน*/
            $('#ID_documentForm input[type=submit]').removeAttr('disabled');

            document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
            document.getElementById("ID_DC_insert_emptyname").classList.add("hide");;
          }

        } else {
          /*Duplicateinput*/
          $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');

          document.getElementById("ID_DC_insert_duplicatename").classList.remove("hide");
          document.getElementById("ID_DC_insert_emptyname").classList.add("hide");
        }
      }
    });




  });
});
