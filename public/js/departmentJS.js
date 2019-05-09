/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่ม(ยกเลิกการเพิ่มมหาลัย)*/
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

/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่ม(ยกเลิกการเพิ่มคณะ)*/
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

/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่ม(ยกเลิกการเพิ่มหน่วยงานหลัก)*/
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

/*ฟังก์ชันปิดการแสดงผลของ หน้าเพิ่ม(ยกเลิกการเพิ่มหน่วยงานย่อย)*/
$(document).ready(function() {
  $('#cancelAddsubdepartmentID').click(function() {
    availableTags = [];
    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewSubdepartment = document.getElementById("addDataElmNewSubdepartment");
    if (addDataElmNewSubdepartment.style.display === "block") {
      addDataElmNewSubdepartment.style.display = "none";
      addDataElm.style.display = "block";
    }
  });
});

/*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด */
$(document).ready(function() {
  $('#addDepmentBtn').click(function() {
    $.ajax({
      type: 'GET',
      url: '/Department/getAllCountry/',
      dataType: 'json',
      success: function(rows) {
        $('#getCountry').empty();
        $('#getUni').empty();
        $('#getFaculty').empty();
        $('#selectDpmantID').empty();

        $('#getCountry').append('<option disabled="disabled" selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#getCountry').append('<option value="' + rows[i].countryISOCode + '">' + rows[i].countryName + '</option>');
        }
      }
    });
    /*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด-เปิดปิดเอเลเมนการแสดงผล */
    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");
    var editDepmentBtn = document.getElementById("editDepmentBtn");

    var txtTopSearch = document.getElementById("txtSearchDepartment");
    txtTopSearch.classList.add("hide");

    if (showDE.style.display === "block") {
      showDE.style.display = "none";
      editDE.style.display = "none";
      addDE.style.display = "block";
      element.classList.add("hide");
      editDepmentBtn.classList.add("hide");
    }
  });
  /*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด-เปิดปิดเอเลเมนการแสดงผล */
  $('#resetAddDpment').click(function() {
    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");
    var editDepmentBtn = document.getElementById("editDepmentBtn");

    if (addDE.style.display === "block") {
      addDE.style.display = "none";
      editDE.style.display = "none";

      showDE.style.display = "block";
      element.classList.remove("hide");
      editDepmentBtn.classList.remove("hide");
    }
  });
});

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
      url: '/Department/getUniinCountry/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        $('#getUni').append('<option disabled="disabled" selected="selected">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if(rows[i].uniName!='-'&&rows[i].uniName!='example'){
            $('#getUni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>');
          }
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
      url: '/Department/getFacultyinUni/?uniData=' + uniData,
      dataType: 'json',
      success: function(rows) {
        $('#getFaculty').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if(rows[i].facultyName!='-'){
            $('#getFaculty').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>');
          }
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
      url: '/Department/getDpmentinFac/?facultyID=' + facultyID,
      dataType: 'json',
      success: function(rows) {
        $('#selectDpmantID').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if(rows[i].departmentName!='-'){
            $('#selectDpmantID').append('<option value="' + rows[i].departmentID + '">' + rows[i].departmentName + '</option>');
          }
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
  document.getElementById("txtSearchDepartment").classList.remove("hide");

  document.getElementById("addBtnUnityID").classList.add("hide");
  document.getElementById("addBtnFacultyID").classList.add("hide");
  document.getElementById("addBtnDpmentID").classList.add("hide");
  document.getElementById("addBtnSubDpmentID").classList.add("hide");


  /*หน้าแก้ไข*/
  document.getElementById("editBtnUnityID_edit").classList.add("hide");
  document.getElementById("delBtnUnityID_edit").classList.add("hide");

  document.getElementById("editBtnFacultyID_edit").classList.add("hide");
  document.getElementById("delBtnFacultyID_edit").classList.add("hide");

  document.getElementById("editBtnDpmentID_edit").classList.add("hide");
  document.getElementById("delBtnDpmentID_edit").classList.add("hide");

  document.getElementById("editBtnSubDpmentID_edit").classList.add("hide");
  document.getElementById("delBtnSubDpmentID_edit").classList.add("hide");
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
