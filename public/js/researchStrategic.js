/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนอัปเดท-ยุทศาสตร์งานวิจัย*/
function myFunction(data) {
  var x = document.getElementById("id_RS_Edit_Div");
  var y = document.getElementById("id_RS_New_Div");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("researchStrategicTable").value = data;
  document.getElementById("id_RS_label_rsOldname").innerHTML = x2;
  document.getElementById("id_RS_input_rsOldname").value = x2;
};

function myFunction2() {
  var x = document.getElementById("id_RS_Edit_Div");
  var y = document.getElementById("id_RS_New_Div");
  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};

function myFunction2() {
  var x = document.getElementById("id_RS_Edit_Div");
  var y = document.getElementById("id_RS_New_Div");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};


/*ฟังก์ชัน ตรวจสอบค่า*/
$(document).ready(function() {
  var availableTagsForNewResearchStrategic = [];

  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#id_RS_comfirm_newRSName').attr('disabled', 'disabled');

  var el1 = document.getElementById("id_RS_label_alertEmptryName_2");
  el1.classList.add("hide");

  var el2 = document.getElementById("id_RS_label_alertDuplicateName_2");
  el2.classList.add("hide");

  availableTagsForNewResearchStrategic = [];

  $.ajax({
    type: 'GET',
    url: './research-strategic/reqAlltype',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchStrategic.push(r2[i].rsearchStrategicName);
      }
    }
  });

  /*Check Error*/
  $('#id_RS_input_newRSName').keyup(function() {

    var inputBoxRS = document.getElementById('id_RS_input_newRSName').value;
    var inputBoxRSlowcase = inputBoxRS.toLowerCase();
    var choicesRS = availableTagsForNewResearchStrategic;
    for (let i = 0; i < choicesRS.length; i++) {

      var resultOfsearchRS = choicesRS.includes(inputBoxRSlowcase);
      if (resultOfsearchRS == false) {
        var empt2yRS = false;
        $('.RSCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2yRS = true;
          }
        });

        if ($.trim($('#id_RS_input_newRSName').val()) == '') {
          $('#id_RS_comfirm_newRSName').attr('disabled', 'disabled');

          /*Emptyinput*/
          var elementalertEmptryName2 = document.getElementById("id_RS_label_alertEmptryName_2");
          elementalertEmptryName2.classList.remove("hide");

          var elementalertDuplicateName2 = document.getElementById("id_RS_label_alertDuplicateName_2");
          elementalertDuplicateName2.classList.add("hide");

        } else {
          /*เคสผ่าน*/
          $('#id_RS_comfirm_newRSName').removeAttr('disabled');

          var elementalertDuplicateName2 = document.getElementById("id_RS_label_alertDuplicateName_2");
          elementalertDuplicateName2.classList.add("hide");

          var elementalertEmptryName2 = document.getElementById("id_RS_label_alertEmptryName_2");
          elementalertEmptryName2.classList.add("hide");
        }

      } else {
        /*Duplicateinput*/
        $('#id_RS_comfirm_newRSName').attr('disabled', 'disabled');

        var elementalertDuplicateName2 = document.getElementById("id_RS_label_alertDuplicateName_2");
        elementalertDuplicateName2.classList.remove("hide");

        var elementalertEmptryName2 = document.getElementById("id_RS_label_alertEmptryName_2");
        elementalertEmptryName2.classList.add("hide");
      }
    }

  });
});


$(document).ready(function() {
  $('#id_RS_edit_OpenEditRSName').click(function() {
    var availableTagsForEDITResearchStrategic = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#id_RS_comfirm_newRSName').attr('disabled', 'disabled');

    var el3 = document.getElementById("id_RS_label_alertEmptryName_1");
    el3.classList.add("hide");

    var el4 = document.getElementById("id_RS_label_alertDuplicateName_1");
    el4.classList.add("hide");

    availableTagsForEDITResearchStrategic = [];

    $.ajax({
      type: 'GET',
      url: './research-strategic/reqAlltype',
      dataType: 'json',
      success: function(r2) {
        for (var i = 0; i < r2.length; i++) {
          availableTagsForEDITResearchStrategic.push(r2[i].rsearchStrategicName);
        }
      }
    });

    /*Check Error*/
    $('#id_RS_input_rsNewname').keyup(function() {

      var inputBoxRSEdit = document.getElementById('id_RS_input_rsNewname').value;
      var inputBoxlowcaseRSEdit = inputBoxRSEdit.toLowerCase();
      var choices3RSEdit = availableTagsForEDITResearchStrategic;
      for (let i = 0; i < choices3RSEdit.length; i++) {

        var resultOfsearc3hRSEdit = choices3RSEdit.includes(inputBoxlowcaseRSEdit);
        if (resultOfsearc3hRSEdit == false) {
          var empty3RSEdit = false;
          $('.RSCLASSINPUTEDITfield input').each(function() {
            if ($(this).val().length == 0) {
              empty3RSEdit = true;
            }
          });

          if ($.trim($('#id_RS_input_rsNewname').val()) == '') {
            $('#id_RS_comfirm_editRSName').attr('disabled', 'disabled');

            /*Emptyinput*/
            var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
            elementalertEmptryName3.classList.remove("hide");

            var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
            elementalertDuplicateName3.classList.add("hide");

          } else {
            /*เคสผ่าน*/
            $('#id_RS_comfirm_editRSName').removeAttr('disabled');

            var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
            elementalertDuplicateName3.classList.add("hide");

            var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
            elementalertEmptryName3.classList.add("hide");
          }

        } else {
          /*Duplicateinput*/
          $('#id_RS_comfirm_editRSName').attr('disabled', 'disabled');

          var elementalertDuplicateName3 = document.getElementById("id_RS_label_alertDuplicateName_1");
          elementalertDuplicateName3.classList.remove("hide");

          var elementalertEmptryName3 = document.getElementById("id_RS_label_alertEmptryName_1");
          elementalertEmptryName3.classList.add("hide");
        }
      }

    });


  });
});
