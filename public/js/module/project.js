/*เลือกทุนวิจัยจากปีที่กำหนด*/
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
  var coulistLD = 1;
  $("#addLDProject").on('click', function() {

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

            const listLDproject = document.getElementsByClassName('LDproject');
            listLDproject[coulistLD].classList.remove("hide");
            coulistLD++;

            // var btn = document.getElementsByClassName('removeLDProject');
            // for (var i = 0; i < btn.length; i++) {
            //   btn[i].addEventListener('click', function(e) {
            //     this.parentElement.parentElement.classList.add("hide");
            //   }, false);
            // }
          }

        },
        error: function() {
          alert('failure');
        }
      });
    }
  });
});

/*เพิ่มผู้ร่วมวิจัย*/
$(document).ready(function() {
  var coulist = 0;
  $("#addRSProject").on('click', function() {
    var listRSproject = document.getElementsByClassName('RSproject');
    listRSproject[coulist].classList.remove("hide");
    coulist++;
  });

  var btn = document.getElementsByClassName('removeRSproject');
  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function(e) {
      this.parentElement.parentElement.classList.add("hide");
    }, false);
  }
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


        for (var i = 0; i < rows.length; i++) {
          $('#ID_PJ_ADD_Uni').append('<option selected value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>')
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
