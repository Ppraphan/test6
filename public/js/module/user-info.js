var $navList = $('.menu-fancy');

$navList.on('click', 'li:not(.is-selected)', function(e){
  $navList.find(".is-selected").removeClass("is-selected");
  $(e.currentTarget).addClass("is-selected");
});


$(document).ready(function() {
  $('#ME_ID_editPersonalInfo').click(function() {
    document.getElementById("ME_Elm_PersonalInfo").style.display = "block";

    document.getElementById("ME_Elm_WorkInfo").style.display = "none";
    document.getElementById("ME_Elm_resetPassword").style.display = "none";
  });

  $('#ME_ID_editWorkInfo').click(function() {
    document.getElementById("ME_Elm_WorkInfo").style.display = "block";

    document.getElementById("ME_Elm_PersonalInfo").style.display = "none";
    document.getElementById("ME_Elm_resetPassword").style.display = "none";
  });

  $('#ME_ID_resetPassword').click(function() {
    document.getElementById("ME_Elm_resetPassword").style.display = "block";

    document.getElementById("ME_Elm_WorkInfo").style.display = "none";
    document.getElementById("ME_Elm_PersonalInfo").style.display = "none";
  });
});

/* โหลดรายชื่อหน่วยงานต่าง ๆ*/
$(document).ready(function() {

  /* โหลดรายชื่อมหาวิทยาลัยจากประเทศที่เลือก*/
  $('#ME_ID_country').change(function() {
    countryValue = ME_ID_country.options[ME_ID_country.selectedIndex].value;
    var countryData = countryValue;

    $.ajax({
      type: 'GET',
      url: '/me/getUniversityName/?countryData=' + countryData,
      dataType: 'json',
      success: function(results) {
        $('#ME_ID_university').empty();

        $('#ME_ID_faculty').append('<option disabled="disabled" selected="selected" value="">' + "เลือก" + '</option>');
        $('#ME_ID_department').append('<option disabled="disabled"selected="selected" value="">' + "เลือก" + '</option>');
        $('#ME_ID_subdepartment').append('<option disabled="disabled"selected="selected" value="">' + "เลือก" + '</option>');
        // alert(data.data0[0].uniName);
        $('#ME_ID_university').append('<option value="" disabled="disabled">' + "กรุณาเลือกมหาวิทยาลัย" + '</option>');
        for (var i = 0; i < results.length; i++) {
          if (results[i].uniName != '-' && results[i].uniName != 'example') {
            $('#ME_ID_university').append('<option  value="' + results[i].uniID + '">' + results[i].uniName + '</option>');
          }
        }
      }
    });
  });
  /* โหลดรายชื่อคณะจากมหาวิทยาลัยที่เลือก*/
  $('#ME_ID_university').change(function() {
    universityValue = ME_ID_university.options[ME_ID_university.selectedIndex].value;
    var universityData = universityValue;

    $.ajax({
      type: 'GET',
      url: '/me/getFacultyinUni/?universityData=' + universityData,
      dataType: 'json',
      success: function(data) {
        $('#ME_ID_faculty').empty();
        $('#ME_ID_department').empty();
        $('#ME_ID_subdepartment').empty();

        $('#ME_ID_faculty').append('<option selected="selected" value="' + data.data1[0].facultyID + '" hidden>' + data.data1[0].facultyName + '</option>');
        $('#ME_ID_department').append('<option selected="selected" value="' + data.data1[0].departmentID + '"hidden>' + data.data1[0].departmentName + '</option>');
        $('#ME_ID_subdepartment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].facultyName != '-' && data.data0[i].facultyName != 'example') {
            $('#ME_ID_faculty').append('<option value="' + data.data0[i].facultyID + '">' + data.data0[i].facultyName + '</option>');
          }
        }
      }
    });
  });
  /* โหลดรายชื่อหน่วยงานหลักจากคณะที่เลือก*/
  $('#ME_ID_faculty').change(function() {
    facultyValue = ME_ID_faculty.options[ME_ID_faculty.selectedIndex].value;
    var facultyData = facultyValue;

    $.ajax({
      type: 'GET',
      url: '/me/getDpmentinFac/?facultyValue=' + facultyValue,
      dataType: 'json',
      success: function(data) {
        $('#ME_ID_department').empty();
        $('#ME_ID_subdepartment').empty();

        $('#ME_ID_department').append('<option selected="selected" value="' + data.data1[0].departmentID + '"hidden>' + data.data1[0].departmentName + '</option>');
        $('#ME_ID_subdepartment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].departmentName != '-' && data.data0[i].departmentName != 'example') {
            $('#ME_ID_department').append('<option value="' + data.data0[i].departmentID + '">' + data.data0[i].departmentName + '</option>');
          }
        }
      }
    });
  });
  /* โหลดรายชื่อหน่วยงานย่อยจากหน่วยงานหลักที่เลือก*/
  $('#ME_ID_department').change(function() {
    departmentValue = ME_ID_department.options[ME_ID_department.selectedIndex].value;
    var departmentData = departmentValue;

    $.ajax({
      type: 'GET',
      url: '/me/getSubinDpment/?departmentValue=' + departmentValue,
      dataType: 'json',
      success: function(data) {
        $('#ME_ID_subdepartment').empty();

        $('#ME_ID_subdepartment').append('<option selected="selected" value="' + data.data1[0].Sub_Dpment_Parent + '"hidden>' + data.data1[0].Sub_Dpment_name + '</option>');
        for (var i = 0; i < data.data0.length; i++) {
          if (data.data0[i].Sub_Dpment_name != '-' && data.data0[i].Sub_Dpment_name != 'example') {
            $('#ME_ID_subdepartment').append('<option value="' + data.data0[i].Sub_Dpment_ID + '">' + data.data0[i].Sub_Dpment_name + '</option>');
          }
        }
      }
    });
  });

});
