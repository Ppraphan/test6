/*, ของงบประมาณวิจัยที่ได้รับ*/
document.getElementById("BudgetAllocated").onblur = function() {
  this.value = parseFloat(this.value.replace(/,/g, ""))
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

/*การเลือกโครงการชุด*/
$(document).ready(function() {
  $("input[name=projectSet]").on('change', function() {
    var projectSetVal = $('input[name=projectSet]:checked').val();

    if (projectSetVal == 1) {
      document.getElementById("projectMainElmID").classList.remove("hide");
    } else {
      document.getElementById("projectMainElmID").classList.add("hide");
    }

  });

});

/*การเลือกโครงการชุด*/
$(document).ready(function() {
  $("input[name=projectMain]").on('change', function() {
    var pprojectMainVal = $('input[name=projectMain]:checked').val();

    if (pprojectMainVal == 1) {
      document.getElementById("id_projectParentElm").classList.add("hide");
    } else {
      document.getElementById("id_projectParentElm").classList.remove("hide");
    }

  });

});

$(document).ready(function() {
  $("#ID_projectYears").on('keyup', function() {
    if ($(this).val() <= 0 || $(this).val() >= 9) {
      alert('กรุณาใส่ข้อมูลตั้งแต่ 1 - 8 เท่านั้น');
    }
  });
});

/*ขอรายชื่อโครงการวิจัยที่เป็นโครงการหลักจากปีที่กำหนด*/
$(document).ready(function() {
  $("#id_projectParentYear").on('change', function() {
    var budgetYear = $('#id_projectParentYear').val();
    $('#id_projectParentName').empty();

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/all-project/getmaingrantsnamefromyear/?budgetYear=' + budgetYear,
      dataType: 'json',
      success: function(rows) {
        $('#id_projectParentName').append('<option selected value="-">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#id_projectParentName').append('<option value="' + rows[i].idproject + '">' + rows[i].projectNameTH + '</option>');
        };
      }
    });

  });
});

/*เลือกทุนวิจัยจากปีที่กำหนด-*/
$(document).ready(function() { 
  $("#budgetYear").on('change', function() {
    var budgetYear = $('#budgetYear').val();
    $('#BudgetName').empty();

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/grants/getgrantsnamefromyear/?budgetYear=' + budgetYear,
      dataType: 'json',
      success: function(rows) {
        $('#BudgetName').append('<option selected value="-">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#BudgetName').append('<option value="' + rows[i].idGrants + '">' + rows[i].grants_Name + '</option>');
        };
      }
    });

  });
});

/*เพิ่มหัวหน้าโครงการ*/
$(document).ready(function() {

  var coulistLD = 0;
  $("#addLDProject").on('click', function() {
    if (coulistLD <= 9) {
      var listLDproject = document.getElementsByClassName('LDproject');
      const emailsearchUserLD = document.getElementById("searchUserLD").value;

      if ($.trim($('#searchUserLD').val()) == '') {
        document.getElementById("emptrySearchUserLD").classList.remove("hide");

        document.getElementById("notFoundSearchUserLD").classList.add("hide");
      } else {
        document.getElementById("emptrySearchUserLD").classList.add("hide");

        const aidLDIDProj = 'idLDIDProj';
        const bidLDIDProj = coulistLD;
        var cidLDIDProj = aidLDIDProj + bidLDIDProj;

        const aidLDNameProj = 'idLDNameProj';
        const bidLDNameProj = coulistLD;
        var cidLDNameProj = aidLDNameProj + bidLDNameProj;

        const aidLDLnameProj = 'idLDLnameProj';
        const bidLDLnameProj = coulistLD;
        var cidLDLnameProj = aidLDLnameProj + bidLDLnameProj;

        /*ค้นหาชื่อนักวิจัย*/
        $.ajax({
          type: 'GET',
          url: ajaxURL + '/getusername?emailsearchUserLD=' + emailsearchUserLD,
          dataType: 'json',
          success: function(rows) {
            if (rows == '') {
              document.getElementById("notFoundSearchUserLD").classList.remove("hide");
            } else {
              document.getElementById("notFoundSearchUserLD").classList.add("hide");
              const id = rows[0].id;
              const firstname = rows[0].firstname;
              const lastname = rows[0].lastname;

              document.getElementById(cidLDIDProj).value = id;
              document.getElementById(cidLDNameProj).value = firstname;
              document.getElementById(cidLDLnameProj).value = lastname;

              listLDproject[coulistLD].classList.remove("hide");
              coulistLD++;

              document.getElementById("searchUserLD").value = "";
            }

          },
          error: function() {
            alert('failure');
          }
        });
      }

    }
  });
});

/*เพิ่มผู้ร่วมวิจัย*/
$(document).ready(function() {

  var coulistRS = 0;
  $("#btn_addRSProject").on('click', function() {
    if (coulistRS <= 9) {
      var listRSproject = document.getElementsByClassName('RSproject');
      const emailsearchUserRS = document.getElementById("id_searchUserRS").value;

      if ($.trim($('#id_searchUserRS').val()) == '') {
        document.getElementById("emptrySearchUserRS").classList.remove("hide");

        document.getElementById("notFoundSearchUserRS").classList.add("hide");
      } else {
        document.getElementById("emptrySearchUserRS").classList.add("hide");

        const aidRSIDProj = 'idRSIDProj';
        const bidRSIDProj = coulistRS;
        var cidRSIDProj = aidRSIDProj + bidRSIDProj;

        const aidRSNameProj = 'idRSNameProj';
        const bidRSNameProj = coulistRS;
        var cidRSNameProj = aidRSNameProj + bidRSNameProj;

        const aidRSLnameProj = 'idRSLnameProj';
        const bidRSLnameProj = coulistRS;
        var cidRSLnameProj = aidRSLnameProj + bidRSLnameProj;

        /*ค้นหาชื่อนักวิจัย*/
        $.ajax({
          type: 'GET',
          url: ajaxURL + '/getRSusername?emailsearchUserRS=' + emailsearchUserRS,
          dataType: 'json',
          success: function(rows) {
            if (rows == '') {
              document.getElementById("notFoundSearchUserRS").classList.remove("hide");
            } else {
              document.getElementById("notFoundSearchUserRS").classList.add("hide");
              const id = rows[0].id;
              const firstname = rows[0].firstname;
              const lastname = rows[0].lastname;

              document.getElementById(cidRSIDProj).value = id;
              document.getElementById(cidRSNameProj).value = firstname;
              document.getElementById(cidRSLnameProj).value = lastname;

              listRSproject[coulistRS].classList.remove("hide");
              coulistRS++;

              document.getElementById("id_searchUserRS").value = "";
            }

          },
          error: function() {
            alert('failure');
          }
        });
      }

    }
  });
});

/* โหลดรายชื่อหน่วยงานต่าง ๆ*/
$(document).ready(function() {

  /* โหลดรายชื่อมหาวิทยาลัยจากประเทศที่เลือก*/
  $('#ID_PJ_ADD_country').change(function() {
    countryValue = ID_PJ_ADD_country.options[ID_PJ_ADD_country.selectedIndex].value;
    const countryData = countryValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getUniversityName/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        $('#ID_PJ_ADD_Uni').empty();
        $('#id_PJ_ADD_fac').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        $('#id_PJ_ADD_dpment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');

        $('#ID_PJ_ADD_Uni').append('<option value="-">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#ID_PJ_ADD_Uni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>')
        }
      }
    });
  });

  /* โหลดรายชื่อคณะจากมหาวิทยาลัยที่เลือก*/
  $('#ID_PJ_ADD_Uni').change(function() {
    universityValue = ID_PJ_ADD_Uni.options[ID_PJ_ADD_Uni.selectedIndex].value;
    const universityData = universityValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getFacultyinUni/?universityData=' + universityData,
      dataType: 'json',
      success: function(rows) {
        $('#id_PJ_ADD_fac').empty();
        $('#id_PJ_ADD_dpment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');

        $('#id_PJ_ADD_fac').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#id_PJ_ADD_fac').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>')
        }
      }
    });
  });

  /* โหลดรายชื่อหน่วยงานหลักจากคณะที่เลือก*/
  $('#id_PJ_ADD_fac').change(function() {
    facultyValue = id_PJ_ADD_fac.options[id_PJ_ADD_fac.selectedIndex].value;
    const facultyData = facultyValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getDpmentinFac/?facultyValue=' + facultyValue,
      dataType: 'json',
      success: function(rows) {
        $('#id_PJ_ADD_dpment').empty();
        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');

        $('#id_PJ_ADD_dpment').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#id_PJ_ADD_dpment').append('<option value="' + rows[i].departmentID + '">' + rows[i].departmentName + '</option>')
        }
      }
    });
  });

  /* โหลดรายชื่อหน่วยงานย่อยจากหน่วยงานหลักที่เลือก*/
  $('#id_PJ_ADD_dpment').change(function() {
    departmentValue = id_PJ_ADD_dpment.options[id_PJ_ADD_dpment.selectedIndex].value;
    var departmentData = departmentValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getSubinDpment/?departmentValue=' + departmentValue,
      dataType: 'json',
      success: function(rows) {
        $('#id_PJ_ADD_subdpment').empty();

        $('#id_PJ_ADD_subdpment').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#id_PJ_ADD_subdpment').append('<option value="' + rows[i].Sub_Dpment_ID + '">' + rows[i].Sub_Dpment_name + '</option>')
        }
      }
    });
  });

});
