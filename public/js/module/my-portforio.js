/*ยกเลิกการดู และเปิดการเพิ่มผลงาน*/
$(document).ready(function() {
  $('#cancelSeePort').click(function() {
    document.getElementById("editthisport").style.display = "inline";
    document.getElementById("comfirmThisport").style.display = "none";

    var id_elm_newPort = document.getElementById("id_elm_newPort");
    var seePort = document.getElementById("seePort");

    $("#portTitle").attr("readonly", true);
    $("#portAbout").attr("readonly", true);
    $("#portType").attr('disabled', true);
    $("#edit_portFile").attr('disabled', true);

    document.getElementById("edit_portFile").style.display = "block";

    if (id_elm_newPort.style.display === "none") {
      id_elm_newPort.style.display = "block";

      seePort.style.display = "none";
    }
  });
});

/*แก้ไขรายการผลงานที่เลือก*/
$(document).ready(function() {
  $('#editthisport').click(function() {

    $("#portTitle").attr("readonly", false);
    $("#portAbout").attr("readonly", false);
    $("#portType").attr('disabled', false);
    $("#edit_portFile").attr('disabled', false);

    document.getElementById("edit_portFile").style.display = "block";
    document.getElementById("aPortLink").style.display = "none";

    document.getElementById("editthisport").style.display = "none";
    document.getElementById("comfirmThisport").style.display = "inline";
  });
});

/*ปิดปุ่มเพิ่ม ถ้าข้อมูลว่าง*/
$(document).ready(function() {
  $('#id_newPortForm .field input').keyup(function() {

    var empty = false;
    $('#id_newPortForm .field input').each(function() {
      if ($(this).val().length == 0 || $(this).val() == '') {
        empty = true;
      }
    });

    if (empty) {
      $('#id_confirmNewPortForm').attr('disabled', 'disabled');
    } else {
      $('#id_confirmNewPortForm').removeAttr('disabled');
    }
  });
});

/*ดูผลงานของฉัน*/
function seeMyPort(portid) {
  var id_elm_newPort = document.getElementById("id_elm_newPort");
  var seePort = document.getElementById("seePort");

  document.getElementById("aPortLink").style.display = "block";
  document.getElementById("edit_portFile").style.display = "none";

  if (seePort.style.display === "none") {
    seePort.style.display = "block";

    id_elm_newPort.style.display = "none";
  }

  $.ajax({
    type: 'GET',
    url: './getportinfo/?id=' + portid,
    dataType: 'json',
    success: function(rows) {


      $("#aPortLink").attr("href", "/my-portforio/download/" + rows[0].documentFile + "");
      document.getElementById("aPortLink").innerHTML = rows[0].documentFile;
      document.getElementById("portID").value = rows[0].idportfolio;
      document.getElementById("portTitle").value = rows[0].title;
      document.getElementById("portAbout").value = rows[0].about;

      $("#portType option[value='" + rows[0].categoryID + "']").prop('selected', true);



    }
  });

}
