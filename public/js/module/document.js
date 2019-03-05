/* ไฟล์เฉพาะ ฟีเจอร์เอกสาร */
// $('input[type=file]').change(function() {
//   var hasNoFiles = this.files.length == 0;
//   $(this).closest('form') /* Select the form element */
//     .find('input[type=submit]') /* Get the submit button */
//     .prop('disabled', hasNoFiles); /* Disable the button. */
// });

$(document).ready(function() {
    $("#ID_documentForm input[type=submit]").click(function() {
        $("#ID_documentForm input").each(function() {
            if(!isNaN(this.value)) {
                // alert(this.value + " is a valid number");
                document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");
            }else{

            }
        });
        return false;
    });
});

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
      url: 'http://127.0.0.1:8080/forms/getallofname',
      dataType: 'json',
      success: function(docname) {
        for (var i = 0; i < docname.length; i++) {
          availableTagsForADDdocname.push(docname[i].documentName);
        }
      }
    });

    /*Check Error*/
    // $('#id_RB_Edit_input_newrBranchName').keyup(function() {
    //
    //   var inputBo2xz2 = document.getElementById('id_RB_Edit_input_newrBranchName').value;
    //   var inputBo2xz2lowcase = inputBo2xz2.toLowerCase();
    //   var choices4 = availableTagsForADDdocname;
    //   for (let i = 0; i < choices4.length; i++) {
    //
    //     var resultOfsearc3hsd = choices4.includes(inputBo2xz2lowcase);
    //     if (resultOfsearc3hsd == false) {
    //       var empty3a = false;
    //       $('.RBCLASSINPUTEDITfield input').each(function() {
    //         if ($(this).val().length == 0) {
    //           empty3a = true;
    //         }
    //       });
    //
    //       if ($.trim($('#id_RB_Edit_input_newrBranchName').val()) == '') {
    //         $('#id_RB_Edit_Comfirm_ChangedRBName').attr('disabled', 'disabled');
    //
    //         /*Emptyinput*/
    //         var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
    //         elementalertEmptryName3.classList.remove("hide");
    //
    //         var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
    //         elementalertDuplicateName3.classList.add("hide");
    //
    //       } else {
    //         /*เคสผ่าน*/
    //         $('#id_RB_Edit_Comfirm_ChangedRBName').removeAttr('disabled');
    //
    //         var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
    //         elementalertDuplicateName3.classList.add("hide");
    //
    //         var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
    //         elementalertEmptryName3.classList.add("hide");
    //       }
    //
    //     } else {
    //       /*Duplicateinput*/
    //       $('#id_RB_Edit_Comfirm_ChangedRBName').attr('disabled', 'disabled');
    //
    //       var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
    //       elementalertDuplicateName3.classList.remove("hide");
    //
    //       var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
    //       elementalertEmptryName3.classList.add("hide");
    //     }
    //   }
    //
    // });


  });
});
