/*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด */
$(document).ready(function() {
  $('#addDepmentBtn').click(function() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getAllCountry/',
      dataType: 'json',
      success: function(rows) {
        $('#getCountry').empty();
        $('#getUni').empty();
        $('#getCountry').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#getCountry').append('<option value="' + rows[i].countryISOCode + '">' + rows[i].countryName + '</option>')
        }
      }
    });
    /*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด-เปิดปิดเอเลเมนการแสดงผล */
    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");
    if (showDE.style.display === "block") {
      showDE.style.display = "none";
      editDE.style.display = "none";
      addDE.style.display = "block";
      element.classList.add("disabled");
    }
  });
  /*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด-เปิดปิดเอเลเมนการแสดงผล */
  $('#resetAddDpment').click(function() {
    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");

    if (addDE.style.display === "block") {
      addDE.style.display = "none";
      editDE.style.display = "none";

      showDE.style.display = "block";
      element.classList.remove("disabled");
    }
  });
});

/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนแก้ไข-หน่วยงาน*/
// function showEditElm(data, data2, data3) {
//
//   var x = document.getElementById("555");
//   var y = document.getElementById("666");
//   var z = document.getElementById("777");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//     y.style.display = "none";
//   }
//   var x2 = document.getElementById("Department-table").value = data;
//   var x3 = document.getElementById("Department-table").value = data2;
//   var x4 = document.getElementById("Department-table").value = data3;
//   document.getElementById("12").innerHTML = x2;
//   document.getElementById("13").value = x2;
//   document.getElementById("14").innerHTML = x3;
//   document.getElementById("15").value = x4;
// };

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อมหาลัยทั้งหมด จากประเทศที่เลือก*/
$(document).ready(function() {
  var availableTags = [];
  var univerID = [];
  var matUni;
  $("#getCountry").on('keyup keydown change ', function() {
    availableTags = [];
    $('#getUni').empty();
    $('#getFaculty').empty();
    var countryData = $('#getCountry').val();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getUniinCountry/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {

        for (var i = 0; i < rows.length; i++) {
          $('#getUni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>'),
            availableTags.push(rows[i].uniName);
        };
      }
    });

    // var my_autoComplete = new autoComplete({
    //   selector: 'input[name="getUniName"]',
    //   minChars: 2,
    //   source: function(term, suggest) {
    //     term = term.toLowerCase();
    //     var choices = availableTags;
    //     var matches = [];
    //     for (i = 0; i < choices.length; i++)
    //       if (~choices[i].toLowerCase().indexOf(term)) {
    //         matches.push(choices[i]);
    //       }
    //     suggest(matches);
    //   }
    // });

  });

  /*เปิดปิดปุ่มเพิ่มหาลัย*/
  // document.getElementById('getUni').addEventListener('change', function() {
  //   var element = document.getElementById("addBtnUnityID");
  //   element.classList.add("notGoneJustDisappear");
  //   $(function() {
  //
  //     var a = document.forms["dpmentFormName"]["getUniName"].value;
  //     var count = 0;
  //     var found = 0;
  //     if (a == null || a == "") {
  //       return false;
  //     }
  //     for (var i = 0; i < availableTags.length; i++) {
  //       if (a != availableTags[i]) {
  //         count++;
  //       } else {
  //         found++;
  //       }
  //     };
  //     if (found == 0) {
  //       addBtnUnityID.classList.remove("notGoneJustDisappear");
  //     } else {
  //       var element = document.getElementById("addBtnUnityID");
  //       element.classList.add("notGoneJustDisappear")
  //     }
  //   });
  // });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อคณะทั้งหมด จากมหาวิทยาลัยที่เลือก*/
$(document).ready(function() {
  var availableTags = [];
  $("#getUni").on('keyup', function() {
    availableTags = [];
    $('#getFaculty').empty();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getFacultyinUni/?uniData=' + uniData,
      dataType: 'json',
      success: function(rows) {
        for (var i = 0; i < rows.length; i++) {
          $('#getFaculty').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>'),
            availableTags.push(rows[i].facultyName);
        };
      }
    });

    var my_autoComplete = new autoComplete({
      selector: 'input[name="facultyName"]',
      minChars: 2,
      source: function(term, suggest) {
        term = term.toLowerCase();
        var choices = availableTags;
        var matches = [];
        for (i = 0; i < choices.length; i++)
          if (~choices[i].toLowerCase().indexOf(term)) {
            matches.push(choices[i]);
          }
        suggest(matches);
      }
    });

  });

  /*เปิดปิดปุ่มเพิ่มหาลัย*/
  // document.getElementById('getUni').addEventListener('change', function() {
  //   var element = document.getElementById("addBtnUnityID");
  //   element.classList.add("notGoneJustDisappear");
  //   $(function() {
  //
  //     var a = document.forms["dpmentFormName"]["getUniName"].value;
  //     var count = 0;
  //     var found = 0;
  //     if (a == null || a == "") {
  //       return false;
  //     }
  //     for (var i = 0; i < availableTags.length; i++) {
  //       if (a != availableTags[i]) {
  //         count++;
  //       } else {
  //         found++;
  //       }
  //     };
  //     if (found == 0) {
  //       addBtnUnityID.classList.remove("notGoneJustDisappear");
  //     } else {
  //       var element = document.getElementById("addBtnUnityID");
  //       element.classList.add("notGoneJustDisappear")
  //     }
  //   });
  // });

});
