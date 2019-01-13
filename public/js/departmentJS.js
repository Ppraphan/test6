/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่มมหาลัย(ยกเลิกการเพิ่มมหาลัย)*/
$(document).ready(function() {
  $('#cancelAddUnityID').click(function() {
    availableTags = [];
    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewUni = document.getElementById("addDataElmNewUni");
    if (addDataElmNewUni.style.display === "block") {
      addDataElmNewUni.style.display = "none";
      addDataElm.style.display = "block";
    }
  });
});

/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่มมหาลัย(ยกเลิกการเพิ่มคณะ)*/
$(document).ready(function() {
  $('#cancelAddFacultyID').click(function() {
    availableTags = [];
    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewFaculty = document.getElementById("addDataElmNewFaculty");
    if (addDataElmNewFaculty.style.display === "block") {
      addDataElmNewFaculty.style.display = "none";
      addDataElm.style.display = "block";
    }
  });
});

/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่มคณะ(ยกเลิกการเพิ่มคณะ)*/
$(document).ready(function() {
  $('#cancelAdddepartmentID').click(function() {
    availableTags = [];
    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewdepartment = document.getElementById("addDataElmNewdepartment");
    if (addDataElmNewdepartment.style.display === "block") {
      addDataElmNewdepartment.style.display = "none";
      addDataElm.style.display = "block";
    }
  });
});

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
        $('#getFaculty').empty();
        $('#selectDpmantID').empty();

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

    var txtTopSearch = document.getElementById("txtSearchDepartment");
    txtTopSearch.classList.add("hide");

    if (showDE.style.display === "block") {
      showDE.style.display = "none";
      editDE.style.display = "none";
      addDE.style.display = "block";
      element.classList.add("hide");
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
      element.classList.remove("hide");
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
  $("#getCountry").on('keyup keydown change ', function() {
    $('#getUni').empty();
    $('#getFaculty').empty();
    $('#selectDpmantID').empty();
    // var element = document.getElementById("addBtnUnityID");
    // element.classList.add("notGoneJustDisappear");

    var countryData = $('#getCountry').val();
 
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getUniinCountry/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        $('#getUni').append('<option selected="selected">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#getUni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>');
        };
      }
    });

    addBtnUnityID.classList.remove("hide");
    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มคณะ*/
    var element = document.getElementById("addBtnFacultyID");
    element.classList.add("hide");
    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มหน่วยงานหลัก*/
    var element = document.getElementById("addBtnDpmentID");
    element.classList.add("hide");
    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มหน่วยงานย่อย*/
    var element = document.getElementById("addBtnSubDpmentID");
    element.classList.add("hide");

    // var a = document.forms["dpmentFormName"]["getUniName"].value;
    //
    //   if (a != ""){
    //     element.classList.add("notGoneJustDisappear");
    //   }
    //   else{
    //       addBtnUnityID.classList.remove("notGoneJustDisappear");
    //   }

    // var element = document.getElementById("addBtnUnityID");
    // element.classList.add("disabled");
    // var a = document.forms["dpmentFormName"]["getUniName"].value;
    // var a = $('#getUni').val();
    // $(function() {
    //   if (a == "") {
    //     addBtnUnityID.classList.remove("disabled");
    //   } else {
    //     element.classList.add("disabled");
    //   }
    // });

  });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อคณะทั้งหมด จากมหาวิทยาลัยที่เลือก*/
$(document).ready(function() {
  $("#getUni").on('change', function() {
    var uniData = $('#getUni').val();
    $('#getFaculty').empty();
    $('#selectDpmantID').empty();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getFacultyinUni/?uniData=' + uniData,
      dataType: 'json',
      success: function(rows) {
        $('#getFaculty').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#getFaculty').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>');
        };
      }
    });

    var element = document.getElementById("addBtnUnityID");
    element.classList.add("hide");

    addBtnFacultyID.classList.remove("hide");

    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มหน่วยงานหลัก*/
    var element = document.getElementById("addBtnDpmentID");
    element.classList.add("hide");
    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มหน่วยงานย่อย*/
    var element = document.getElementById("addBtnSubDpmentID");
    element.classList.add("hide");

  });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อหน่วยงานหลักทั้งหมด จากคณะที่เลือก*/
$(document).ready(function() {
  $("#getFaculty").on('change', function() {
    var facultyID = $('#getFaculty').val();
    $('#selectDpmantID').empty();

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getDpmentinFac/?facultyID=' + facultyID,
      dataType: 'json',
      success: function(rows) {
        $('#selectDpmantID').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#selectDpmantID').append('<option value="' + rows[i].departmentID + '">' + rows[i].departmentName + '</option>');

        };
      }
    });

    var element = document.getElementById("addBtnFacultyID");
    element.classList.add("hide");

    addBtnDpmentID.classList.remove("hide");

    /*คำสั่งซ่อนการแสดงผลของปุ่มเพิ่มหน่วยงานย่อย*/
    var element = document.getElementById("addBtnSubDpmentID");
    element.classList.add("hide");
  });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อหน่วยงานย่อยทั้งหมด จากหน่วยงานหลักที่เลือก*/
$(document).ready(function() {
  $("#selectDpmantID").on('change', function() {

    var element = document.getElementById("addBtnDpmentID");
    element.classList.add("hide");

    addBtnSubDpmentID.classList.remove("hide");

  });

});


/*รีเซตปุ่ม*/
function resetbtn() {
  var txtTopSearch = document.getElementById("txtSearchDepartment");
  txtTopSearch.classList.remove("hide");

  var element = document.getElementById("addBtnUnityID");
  element.classList.add("hide");

  var element = document.getElementById("addBtnFacultyID");
  element.classList.add("hide");

  var element = document.getElementById("addBtnDpmentID");
  element.classList.add("hide");

  var element = document.getElementById("addBtnSubDpmentID");
  element.classList.add("hide");

}


/*กันค่าnull*/
$(document).ready(function() {
  $('#IDFormForNewUni .field input').keyup(function() {

    var empty = false;
    $('.field input').each(function() {
      if ($(this).val().length == 0) {
        empty = true;
      }
    });

    if (empty) {
      $('.actions input').attr('disabled', 'disabled');
    } else {
      $('.actions input').removeAttr('disabled');
    }
  });
});
