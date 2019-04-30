/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนอัปเดท-รูปบบงานวิจัย*/
function openEditDiv(data) {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("researchformTable").value = data;
  document.getElementById("id_RF_Edit_label_oldrFormName").innerHTML = x2;
  document.getElementById("id_RF_Edit_hideInput_oldrFormName").value = x2;
};

function myFunction2() {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");
  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};

function myFunction2() {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};


/*ฟังก์ชัน ตรวจสอบค่า*/
$(document).ready(function() {
  var availableTagsForNewResearchForm = [];


  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

  document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");
  document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");


  availableTagsForNewResearchForm = [];

  $.ajax({
    type: 'GET',
    url: '/research-form/reqAlltype/',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchForm.push(r2[i].researchformName);
      }
    }
  });

  /*Check Error*/
  $('#id_RF_Add_Input_rFormName').keyup(function() {

    var inputBoxRF = document.getElementById('id_RF_Add_Input_rFormName').value;
    var inputBoxRFlowcase = inputBoxRF.toLowerCase();
    var choicesRF = availableTagsForNewResearchForm;
    for (let i = 0; i < choicesRF.length; i++) {

      var resultOfsearchRF = choicesRF.includes(inputBoxRFlowcase);
      if (resultOfsearchRF == false) {
        var empt2yRF = false;
        $('.RFCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2yRF = true;
          }
        });

        if ($.trim($('#id_RF_Add_Input_rFormName').val()) == '') {
          $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

          /*Emptyinput*/
          document.getElementById("id_RF_Add_Div_alertEmptryName").classList.remove("hide");
          document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");


        } else {
          /*เคสผ่าน*/
          $('#id_RF_Add_Confirm_newrFormName').removeAttr('disabled');

          document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");
          document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");

        }

      } else {
        /*Duplicateinput*/
        $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

        document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.remove("hide");
        document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");

      }
    }

  });
});


// $(document).ready(function() {
//   $('#id_RS_edit_OpenEditRSName').click(function() {
//     var availableTagsForEDITResearchStrategic = [];
//
//     /*Init แถบแจ้งเตือน และปุ่ม*/
//     $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');
//
//     var el3 = document.getElementById("id_RS_label_alertEmptryName_1");
//     el3.classList.add("hide");
//
//     var el4 = document.getElementById("id_RS_label_alertDuplicateName_1");
//     el4.classList.add("hide");
//
//     availableTagsForEDITResearchStrategic = [];
//
//     $.ajax({
//       type: 'GET',
//       url: './research-strategic/reqAlltype',
//       dataType: 'json',
//       success: function(r2) {
//         for (var i = 0; i < r2.length; i++) {
//           availableTagsForEDITResearchStrategic.push(r2[i].rsearchStrategicName);
//         }
//       }
//     });
//
//     /*Check Error*/
//     $('#id_RS_input_rsNewname').keyup(function() {
//
//       var inputBoxRFEdit = document.getElementById('id_RS_input_rsNewname').value;
//       var inputBoxlowcaseRSEdit = inputBoxRFEdit.toLowerCase();
//       var choices3RSEdit = availableTagsForEDITResearchStrategic;
//       for (let i = 0; i < choices3RSEdit.length; i++) {
//
//         var resultOfsearc3hRSEdit = choices3RSEdit.includes(inputBoxlowcaseRSEdit);
//         if (resultOfsearc3hRSEdit == false) {
//           var empty3RSEdit = false;
//           $('.RSCLASSINPUTEDITfield input').each(function() {
//             if ($(this).val().length == 0) {
//               empty3RSEdit = true;
//             }
//           });
//
//           if ($.trim($('#id_RS_input_rsNewname').val()) == '') {
//             $('#id_RS_comfirm_editRSName').attr('disabled', 'disabled');
//
//             /*Emptyinput*/
//             var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
//             elementalertEmptryName3.classList.remove("hide");
//
//             var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
//             elementalertDuplicateName3.classList.add("hide");
//
//           } else {
//             /*เคสผ่าน*/
//             $('#id_RS_comfirm_editRSName').removeAttr('disabled');
//
//             var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
//             elementalertDuplicateName3.classList.add("hide");
//
//             var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
//             elementalertEmptryName3.classList.add("hide");
//           }
//
//         } else {
//           /*Duplicateinput*/
//           $('#id_RS_comfirm_editRSName').attr('disabled', 'disabled');
//
//           var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
//           elementalertDuplicateName3.classList.remove("hide");
//
//           var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
//           elementalertEmptryName3.classList.add("hide");
//         }
//       }
//
//     });
//
//
//   });
// });
