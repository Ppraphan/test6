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

/*ระบุปีของโครงการ*/
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
      url: '/all-project/getmaingrantsnamefromyear/?budgetYear=' + budgetYear,
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
      url: '/grants/getgrantsnamefromyear/?budgetYear=' + budgetYear,
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
          url: '/getRSusername?emailsearchUserRS=' + emailsearchUserRS,
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
    var countryData = countryValue;

    $.ajax({
      type: 'GET',
      url: '/me/getUniversityName/?countryData=' + countryData,
      dataType: 'json',
      success: function(results) {
        $('#ID_PJ_ADD_Uni').empty();

        $('#id_PJ_ADD_fac').append('<option disabled="disabled" selected="selected" value="">' + "เลือก" + '</option>');
        $('#id_PJ_ADD_dpment').append('<option disabled="disabled"selected="selected" value="">' + "เลือก" + '</option>');
        $('#id_PJ_ADD_subdpment').append('<option disabled="disabled"selected="selected" value="">' + "เลือก" + '</option>');
        // alert(data.data0[0].uniName);
        $('#ID_PJ_ADD_Uni').append('<option value="" disabled="disabled">' + "กรุณาเลือกมหาวิทยาลัย" + '</option>');
        for (var i = 0; i < results.length; i++) {
          if (results[i].uniName != '-' && results[i].uniName != 'example') {
            $('#ID_PJ_ADD_Uni').append('<option  value="' + results[i].uniID + '">' + results[i].uniName + '</option>');
          }
        }
      }
    });
  });

  /* โหลดรายชื่อคณะจากมหาวิทยาลัยที่เลือก*/
  $('#ID_PJ_ADD_Uni').change(function() {
    universityValue = ID_PJ_ADD_Uni.options[ID_PJ_ADD_Uni.selectedIndex].value;
    var universityData = universityValue;

    $.ajax({
      type: 'GET',
      url: '/me/getFacultyinUni/?universityData=' + universityData,
      dataType: 'json',
      success: function(data) {
        $('#id_PJ_ADD_fac').empty();
        $('#id_PJ_ADD_dpment').empty();
        $('#id_PJ_ADD_subdpment').empty();

        $('#id_PJ_ADD_fac').append('<option selected="selected" value="' + data.data1[0].facultyID + '" hidden>' + data.data1[0].facultyName + '</option>');
        $('#id_PJ_ADD_dpment').append('<option selected="selected" value="' + data.data1[0].departmentID + '"hidden>' + data.data1[0].departmentName + '</option>');
        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].facultyName != '-' && data.data0[i].facultyName != 'example') {
            $('#id_PJ_ADD_fac').append('<option value="' + data.data0[i].facultyID + '">' + data.data0[i].facultyName + '</option>');
          }
        }
      }
    });
  });

  /* โหลดรายชื่อหน่วยงานหลักจากคณะที่เลือก*/
  $('#id_PJ_ADD_fac').change(function() {
    facultyValue = id_PJ_ADD_fac.options[id_PJ_ADD_fac.selectedIndex].value;
    var facultyData = facultyValue;

    $.ajax({
      type: 'GET',
      url: '/me/getDpmentinFac/?facultyValue=' + facultyValue,
      dataType: 'json',
      success: function(data) {
        $('#id_PJ_ADD_dpment').empty();
        $('#id_PJ_ADD_subdpment').empty();

        $('#id_PJ_ADD_dpment').append('<option selected="selected" value="' + data.data1[0].departmentID + '"hidden>' + data.data1[0].departmentName + '</option>');
        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].departmentName != '-' && data.data0[i].departmentName != 'example') {
            $('#id_PJ_ADD_dpment').append('<option value="' + data.data0[i].departmentID + '">' + data.data0[i].departmentName + '</option>');
          }
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
      url: '/me/getSubinDpment/?departmentValue=' + departmentValue,
      dataType: 'json',
      success: function(data) {
        $('#id_PJ_ADD_subdpment').empty();

        $('#id_PJ_ADD_subdpment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].Sub_Dpment_name != '-' && data.data0[i].Sub_Dpment_name != 'example') {
            $('#id_PJ_ADD_subdpment').append('<option value="' + data.data0[i].Sub_Dpment_ID + '">' + data.data0[i].Sub_Dpment_name + '</option>');
          }
        }
      }
    });
  });

});
