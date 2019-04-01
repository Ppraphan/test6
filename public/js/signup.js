// slight update to account for browsers not supporting e.which
function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
// To disable f5

/* OR jQuery >= 1.7 */
$(document).on("keydown", disableF5);


/* Input Style */
$(function () {
  var showClass = 'show';

  $('input').on('checkval', function () {
    var label = $(this).prev('label');
    if(this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function () {
    $(this).trigger('checkval');
  });
});



/*เปิด-ปิด ปุ่มยืนยันใส่รหัสรหัสบัตรประาชนหน้าแรก*/
$(document).ready(function() {
  $('#comfirmemailChkPage').attr('disabled', 'disabled');
    $('#newemail_ID').keyup(function() {
      if($.trim($('#newemail_ID').val()) == ''){
        $('#comfirmemailChkPage').attr('disabled', 'disabled');
      }else{
        $('#comfirmemailChkPage').removeAttr('disabled');
      }
    });
});

/*เปิด-ปิด ปุ่มยืนยัน ช่องใส่รหัสผ่าน หน้าใส่ข้อมูลส่วนตัว*/
$(document).ready(function() {
  $('#comfirmUserData').attr('disabled', 'disabled');
    $('#confirminputPassword_ID').keyup(function() {
      var inputPassword_ID = document.getElementById('inputPassword_ID').value;
      var comfirmIDHumanChkPage = document.getElementById('confirminputPassword_ID').value;

      if($.trim($('#confirminputPassword_ID').val()) == ''){
        $('#comfirmUserData').attr('disabled', 'disabled');
        /*รหัสผ่านว่างเปล่า*/
        var elementalertEmptryName1 = document.getElementById("id_US_Add_Div_alertEmptryPS");
        elementalertEmptryName1.classList.remove("hide");

        var elementalertEmptryName2 = document.getElementById("id_US_Add_Div_wrongPS");
        elementalertEmptryName2.classList.add("hide");
      }else{
        if(inputPassword_ID != comfirmIDHumanChkPage){
          $('#comfirmUserData').attr('disabled', 'disabled');
          /*รหัสผ่านไม่ตรงกัน*/
          var elementalertEmptryName1 = document.getElementById("id_US_Add_Div_alertEmptryPS");
          elementalertEmptryName1.classList.add("hide");

          var elementalertEmptryName2 = document.getElementById("id_US_Add_Div_wrongPS");
          elementalertEmptryName2.classList.remove("hide");
        }
        else{
          /*เคสถูก*/
          $('#comfirmUserData').removeAttr('disabled');

          var elementalertEmptryName2 = document.getElementById("id_US_Add_Div_wrongPS");
          elementalertEmptryName2.classList.add("hide");

          var elementalertEmptryName1 = document.getElementById("id_US_Add_Div_alertEmptryPS");
          elementalertEmptryName1.classList.add("hide");

        }

      }
    });
});

/*รูปโปรไฟล์*/
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);
});


/*รูปโปรไฟล์*/
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#profileimage2').css('background-image', 'url(' + e.target.result + ')');
      $('#profileimage2').hide();
      $('#profileimage2').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#profileimage").change(function() {
  readURL(this);
});

/* โหลดรายชื่อหน่วยงานต่าง ๆ*/
$(document).ready(function() {

  /* โหลดรายชื่อมหาวิทยาลัยจากประเทศที่เลือก*/
  $('#ID_country').change(function() {
    countryValue = ID_country.options[ID_country.selectedIndex].value;
    var countryData = countryValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getUniversityName/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        $('#ID_university').empty();
        $('#ID_faculty').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        $('#ID_department').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        $('#ID_subdepartment').append('<option selected="selected" value="-">' + "เลือก" + '</option>');

        $('#ID_university').append('<option selected="selected" value="-">' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#ID_university').append('<option  value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>')
        }
      }
    });
  });

  /* โหลดรายชื่อคณะจากมหาวิทยาลัยที่เลือก*/
  $('#ID_university').change(function() {
    universityValue = ID_university.options[ID_university.selectedIndex].value;
    var universityData = universityValue;

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/signup/getFacultyinUni/?universityData=' + universityData,
      dataType: 'json',
      success: function(rows) {
        $('#ID_faculty').empty();
        $('#ID_department').empty();
        $('#ID_subdepartment').empty();

        $('#ID_faculty').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        $('#ID_department').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        $('#ID_subdepartment').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
        for (var i = 0; i < rows.length; i++) {
          $('#ID_faculty').append('<option value="' + rows[i].facultyID + '">' + rows[i].facultyName + '</option>')
        }
      }
    });
  });

    /* โหลดรายชื่อหน่วยงานหลักจากคณะที่เลือก*/
    $('#ID_faculty').change(function() {
      facultyValue = ID_faculty.options[ID_faculty.selectedIndex].value;
      var facultyData = facultyValue;

      $.ajax({
        type: 'GET',
        url: ajaxURL + '/signup/getDpmentinFac/?facultyValue=' + facultyValue,
        dataType: 'json',
        success: function(rows) {
          $('#ID_department').empty();
          $('#ID_subdepartment').empty();

          $('#ID_department').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
          $('#ID_subdepartment').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
          for (var i = 0; i < rows.length; i++) {
            $('#ID_department').append('<option value="' + rows[i].departmentID + '">' + rows[i].departmentName + '</option>')
          }
        }
      });
    });

    /* โหลดรายชื่อหน่วยงานย่อยจากหน่วยงานหลักที่เลือก*/
    $('#ID_department').change(function() {
      departmentValue = ID_department.options[ID_department.selectedIndex].value;
      var departmentData = departmentValue;

      $.ajax({
        type: 'GET',
        url: ajaxURL + '/signup/getSubinDpment/?departmentValue=' + departmentValue,
        dataType: 'json',
        success: function(rows) {
          $('#ID_subdepartment').empty();

          $('#ID_subdepartment').append('<option selected="selected" hidden>' + "เลือก" + '</option>');
          for (var i = 0; i < rows.length; i++) {
            $('#ID_subdepartment').append('<option value="' + rows[i].Sub_Dpment_ID + '">' + rows[i].Sub_Dpment_name + '</option>')
          }
        }
      });
    });

});
