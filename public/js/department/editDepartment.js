/*[หน่วยงาน]-ฟังก์ชันขอข้อมูลรายชื่อประเทศทั้งหมด */
$(document).ready(function() {
  $('#editDepmentBtn').click(function() {
    $.ajax({
      type: 'GET',
      url: '/Department/getAllCountry/',
      dataType: 'json',
      success: function(rows) {
        $('#getCountry_edit').empty();
        $('#getUni_edit').empty();
        $('#getFaculty_edit').empty();
        $('#selectDpmantID_edit').empty();
        $('#selectSubDpmantID_edit').empty();

        $('#getCountry_edit').append('<option disabled="disabled" selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#getCountry_edit').append('<option value="' + rows[i].countryISOCode + '">' + rows[i].countryName + '</option>')
        }
      }
    });
    /*[หน่วยงาน][เปิดส่วนแก้ไข]-เปิดปิดเอเลเมนการแสดงผลระหว่าง ส่วนตาราง กับ ส่วนแก้ไข */
    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");
    var editDepmentBtn = document.getElementById("editDepmentBtn");

    var txtTopSearch = document.getElementById("txtSearchDepartment");
    txtTopSearch.classList.add("hide");

    if (showDE.style.display === "block") {
      showDE.style.display = "none";
      editDE.style.display = "block";
      addDE.style.display = "none";

      element.classList.add("hide");
      editDepmentBtn.classList.add("hide");
    }
  });

  /*[หน่วยงาน][ยกเลิกการแสดง]-เปิดปิดเอเลเมนการแสดงผลระหว่าง ส่วนตาราง กับ ส่วนแก้ไข */
  $('#resetEditDpment').click(function() {
    document.formEditDpment.reset();

    var editDE = document.getElementById("editDataElm");
    var addDE = document.getElementById("addDataElm");
    var showDE = document.getElementById("showDataElm");
    var element = document.getElementById("addDepmentBtn");
    var editDepmentBtn = document.getElementById("editDepmentBtn");

    if (editDE.style.display === "block") {
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
  $("#getCountry_edit").on('change', function() {

    /*รีเซตค่าใน select*/
    $('#getUni_edit').empty();
    $('#getFaculty_edit').empty();
    $('#selectDpmantID_edit').empty();
    $('#selectDpmantID_edit').empty();
    $('#selectSubDpmantID_edit').empty();

    var countryData = $('#getCountry_edit').val();

    $.ajax({
      type: 'GET',
      url: '/Department/getUniinCountry/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        $('#getUni_edit').append('<option disabled="disabled" selected="selected">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
            if( rows[i].uniName!='-'&&rows[i].uniName!='example'){
              $('#getUni_edit').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>');
            }
        };
      }
    });
    /*ซ่อนปุ่มของหน่วยงานที่ระดับสูงกว่า*/
    /*แสดงปุ่มของหน่วยงานหลัก*/
    /*ซ่อนปุ่มของหน่วยงานที่ระดับต่ำกว่า*/
    document.getElementById("editBtnUnityID_edit").classList.add("hide");
    document.getElementById("delBtnUnityID_edit").classList.add("hide");

    document.getElementById("editBtnFacultyID_edit").classList.add("hide");
    document.getElementById("delBtnFacultyID_edit").classList.add("hide");

    document.getElementById("editBtnDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnDpmentID_edit").classList.add("hide");

    document.getElementById("editBtnSubDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnSubDpmentID_edit").classList.add("hide");

  });



});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อคณะทั้งหมด จากมหาวิทยาลัยที่เลือก*/
$(document).ready(function() {
  $("#getUni_edit").on('change', function() {
    var uniData = $('#getUni_edit').val();
    $('#getFaculty_edit').empty();
    $('#selectDpmantID_edit').empty();
    $('#selectSubDpmantID_edit').empty();

    $.ajax({
      type: 'GET',
      url: '/Department/getFacultyinUni/?uniData=' + uniData,
      dataType: 'json',
      success: function(rows) {
        $('#getFaculty_edit').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if(rows[i].facultyName!='-'){
            $('#getFaculty_edit').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>');
          }
        };
      }
    });

    /*แสดงปุ่มของมหาวิทยาลัย*/
    document.getElementById("editBtnUnityID_edit").classList.remove("hide");
    document.getElementById("delBtnUnityID_edit").classList.remove("hide");

    /*ซ่อนปุ่มของหน่วยงานที่ระดับต่ำกว่า*/
    document.getElementById("editBtnFacultyID_edit").classList.add("hide");
    document.getElementById("delBtnFacultyID_edit").classList.add("hide");

    document.getElementById("editBtnDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnDpmentID_edit").classList.add("hide");

    document.getElementById("editBtnSubDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnSubDpmentID_edit").classList.add("hide");

  });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อหน่วยงานหลักทั้งหมด จากคณะที่เลือก*/
$(document).ready(function() {
  $("#getFaculty_edit").on('change', function() {
    var facultyID = $('#getFaculty_edit').val();
    $('#selectDpmantID_edit').empty();
    $('#selectSubDpmantID_edit').empty();

    $.ajax({
      type: 'GET',
      url: '/Department/getDpmentinFac/?facultyID=' + facultyID,
      dataType: 'json',
      success: function(rows) {
        $('#selectDpmantID_edit').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if( rows[i].departmentName!='-'){
            $('#selectDpmantID_edit').append('<option value="' + rows[i].departmentID + '">' + rows[i].departmentName + '</option>');
          }
        };
      }
    });

    /*ซ่อนปุ่มของหน่วยงานที่ระดับสูงกว่า*/
    document.getElementById("editBtnUnityID_edit").classList.add("hide");
    document.getElementById("delBtnUnityID_edit").classList.add("hide");

    /*แสดงปุ่มของคณะ*/
    document.getElementById("editBtnFacultyID_edit").classList.remove("hide");
    document.getElementById("delBtnFacultyID_edit").classList.remove("hide");

    /*ซ่อนปุ่มของหน่วยงานที่ระดับต่ำกว่า*/
    document.getElementById("editBtnDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnDpmentID_edit").classList.add("hide");

    document.getElementById("editBtnSubDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnSubDpmentID_edit").classList.add("hide");

  });

});

/*[หน่วยงาน]-ฟังก์ชันดึงรายชื่อหน่วยงานย่อยทั้งหมด จากหน่วยงานหลักที่เลือก*/
$(document).ready(function() {
  $("#selectDpmantID_edit").on('change', function() {

    var dpmantID = $('#selectDpmantID_edit').val();
    $('#selectSubDpmantID_edit').empty();

    $.ajax({
      type: 'GET',
      url: '/department/getSubinDpment/?dpmantID=' + dpmantID,
      dataType: 'json',
      success: function(rows) {
        $('#selectSubDpmantID_edit').append('<option disabled selected value>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          if(rows[i].Sub_Dpment_name!='-'){
            $('#selectSubDpmantID_edit').append('<option value="' + rows[i].Sub_Dpment_ID + '">' + rows[i].Sub_Dpment_name + '</option>');
          }
        };
      }
    });

    /*ซ่อนปุ่มของหน่วยงานที่ระดับสูงกว่า*/
    document.getElementById("editBtnUnityID_edit").classList.add("hide");
    document.getElementById("delBtnUnityID_edit").classList.add("hide");

    document.getElementById("editBtnFacultyID_edit").classList.add("hide");
    document.getElementById("delBtnFacultyID_edit").classList.add("hide");

    /*แสดงปุ่มของหน่วยงานหลัก*/
    document.getElementById("editBtnDpmentID_edit").classList.remove("hide");
    document.getElementById("delBtnDpmentID_edit").classList.remove("hide");

    /*ซ่อนปุ่มของหน่วยงานที่ระดับต่ำกว่า*/
    document.getElementById("editBtnSubDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnSubDpmentID_edit").classList.add("hide");

  });

});

/*[หน่วยงาน]-ฟังก์ชันหน่วยงานย่อย*/
$(document).ready(function() {
  $("#selectSubDpmantID_edit").on('change', function() {


    /*ซ่อนปุ่มของหน่วยงานที่ระดับสูงกว่า*/
    document.getElementById("editBtnUnityID_edit").classList.add("hide");
    document.getElementById("delBtnUnityID_edit").classList.add("hide");

    document.getElementById("editBtnFacultyID_edit").classList.add("hide");
    document.getElementById("delBtnFacultyID_edit").classList.add("hide");

    document.getElementById("editBtnDpmentID_edit").classList.add("hide");
    document.getElementById("delBtnDpmentID_edit").classList.add("hide");

    /*แสดงปุ่มของหน่วยงานหลัก*/
    document.getElementById("editBtnSubDpmentID_edit").classList.remove("hide");
    document.getElementById("delBtnSubDpmentID_edit").classList.remove("hide");

    /*ซ่อนปุ่มของหน่วยงานที่ระดับต่ำกว่า*/

  });

});

/* ฟังก์เปิดหน้าการแก้ไขชื่อ มหาวิทยาลัย */
function fnEditUniNameShowup() {
  /*get ชื่อมหาลัยเก่าเพื่อไปแสดงบนหน้าจอ*/v
  var getUni_edit = document.getElementById("getUni_edit");
  var text_getUni_edit = getUni_edit.options[getUni_edit.selectedIndex].text;
  document.getElementById("displayOlduniname").value = text_getUni_edit;

  /*get ID มหาลัยเก่า*/
  var oldUniID = document.getElementById("getUni_edit");
  var value_oldUniID = oldUniID.options[oldUniID.selectedIndex].value;
  document.getElementById("ID_oldUniID").value = value_oldUniID;

  /*get ID ประเทศของมหาลัยเก่า*/
  var countryData = document.getElementById("getCountry_edit");
  var value_countryData = countryData.options[countryData.selectedIndex].value;
  document.getElementById("ID_countryISOCode").value = value_countryData;

  var listUniName = [];

  $.ajax({
    type: 'GET',
    url: '/Department/getNameUniinCountry/?countryData=' + value_countryData,
    dataType: 'json',
    success: function(rows) {
      for (var i = 0; i < rows.length; i++) {
        listUniName.push(rows[i].uniName);
      }
    }
  });

  $('#id_edit_newNameUni').keyup(function() {
    var inputBox_foredituniName = document.getElementById('id_edit_newNameUni').value;

    var choices_foredituniName = listUniName;
    for (let i = 0; i < choices_foredituniName.length; i++) {

      var resultOfsearch_foredituniName = choices_foredituniName.includes(inputBox_foredituniName);
      if (resultOfsearch_foredituniName == false) {
        var empty_foredituniName = false;
        $('.fielduniname #id_edit_newNameUni').each(function() {
          if ($(this).val().length == 0) {
            empty_foredituniName = true;
          }
        });

        if ($.trim($('.fielduniname #id_edit_newNameUni').val()) == '') {
          $('#comfirmUpdateUniName').attr('disabled', 'disabled');

          var element = document.getElementById("alertEmptryName_foredituniName");
          element.classList.remove("hide");
          var element = document.getElementById("alertDuplicateName_foredituniName");
          element.classList.add("hide");
        } else {
          $('#comfirmUpdateUniName').removeAttr('disabled');

          var element = document.getElementById("alertDuplicateName_foredituniName");
          element.classList.add("hide");
          var element = document.getElementById("alertEmptryName_foredituniName");
          element.classList.add("hide");
        }

      } else {
        $('#comfirmUpdateUniName').attr('disabled', 'disabled');

        var element = document.getElementById("alertDuplicateName_foredituniName");
        element.classList.remove("hide");
        var element = document.getElementById("alertEmptryName_foredituniName");
        element.classList.add("hide");
      }
    }

  });
};

/* ฟังก์เปิดหน้าการแก้ไขชื่อ คณะ */
function fnEditFacultyNameShowup() {
  /*get ชื่อคณะเก่าเพื่อไปแสดงบนหน้าจอ*/
  var oldFacultyname = document.getElementById("getFaculty_edit");
  var text_oldFacultyname = oldFacultyname.options[oldFacultyname.selectedIndex].text;
  document.getElementById("displayOldFacultyname").value = text_oldFacultyname;

  /*get ID คณะเก่า*/
  var oldFacultyID = document.getElementById("getFaculty_edit");
  var text_oldFacultyID = oldFacultyID.options[oldFacultyID.selectedIndex].value;
  document.getElementById("ID_oldFacultyID").value = text_oldFacultyID;

  /*get ID มหาวิทยาลัยของมหาลัยเก่า*/
  var uniData = document.getElementById("getUni_edit");
  var text_olduniData = uniData.options[uniData.selectedIndex].value;
  document.getElementById("ID_uniIDforEditFacultyName").value = text_olduniData;



  var listFacultyName = [];

  $.ajax({
    type: 'GET',
    url: '/Department/getFacultyinUni/?uniData=' + text_olduniData,
    dataType: 'json',
    success: function(rows) {
      for (var i = 0; i < rows.length; i++) {
        listFacultyName.push(rows[i].facultyName);
      }
    }
  });

  $('#id_edit_newNameFaculty').keyup(function() {
    var inputBox_foreditFacultyName = document.getElementById('id_edit_newNameFaculty').value;

    var choices_foreditFacultyName = listFacultyName;
    for (let i = 0; i < choices_foreditFacultyName.length; i++) {

      var resultOfsearch_foreditFacultyName = choices_foreditFacultyName.includes(inputBox_foreditFacultyName);
      if (resultOfsearch_foreditFacultyName == false) {
        var empty_foreditFacultyName = false;
        $('.fieldFacultyname #id_edit_newNameFaculty').each(function() {
          if ($(this).val().length == 0) {
            empty_foreditFacultyName = true;
          }
        });

        if ($.trim($('.fieldFacultyname #id_edit_newNameFaculty').val()) == '') {
          $('#comfirmUpdateFacultyName').attr('disabled', 'disabled');

          var element = document.getElementById("alertEmptryName_foreditFacultyName");
          element.classList.remove("hide");
          var element = document.getElementById("alertDuplicateName_foreditFacultyName");
          element.classList.add("hide");
        } else {
          $('#comfirmUpdateFacultyName').removeAttr('disabled');

          var element = document.getElementById("alertDuplicateName_foreditFacultyName");
          element.classList.add("hide");
          var element = document.getElementById("alertEmptryName_foreditFacultyName");
          element.classList.add("hide");
        }

      } else {
        $('#comfirmUpdateFacultyName').attr('disabled', 'disabled');

        var element = document.getElementById("alertDuplicateName_foreditFacultyName");
        element.classList.remove("hide");
        var element = document.getElementById("alertEmptryName_foreditFacultyName");
        element.classList.add("hide");
      }
    }

  });
};

/* ฟังก์เปิดหน้าการแก้ไขชื่อ หน่วยงานหลัก */
function fnEditDpmentNameShowup() {
  /*get ชื่อหน่วยงานหลักเก่าเพื่อไปแสดงบนหน้าจอ*/
  var oldDpmentname = document.getElementById("selectDpmantID_edit");
  var text_oldDpmentname = oldDpmentname.options[oldDpmentname.selectedIndex].text;
  document.getElementById("displayOldDpmentname").value = text_oldDpmentname;

  /*get ID หน่วยงานหลักเก่า*/
  var oldDpmentID = document.getElementById("selectDpmantID_edit");
  var text_oldDpmentID = oldDpmentID.options[oldDpmentID.selectedIndex].value;
  document.getElementById("ID_oldDpmentID").value = text_oldDpmentID;

  /*get ID ของคณะเก่า*/
  var uniData = document.getElementById("getFaculty_edit");
  var text_olduniData = uniData.options[uniData.selectedIndex].value;
  document.getElementById("ID_uniIDforEditDpmentName").value = text_olduniData;

  var listDpmentName = [];

  $.ajax({
    type: 'GET',
    url: '/Department/getDpmentinFac/?facultyID=' + text_olduniData,
    dataType: 'json',
    success: function(rows) {
      for (var i = 0; i < rows.length; i++) {
        listDpmentName.push(rows[i].departmentName);
      }
    }
  });

  $('#id_edit_newNameDpment').keyup(function() {
    var inputBox_foreditDpmentName = document.getElementById('id_edit_newNameDpment').value;

    var choices_foreditDpmentName = listDpmentName;
    for (let i = 0; i < choices_foreditDpmentName.length; i++) {

      var resultOfsearch_foreditDpmentName = choices_foreditDpmentName.includes(inputBox_foreditDpmentName);
      if (resultOfsearch_foreditDpmentName == false) {
        var empty_foreditDpmentName = false;
        $('.fieldDpmentname #id_edit_newNameDpment').each(function() {
          if ($(this).val().length == 0) {
            empty_foreditDpmentName = true;
          }
        });

        if ($.trim($('.fieldDpmentname #id_edit_newNameDpment').val()) == '') {
          $('#comfirmUpdateDpmentName').attr('disabled', 'disabled');

          document.getElementById("alertEmptryName_foreditDpmentName").classList.remove("hide");
          document.getElementById("alertDuplicateName_foreditDpmentName").classList.add("hide");
        } else {
          $('#comfirmUpdateDpmentName').removeAttr('disabled');

          document.getElementById("alertDuplicateName_foreditDpmentName").classList.add("hide");
          document.getElementById("alertEmptryName_foreditDpmentName").classList.add("hide");
        }

      } else {
        $('#comfirmUpdateDpmentName').attr('disabled', 'disabled');

        document.getElementById("alertDuplicateName_foreditDpmentName").classList.remove("hide");
        document.getElementById("alertEmptryName_foreditDpmentName").classList.add("hide");
      }
    }

  });
};

/* ฟังก์เปิดหน้าการแก้ไขชื่อ หน่วยงานย่อย */
function fnEditSubDpmentNameShowup() {
  /*get ชื่อหน่วยงานย่อยเก่าเพื่อไปแสดงบนหน้าจอ*/
  var oldSubDpmentname = document.getElementById("selectSubDpmantID_edit");
  var text_oldSubDpmentname = oldSubDpmentname.options[oldSubDpmentname.selectedIndex].text;
  document.getElementById("displayOldSubDpmentname").value = text_oldSubDpmentname;

  /*get ID หน่วยงานย่อยเก่า*/
  var oldSubDpmentID = document.getElementById("selectSubDpmantID_edit");
  var text_oldSubDpmentID = oldSubDpmentID.options[oldSubDpmentID.selectedIndex].value;
  document.getElementById("ID_oldSubDpmentID").value = text_oldSubDpmentID;

  /*get ID ของหน่วยงานหลัก*/
  var selectDpmantID_edit = document.getElementById("selectDpmantID_edit");
  var text_selectDpmantID_edit = selectDpmantID_edit.options[selectDpmantID_edit.selectedIndex].value;
  document.getElementById("ID_uniIDforEditSubDpmentName").value = text_selectDpmantID_edit;

  var listSubDpmentName = [];

  $.ajax({
    type: 'GET',
    url: '/department/getSubinDpment/?dpmantID=' + text_selectDpmantID_edit,
    dataType: 'json',
    success: function(rows) {
      for (var i = 0; i < rows.length; i++) {
        listSubDpmentName.push(rows[i].Sub_Dpment_name);
      }
    }
  });

  $('#id_edit_newNameSubDpment').keyup(function() {
    var inputBox_foreditSubDpmentName = document.getElementById('id_edit_newNameSubDpment').value;

    var choices_foreditSubDpmentName = listSubDpmentName;
    for (let i = 0; i < choices_foreditSubDpmentName.length; i++) {

      var resultOfsearch_foreditSubDpmentName = choices_foreditSubDpmentName.includes(inputBox_foreditSubDpmentName);
      if (resultOfsearch_foreditSubDpmentName == false) {
        var empty_foreditSubDpmentName = false;
        $('.fieldSubDpmentname #id_edit_newNameSubDpment').each(function() {
          if ($(this).val().length == 0) {
            empty_foreditSubDpmentName = true;
          }
        });

        if ($.trim($('.fieldSubDpmentname #id_edit_newNameSubDpment').val()) == '') {
          $('#comfirmUpdateSubDpmentName').attr('disabled', 'disabled');

          document.getElementById("alertEmptryName_foreditSubDpmentName").classList.remove("hide");
          document.getElementById("alertDuplicateName_foreditSubDpmentName").classList.add("hide");
        } else {
          $('#comfirmUpdateSubDpmentName').removeAttr('disabled');

          document.getElementById("alertDuplicateName_foreditSubDpmentName").classList.add("hide");
          document.getElementById("alertEmptryName_foreditSubDpmentName").classList.add("hide");
        }

      } else {
        $('#comfirmUpdateSubDpmentName').attr('disabled', 'disabled');

        document.getElementById("alertDuplicateName_foreditSubDpmentName").classList.remove("hide");
        document.getElementById("alertEmptryName_foreditSubDpmentName").classList.add("hide");
      }
    }

  });
};
