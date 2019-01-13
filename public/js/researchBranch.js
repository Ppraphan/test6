/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงยืนยันการลบ-สาขางานวิจัย*/
function getfordeleteRSTType(researchbranchName, researchbranchID) {
  document.getElementById("RT_SHOW_ID_RSTtypeName").innerHTML = researchbranchName;
  document.getElementById("RT_HIDE_VALUE_RSTtypeName").value = researchbranchID;

};

/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนอัปเดท-สาขางานวิจัย*/
function openEditDiv(data) {
  var x = document.getElementById("id_RB_Edit_Div");
  var y = document.getElementById("id_RB_Add_Div");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("researchbranchTable").value = data;
  document.getElementById("id_RB_Edit_label_oldrBranchName").innerHTML = x2;
  document.getElementById("id_RB_Edit_hideInput_oldrBranchName").value = x2;
};

function myFunction2() {
  var x = document.getElementById("id_RB_Edit_Div");
  var y = document.getElementById("id_RB_Add_Div");
  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};

function myFunction2() {
  var x = document.getElementById("id_RB_Edit_Div");
  var y = document.getElementById("id_RB_Add_Div");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};


/*ฟังก์ชัน ตรวจสอบค่า*/
$(document).ready(function() {
  var availableTagsForNewResearchBranch = [];


  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#id_RB_Add_Confirm_newrBranchName').attr('disabled', 'disabled');

  var el1 = document.getElementById("id_RB_Add_Div_alertEmptryName");
  el1.classList.add("hide");

  var el2 = document.getElementById("id_RB_Add_Div_alertDuplicateName");
  el2.classList.add("hide");

  availableTagsForNewResearchBranch = [];

  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8080/research-branch/reqAlltype',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchBranch.push(r2[i].researchbranchName);
      }
    }
  });

  /*Check Error*/
  $('#id_RB_Add_Input_rBranchName').keyup(function() {

    var inputBo2x = document.getElementById('id_RB_Add_Input_rBranchName').value;
    var inputBo2xlowcase = inputBo2x.toLowerCase();
    var choice2s = availableTagsForNewResearchBranch;
    for (let i = 0; i < choice2s.length; i++) {

      var resultOfsearc2h = choice2s.includes(inputBo2xlowcase);
      if (resultOfsearc2h == false) {
        var empt2y = false;
        $('.RBCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2y = true;
          }
        });

        if ($.trim($('#id_RB_Add_Input_rBranchName').val()) == '') {
          $('#id_RB_Add_Confirm_newrBranchName').attr('disabled', 'disabled');

          /*Emptyinput*/
          var elementalertEmptryName2 = document.getElementById("id_RB_Add_Div_alertEmptryName");
          elementalertEmptryName2.classList.remove("hide");

          var elementalertDuplicateName2 = document.getElementById("id_RB_Add_Div_alertDuplicateName");
          elementalertDuplicateName2.classList.add("hide");

        } else {
          /*เคสผ่าน*/
          $('#id_RB_Add_Confirm_newrBranchName').removeAttr('disabled');

          var elementalertDuplicateName2 = document.getElementById("id_RB_Add_Div_alertDuplicateName");
          elementalertDuplicateName2.classList.add("hide");

          var elementalertEmptryName2 = document.getElementById("id_RB_Add_Div_alertEmptryName");
          elementalertEmptryName2.classList.add("hide");
        }

      } else {
        /*Duplicateinput*/
        $('#id_RB_Add_Confirm_newrBranchName').attr('disabled', 'disabled');

        var elementalertDuplicateName2 = document.getElementById("id_RB_Add_Div_alertDuplicateName");
        elementalertDuplicateName2.classList.remove("hide");

        var elementalertEmptryName2 = document.getElementById("id_RB_Add_Div_alertEmptryName");
        elementalertEmptryName2.classList.add("hide");
      }
    }

  });
});


$(document).ready(function() {
  $('#id_RB_Display_DivTable_RBTable').click(function() {
    var availableTagsForEDITResearchBranch = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#id_RB_Add_Confirm_newrBranchName').attr('disabled', 'disabled');

    var el3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
    el3.classList.add("hide");

    var el4 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
    el4.classList.add("hide");

    availableTagsForEDITResearchBranch = [];

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/research-branch/reqAlltype',
      dataType: 'json',
      success: function(r2) {
        for (var i = 0; i < r2.length; i++) {
          availableTagsForEDITResearchBranch.push(r2[i].researchbranchName);
        }
      }
    });

    /*Check Error*/
    $('#id_RB_Edit_input_newrBranchName').keyup(function() {

      var inputBo2xz2 = document.getElementById('id_RB_Edit_input_newrBranchName').value;
      var inputBo2xz2lowcase = inputBo2xz2.toLowerCase();
      var choices4 = availableTagsForEDITResearchBranch;
      for (let i = 0; i < choices4.length; i++) {

        var resultOfsearc3hsd = choices4.includes(inputBo2xz2lowcase);
        if (resultOfsearc3hsd == false) {
          var empty3a = false;
          $('.RBCLASSINPUTEDITfield input').each(function() {
            if ($(this).val().length == 0) {
              empty3a = true;
            }
          });

          if ($.trim($('#id_RB_Edit_input_newrBranchName').val()) == '') {
            $('#id_RB_Edit_Comfirm_ChangedRBName').attr('disabled', 'disabled');

            /*Emptyinput*/
            var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
            elementalertEmptryName3.classList.remove("hide");

            var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
            elementalertDuplicateName3.classList.add("hide");

          } else {
            /*เคสผ่าน*/
            $('#id_RB_Edit_Comfirm_ChangedRBName').removeAttr('disabled');

            var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
            elementalertDuplicateName3.classList.add("hide");

            var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
            elementalertEmptryName3.classList.add("hide");
          }

        } else {
          /*Duplicateinput*/
          $('#id_RB_Edit_Comfirm_ChangedRBName').attr('disabled', 'disabled');

          var elementalertDuplicateName3 = document.getElementById("id_RB_Add_DivEdit_DuplicateName");
          elementalertDuplicateName3.classList.remove("hide");

          var elementalertEmptryName3 = document.getElementById("id_RB_Add_DivEdit_alertEmptryName");
          elementalertEmptryName3.classList.add("hide");
        }
      }

    });


  });
});
