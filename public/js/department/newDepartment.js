/*ฟังก์ชันเปิดการแสดงผลของ หน้าเพิ่มมหาลัย(หน่วยงานระดับ 1)*/
$(document).ready(function() {
  var countryName2;
  var countryValue;
  var availableTags = [];

  $('#addBtnUnityID').click(function() {
    $('#comfirmAddUnityID').attr('disabled', 'disabled');


    var el1 = document.getElementById("alertEmptryName");
    el1.classList.add("hide");

    var el2 = document.getElementById("alertDuplicateName");
    el2.classList.add("hide");


    $('#countryISOID').val('');
    $('#txtUniOutput').text('');

    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewUni = document.getElementById("addDataElmNewUni");

    if (addDataElm.style.display === "block") {
      addDataElmNewUni.style.display = "block";
      addDataElm.style.display = "none";
    }

    var countryName = document.getElementById("getCountry");
    var text = countryName.options[countryName.selectedIndex].text;

    countryName2 = document.getElementById("getCountry");
    countryValue = countryName2.options[countryName2.selectedIndex].value;

    document.getElementById("countryNameID").innerHTML = text;
    document.getElementById("countryISOID").value = countryValue;

    var countryData = countryValue;
    availableTags = [];

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getNameUniinCountry/?countryData=' + countryData,
      dataType: 'json',
      success: function(rows) {
        for (var i = 0; i < rows.length; i++) {
          availableTags.push(rows[i].uniName);
        }
      }
    });

  });

  $('#txtUniInput').keyup(function() {

    var inputBox = document.getElementById('txtUniInput').value;
    document.getElementById('txtUniOutput').innerHTML = inputBox;

    var choices = availableTags;
    for (let i = 0; i < choices.length; i++) {

      var resultOfsearch = choices.includes(inputBox);
      if (resultOfsearch == false) {
        var empty = false;
        $('.field input').each(function() {
          if ($(this).val().length == 0) {
            empty = true;
          }
        });

        if ($.trim($('.field input').val()) == '') {
          $('#comfirmAddUnityID').attr('disabled', 'disabled');

          var element = document.getElementById("alertEmptryName");
          element.classList.remove("hide");
          var element = document.getElementById("alertDuplicateName");
          element.classList.add("hide");
        } else {
          $('#comfirmAddUnityID').removeAttr('disabled');

          document.getElementById("txtUniOutput").style.color = "green";

          var element = document.getElementById("alertDuplicateName");
          element.classList.add("hide");
          var element = document.getElementById("alertEmptryName");
          element.classList.add("hide");
        }

      } else {
        $('#comfirmAddUnityID').attr('disabled', 'disabled');

        document.getElementById("txtUniOutput").style.color = "#ff0000";

        var element = document.getElementById("alertDuplicateName");
        element.classList.remove("hide");
        var element = document.getElementById("alertEmptryName");
        element.classList.add("hide");
      }
    }

  });

});

/*ฟังก์ชันเปิดการแสดงผลของ หน้าเพิ่มคณะ(หน่วยงานระดับ 2)*/
$(document).ready(function() {
  var countryName22;
  var countryValue3;
  var availableTagsForFaculty = [];


  $('#addBtnFacultyID').click(function() {
    $('#comfirmAddFacultyID').attr('disabled', 'disabled');

    var el1 = document.getElementById("alertEmptryName");
    el1.classList.add("hide");

    var el2 = document.getElementById("alertDuplicateName");
    el2.classList.add("hide");


    $('#countryISOID').val('');
    $('#txtUniOutput').text('');

    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewFaculty = document.getElementById("addDataElmNewFaculty");

    if (addDataElm.style.display === "block") {
      addDataElmNewFaculty.style.display = "block";
      addDataElm.style.display = "none";
    }

    /*ดึงค่าประเทศ*/
    var countryName = document.getElementById("getCountry");
    var text = countryName.options[countryName.selectedIndex].text;

    countryName22 = document.getElementById("getCountry");
    countryValue3 = countryName22.options[countryName22.selectedIndex].value;

    document.getElementById("countryNameIDFacultyPage").innerHTML = text;
    document.getElementById("countryISOID").value = countryValue3;

    /*ดึงค่ามหาวิทยาลัย*/
    var uniNameForDisplay = document.getElementById("getUni");
    var textuniNameForDisplay = uniNameForDisplay.options[uniNameForDisplay.selectedIndex].text;

    uniNameForDisplay2 = document.getElementById("getUni");
    valueuniNameForDisplay = uniNameForDisplay2.options[uniNameForDisplay2.selectedIndex].value;

    document.getElementById("uniIDForFaculty").value = valueuniNameForDisplay;

    document.getElementById("txtUniOutputFacultyPage").innerHTML = textuniNameForDisplay;

    var uniData = valueuniNameForDisplay;
    availableTagsForFaculty = [];


    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getNameofFacultyinUni/?uniData=' + uniData,
      dataType: 'json',
      success: function(rows) {
        for (var i = 0; i < rows.length; i++) {
          availableTagsForFaculty.push(rows[i].facultyName);
        }
      }
    });

    /*Check Error*/
    $('#txtFacultyInput').keyup(function() {

      var inputBo2x = document.getElementById('txtFacultyInput').value;
      document.getElementById('txtFacultyOutputFacultyPage').innerHTML = inputBo2x;

      var choice2s = availableTagsForFaculty;
      for (let i = 0; i < choice2s.length; i++) {

        var resultOfsearc2h = choice2s.includes(inputBo2x);
        if (resultOfsearc2h == false) {
          var empt2y = false;
          $('#IDFormForNewFaculty .field2 input').each(function() {
            if ($(this).val().length == 0) {
              empt2y = true;
            }
          });

          if ($.trim($('#txtFacultyInput').val()) == '') {
            $('#comfirmAddFacultyID').attr('disabled', 'disabled');
            document.getElementById("txtFacultyOutputFacultyPage").style.color = "#ff8888";

            var elementalertEmptryName2 = document.getElementById("alertEmptryName2");
            elementalertEmptryName2.classList.remove("hide");
            var elementalertDuplicateName2 = document.getElementById("alertDuplicateName2");
            elementalertDuplicateName2.classList.add("hide");
          } else {
            $('#comfirmAddFacultyID').removeAttr('disabled');

            document.getElementById("txtFacultyOutputFacultyPage").style.color = "green";

            var elementalertDuplicateName2 = document.getElementById("alertDuplicateName2");
            elementalertDuplicateName2.classList.add("hide");
            var elementalertEmptryName2 = document.getElementById("alertEmptryName2");
            elementalertEmptryName2.classList.add("hide");
          }

        } else {
          $('#comfirmAddFacultyID').attr('disabled', 'disabled');

          document.getElementById("txtFacultyOutputFacultyPage").style.color = "#ff0000";

          var elementalertDuplicateName2 = document.getElementById("alertDuplicateName2");
          elementalertDuplicateName2.classList.remove("hide");
          var elementalertEmptryName2 = document.getElementById("alertEmptryName2");
          elementalertEmptryName2.classList.add("hide");
        }
      }

    });

  });
});

/*ฟังก์ชันเปิดการแสดงผลของ หน้าเพิ่มหน่วยงานหลัก(หน่วยงานระดับ 3)*/
$(document).ready(function() {
  var availableTagsForDepartment = [];

  $('#addBtnDpmentID').click(function() {
    $('#comfirmAdddepartmentID').attr('disabled', 'disabled');

    var el1 = document.getElementById("alertEmptryName");
    el1.classList.add("hide");

    var el2 = document.getElementById("alertDuplicateName");
    el2.classList.add("hide");

    $('#countryISOID').val('');
    $('#txtUniOutput').text('');


    var addDataElm = document.getElementById("addDataElm");
    var addDataElmNewdepartment = document.getElementById("addDataElmNewdepartment");

    if (addDataElm.style.display === "block") {
      addDataElmNewdepartment.style.display = "block";
      addDataElm.style.display = "none";
    }

    /*ดึงค่าประเทศ*/
    var countryName = document.getElementById("getCountry");
    var text = countryName.options[countryName.selectedIndex].text;

    // countryName222 = document.getElementById("getCountry");
    // countryValue33 = countryName222.options[countryName222.selectedIndex].value;

    /*ดึงค่ามหาวิทยาลัย*/
    var uniNameForDisplay = document.getElementById("getUni");
    var textuniNameForDisplay = uniNameForDisplay.options[uniNameForDisplay.selectedIndex].text;

    // uniNameForDisplay2 = document.getElementById("getUni");
    // valueuniNameForDisplay = uniNameForDisplay2.options[uniNameForDisplay2.selectedIndex].value;

    /*ดึงค่าคณะ*/
    var facultyNameForDisplay = document.getElementById("getFaculty");
    var textfacultyNameForDisplay = facultyNameForDisplay.options[facultyNameForDisplay.selectedIndex].text;

    var facultyName2 = document.getElementById("getFaculty");
    var valuefacultyNameForDisplay = facultyName2.options[facultyName2.selectedIndex].value;

    /*แสดงค่าที่แถบ nav*/
    document.getElementById("countryNameIDdepartmentPage").innerHTML = text;
    document.getElementById("txtUniOutputdepartmentPage").innerHTML = textuniNameForDisplay;
    document.getElementById("txtFacultyOutputdepartmentPage").innerHTML = textfacultyNameForDisplay;

    // document.getElementById("countryISOID").value = countryValue33;
    // document.getElementById("uniIDForFaculty").value = valueuniNameForDisplay;


    var facultyData = valuefacultyNameForDisplay;
    availableTagsForDepartment = [];

    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8080/Department/getNameofDepartmentinFaculty/?facultyData=' + facultyData,
      dataType: 'json',
      success: function(rows) {
        for (var i = 0; i < rows.length; i++) {
          availableTagsForDepartment.push(rows[i].departmentName);
        }
      }
    });

    /*Check Error*/
    $('#txtdepartmentInput').keyup(function() {

      var inputBo2x = document.getElementById('txtdepartmentInput').value;
      document.getElementById('txtdepartmentOutputdepartmentPage').innerHTML = inputBo2x;

      var choice2s = availableTagsForDepartment;
      for (let i = 0; i < choice2s.length; i++) {

        var resultOfsearc2h = choice2s.includes(inputBo2x);
        if (resultOfsearc2h == false) {
          var empt2y = false;
          $('#IDFormForNewdepartment .field2 input').each(function() {
            if ($(this).val().length == 0) {
              empt2y = true;
            }
          });

          if ($.trim($('#txtdepartmentInput').val()) == '') {
            $('#comfirmAdddepartmentID').attr('disabled', 'disabled');
            /*Emptyinput*/
            var elementalertEmptryName2 = document.getElementById("alertEmptryName3");
            elementalertEmptryName2.classList.remove("hide");
            var elementalertDuplicateName2 = document.getElementById("alertDuplicateName3");
            elementalertDuplicateName2.classList.add("hide");
          } else {
            /*เคสผ่าน*/
            $('#comfirmAdddepartmentID').removeAttr('disabled');

            document.getElementById("txtdepartmentOutputdepartmentPage").style.color = "green";

            var elementalertDuplicateName2 = document.getElementById("alertDuplicateName3");
            elementalertDuplicateName2.classList.add("hide");
            var elementalertEmptryName2 = document.getElementById("alertEmptryName3");
            elementalertEmptryName2.classList.add("hide");
          }

        } else {
          /*Duplicateinput*/
          $('#comfirmAdddepartmentID').attr('disabled', 'disabled');

          document.getElementById("txtdepartmentOutputdepartmentPage").style.color = "#ff0000";

          var elementalertDuplicateName2 = document.getElementById("alertDuplicateName3");
          elementalertDuplicateName2.classList.remove("hide");
          var elementalertEmptryName2 = document.getElementById("alertEmptryName3");
          elementalertEmptryName2.classList.add("hide");
        }
      }

    });

  });
});
