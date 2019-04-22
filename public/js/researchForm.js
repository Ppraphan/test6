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
    url: ajaxURL + '/research-form/reqAlltype',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchForm.push(r2[i].researchFormName);
      }
    }
  });

  /*Check Error*/
  $('#id_RF_Add_Input_rFormName').keyup(function() {

    var inputBo2xRFForm = document.getElementById('id_RF_Add_Input_rFormName').value;
    var inputBo2xlowcaseRFForm = inputBo2xRFForm.toLowerCase();
    var choice2sRFForm = availableTagsForNewResearchForm;
    for (let i = 0; i < choice2sRFForm.length; i++) {

      var resultOfsearc2hRFForm = choice2sRFForm.includes(inputBo2xlowcaseRFForm);
      if (resultOfsearc2hRFForm == false) {
        var empt2yRFForm = false;
        $('.RFCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2yRFForm = true;
          }
        });

        if ($.trim($('#id_RF_Add_Input_rFormName').val()) == '') {
          $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

          /*Emptyinput*/
          var id_RF_Add_Div_alertEmptryName = document.getElementById("id_RF_Add_Div_alertEmptryName");
          id_RF_Add_Div_alertEmptryName.classList.remove("hide");

          var id_RF_Add_Div_alertDuplicateName = document.getElementById("id_RF_Add_Div_alertDuplicateName");
          id_RF_Add_Div_alertDuplicateName.classList.add("hide");

        } else {
          /*เคสผ่าน*/
          $('#id_RF_Add_Confirm_newrFormName').removeAttr('disabled');

          var id_RF_Add_Div_alertDuplicateName = document.getElementById("id_RF_Add_Div_alertDuplicateName");
          id_RF_Add_Div_alertDuplicateName.classList.add("hide");

          var id_RF_Add_Div_alertEmptryName = document.getElementById("id_RF_Add_Div_alertEmptryName");
          id_RF_Add_Div_alertEmptryName.classList.add("hide");
        }

      } else {
        /*Duplicateinput*/
        $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

        var id_RF_Add_Div_alertDuplicateName = document.getElementById("id_RF_Add_Div_alertDuplicateName");
        id_RF_Add_Div_alertDuplicateName.classList.remove("hide");

        var id_RF_Add_Div_alertEmptryName = document.getElementById("id_RF_Add_Div_alertEmptryName");
        id_RF_Add_Div_alertEmptryName.classList.add("hide");
      }
    }

  });
});


$(document).ready(function() {
  $('#id_RF_Display_DivTable_RFTable').click(function() {
    var availableTagsForEDITResearchFrom = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

    var el3 = document.getElementById("id_RF_Add_DivEdit_alertEmptryName");
    el3.classList.add("hide");

    var el4 = document.getElementById("id_RF_Add_DivEdit_DuplicateName");
    el4.classList.add("hide");

    availableTagsForEDITResearchFrom = [];

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/research-form/reqAlltype',
      dataType: 'json',
      success: function(r2) {
        for (var i = 0; i < r2.length; i++) {
          availableTagsForEDITResearchFrom.push(r2[i].ResearchFormName);
        }
      }
    });

    /*Check Error*/
    $('#id_RF_Edit_input_newrFormName').keyup(function() {

      var inputBo2xz2RFForm = document.getElementById('id_RF_Edit_input_newrFormName').value;
      var inputBo2xz2RFFormlowcase = inputBo2xz2RFForm.toLowerCase();
      var choices4RFForm = availableTagsForEDITResearchFrom;
      for (let i = 0; i < choices4RFForm.length; i++) {

        var resultOfsearc3hsdRFForm = choices4RFForm.includes(inputBo2xz2RFFormlowcase);
        if (resultOfsearc3hsdRFForm == false) {
          var empty3aRFForm = false;
          $('.RFCLASSINPUTEDITfield input').each(function() {
            if ($(this).val().length == 0) {
              empty3aRFForm = true;
            }
          });

          if ($.trim($('#id_RF_Edit_input_newrFormName').val()) == '') {
            $('#id_RF_Edit_Comfirm_ChangedRFName').attr('disabled', 'disabled');

            /*Emptyinput*/
            var id_RF_Add_DivEdit_alertEmptryName = document.getElementById("id_RF_Add_DivEdit_alertEmptryName");
            id_RF_Add_DivEdit_alertEmptryName.classList.remove("hide");

            var id_RF_Add_DivEdit_DuplicateName = document.getElementById("id_RF_Add_DivEdit_DuplicateName");
            id_RF_Add_DivEdit_DuplicateName.classList.add("hide");

          } else {
            /*เคสผ่าน*/
            $('#id_RF_Edit_Comfirm_ChangedRFName').removeAttr('disabled');

            var id_RF_Add_DivEdit_DuplicateName = document.getElementById("id_RF_Add_DivEdit_DuplicateName");
            id_RF_Add_DivEdit_DuplicateName.classList.add("hide");

            var id_RF_Add_DivEdit_alertEmptryName = document.getElementById("id_RF_Add_DivEdit_alertEmptryName");
            id_RF_Add_DivEdit_alertEmptryName.classList.add("hide");
          }

        } else {
          /*Duplicateinput*/
          $('#id_RF_Edit_Comfirm_ChangedRFName').attr('disabled', 'disabled');

          var id_RF_Add_DivEdit_DuplicateName = document.getElementById("id_RF_Add_DivEdit_DuplicateName");
          id_RF_Add_DivEdit_DuplicateName.classList.remove("hide");

          var id_RF_Add_DivEdit_alertEmptryName = document.getElementById("id_RF_Add_DivEdit_alertEmptryName");
          id_RF_Add_DivEdit_alertEmptryName.classList.add("hide");
        }
      }

    });


  });
});
