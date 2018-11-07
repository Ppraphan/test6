/*ฟังก์ชันแสดงฟอร์มสำหรับเพิ่มหน่วยงานใหม่-หน่วยงาน*/
$(document).ready(function() {
  $('#addDepmentBtn').click(function() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getAllCountry',
      dataType: 'json',
      success: function(rows) {

        $('#getCountry').empty();
        $('#getUni').empty();
        for (var i = 0; i < rows.length; i++) {
          $('#getCountry').append('<option value="' + rows[i].countryISOCode + '">' + rows[i].countryName + '</option>')
        }
      }
    });

    var editDE = document.getElementById("555");
    var addDE = document.getElementById("666");
    var showDE = document.getElementById("showDataElm");
    if (addDE.style.display === "none") {
      addDE.style.display = "block";
      editDE.style.display = "none";
      showDE.style.display = "none";
    }
  });
});

/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนแก้ไข-หน่วยงาน*/
function showEditElm(data, data2, data3) {

  var x = document.getElementById("555");
  var y = document.getElementById("666");
  var z = document.getElementById("777");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("Department-table").value = data;
  var x3 = document.getElementById("Department-table").value = data2;
  var x4 = document.getElementById("Department-table").value = data3;
  document.getElementById("12").innerHTML = x2;
  document.getElementById("13").value = x2;
  document.getElementById("14").innerHTML = x3;
  document.getElementById("15").value = x4;
};

/*ฟังก์ชันดึงรายชื่อมหาลัยทั้งหมด จากประเทศที่เลือก-หน่วยงาน*/
$(document).ready(function() {
  var availableTags = [];
  $('#getCountry').change(function() {
    $(".getUniClass ").on('keyup keydown change ', function() {
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
          // $('#getUni').append('<option>' + rows[i].uniName + '</option>'),
          availableTags.push(rows[i].uniName);
        };

      }
    });
    /*สร้าง auto complete โดย vanilla */
    var my_autoComplete = new autoComplete({
    selector: 'input[name="getUniName"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = availableTags;
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});
  });

  /*ฟังก์ชัน ปิด-เปิดปุ่มเพิ่มมหาวิทลัยใหม่ เมื่อที่กรอก ไม่มีอยู่ในระบบ*/
  $(".getUniClass ").on('keyup keydown change ', function() {
    var element = document.getElementById("addBtnUnityID");
    element.classList.add("disabled")
    $(function() {
      var a = document.forms["dpmentFormName"]["getUniName"].value;
      var count = 0;
      var found = 0;
      if (a == null || a == "") {
        return false;
      }
      for (var i = 0; i < availableTags.length; i++) {
        if (a != availableTags[i]) {
          count++;
        } else {
          found++;
        }
      };
      if (found == 0) {
        addBtnUnityID.classList.remove("disabled");
      } else {
        var element = document.getElementById("addBtnUnityID");
        element.classList.add("disabled")
      }
    });
  });


});

/*ฟังก์ชันดึงรายชื่อคณะทั้งหมด จากมหาวิทยาลัยที่เลือก-หน่วยงาน*/
$(document).ready(function() {
  var availableTags2 = [];
  $('#getUni').change(function() {
    availableTags2 = [];
    $('#getFaculty').empty();
    var UniData = $('#getUni').val();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getFacultyinUni/?UniData=' + UniData,
      dataType: 'json',
      success: function(rows) {
        for (var i = 0; i < rows.length; i++) {
          // $('#getUni').append('<option>' + rows[i].uniName + '</option>'),
          availableTags2.push(rows[i].facultyName);
        };

      }
    });
    /*สร้าง auto complete โดย vanilla */
    var my_autoComplete2 = new autoComplete({
    selector: 'input[name="getFacultyname"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = availableTags2;
        var matches = [];
        for (i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});
  });

  /*ฟังก์ชัน ปิด-เปิดปุ่มเพิ่มมหาวิทลัยใหม่ เมื่อที่กรอก ไม่มีอยู่ในระบบ*/
  $(".getFacultyClass").on('keyup keydown change', function() {
    var element = document.getElementById("addBtnFacultyID");
    element.classList.add("disabled")
    $(function() {
      var a = document.forms["dpmentFormName"]["getFacultyname"].value;
      var count = 0;
      var found = 0;
      if (a == null || a == "") {
        return false;
      }
      for (var i = 0; i < availableTags2.length; i++) {
        if (a != availableTags2[i]) {
          count++;
        } else {
          found++;
        }
      };
      if (found == 0) {
        addBtnFacultyID.classList.remove("disabled");
      } else {
        var element = document.getElementById("addBtnFacultyID");
        element.classList.add("disabled")
      }
    });
  });


});
