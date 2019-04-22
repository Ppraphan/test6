/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงยืนยันการลบ-ประเภทงานวิจัย*/
function getfordeleteRSTType(name_researchType, idresearchType) {
  document.getElementById("RT_SHOW_ID_RSTtypeName").innerHTML = name_researchType;
  document.getElementById("RT_HIDE_VALUE_RSTtypeName").value = idresearchType;

};

/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนอัปเดท-ประเภทงานวิจัย*/
function myFunction(data) {
  var x = document.getElementById("555");
  var y = document.getElementById("666");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("researchtypeTable").value = data;
  document.getElementById("12").innerHTML = x2;
  document.getElementById("13").value = x2;
};

function myFunction2() {
  var x = document.getElementById("555");
  var y = document.getElementById("666");
  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};

function myFunction2() {
  var x = document.getElementById("555");
  var y = document.getElementById("666");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};


/*ฟังก์ชัน ตรวจสอบค่า*/
$(document).ready(function() {
  var availableTagsForNewResearchType = [];


  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#RTIDCONFIRMNewResearchType').attr('disabled', 'disabled');

  var el1 = document.getElementById("RTIDADDalertEmptryName");
  el1.classList.add("hide");

  var el2 = document.getElementById("RTIDADDalertDuplicateName");
  el2.classList.add("hide");

  availableTagsForNewResearchType = [];

  $.ajax({
    type: 'GET',
    url: ajaxURL+'/research-type/reqAlltype',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchType.push(r2[i].Name_researchType);
      }
    }
  });

  /*Check Error*/
  $('#RTIDINPUTNewResearchType').keyup(function() {

    var inputBo2x = document.getElementById('RTIDINPUTNewResearchType').value;
    var inputBo2xlowcase = inputBo2x.toLowerCase();
    var choice2s = availableTagsForNewResearchType;
    for (let i = 0; i < choice2s.length; i++) {

      var resultOfsearc2h = choice2s.includes(inputBo2xlowcase);
      if (resultOfsearc2h == false) {
        var empt2y = false;
        $('.RTCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2y = true;
          }
        });

        if ($.trim($('#RTIDINPUTNewResearchType').val()) == '') {
          $('#RTIDCONFIRMNewResearchType').attr('disabled', 'disabled');

          /*Emptyinput*/
          var elementalertEmptryName2 = document.getElementById("RTIDADDalertEmptryName");
          elementalertEmptryName2.classList.remove("hide");

          var elementalertDuplicateName2 = document.getElementById("RTIDADDalertDuplicateName");
          elementalertDuplicateName2.classList.add("hide");

        } else {
          /*เคสผ่าน*/
          $('#RTIDCONFIRMNewResearchType').removeAttr('disabled');

          var elementalertDuplicateName2 = document.getElementById("RTIDADDalertDuplicateName");
          elementalertDuplicateName2.classList.add("hide");

          var elementalertEmptryName2 = document.getElementById("RTIDADDalertEmptryName");
          elementalertEmptryName2.classList.add("hide");
        }

      } else {
        /*Duplicateinput*/
        $('#RTIDCONFIRMNewResearchType').attr('disabled', 'disabled');

        var elementalertDuplicateName2 = document.getElementById("RTIDADDalertDuplicateName");
        elementalertDuplicateName2.classList.remove("hide");

        var elementalertEmptryName2 = document.getElementById("RTIDADDalertEmptryName");
        elementalertEmptryName2.classList.add("hide");
      }
    }

  });
});


$(document).ready(function() {
  $('#RTIDEDNAMEResearchType').click(function() {
    var availableTagsForEDITResearchType = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#RTIDCONFIRMNewResearchType').attr('disabled', 'disabled');

    var el3 = document.getElementById("RTIDEDalertEmptryName");
    el3.classList.add("hide");

    var el4 = document.getElementById("RTIDEDalertDuplicateName");
    el4.classList.add("hide");

    availableTagsForEDITResearchType = [];

    $.ajax({
      type: 'GET',
      url: ajaxURL+'/research-type/reqAlltype',
      dataType: 'json',
      success: function(r2) {
        for (var i = 0; i < r2.length; i++) {
          availableTagsForEDITResearchType.push(r2[i].Name_researchType);
        }
      }
    });

    /*Check Error*/
    $('#RTIDINPUT_EDIT_NewResearchType').keyup(function() {

      var inputBo2x2 = document.getElementById('RTIDINPUT_EDIT_NewResearchType').value;
      var inputBo2x2lowcase = inputBo2x2.toLowerCase();
      var choices3 = availableTagsForEDITResearchType;
      for (let i = 0; i < choices3.length; i++) {

        var resultOfsearc3h = choices3.includes(inputBo2x2lowcase);
        if (resultOfsearc3h == false) {
          var empty3 = false;
          $('.RTCLASSINPUTEDITfield input').each(function() {
            if ($(this).val().length == 0) {
              empty3 = true;
            }
          });

          if ($.trim($('#RTIDINPUT_EDIT_NewResearchType').val()) == '') {
            $('#RTIDCONFIRMEDITResearchType').attr('disabled', 'disabled');

            /*Emptyinput*/
            var elementalertEmptryName3 = document.getElementById("RTIDEDalertEmptryName");
            elementalertEmptryName3.classList.remove("hide");

            var elementalertDuplicateName3 = document.getElementById("RTIDEDalertDuplicateName");
            elementalertDuplicateName3.classList.add("hide");

          } else {
            /*เคสผ่าน*/
            $('#RTIDCONFIRMEDITResearchType').removeAttr('disabled');

            var elementalertDuplicateName3 = document.getElementById("RTIDEDalertDuplicateName");
            elementalertDuplicateName3.classList.add("hide");

            var elementalertEmptryName3 = document.getElementById("RTIDEDalertEmptryName");
            elementalertEmptryName3.classList.add("hide");
          }

        } else {
          /*Duplicateinput*/
          $('#RTIDCONFIRMEDITResearchType').attr('disabled', 'disabled');

          var elementalertDuplicateName3 = document.getElementById("RTIDEDalertDuplicateName");
          elementalertDuplicateName3.classList.remove("hide");

          var elementalertEmptryName3 = document.getElementById("RTIDEDalertEmptryName");
          elementalertEmptryName3.classList.add("hide");
        }
      }

    });


  });
});
