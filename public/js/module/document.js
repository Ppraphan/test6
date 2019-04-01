/* ไฟล์เฉพาะ ฟีเจอร์เอกสาร */
var myfile = "";
$('#resume_link').click(function(e) {
  e.preventDefault();
  $('#id_DocFile').trigger('click');
});

$('#id_DocFile').on('change', function() {
  myfile = $(this).val();
  var ext = myfile.split('.').pop();
  if (ext == "pdf" || ext == "docx" || ext == "doc") {
    alert(ext);
  } else {
    alert("กรุณาอัพไฟล์ .PDF เท่านั้น");
  }
});

/*เพิ่มไฟล์ใหม่*/
$(document).ready(function() {
  $('#ID_DC_newForm').click(function() {
    var availableTagsForADDdocname = [];

    /*Init แถบแจ้งเตือน และปุ่ม*/
    $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');
    document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
    document.getElementById("ID_DC_insert_emptyname").classList.add("hide");

    availableTagsForADDdocname = [];

    $.ajax({
      type: 'GET',
      url: ajaxURL + '/forms/getallofname',
      dataType: 'json',
      success: function(docname) {
        for (var i = 0; i < docname.length; i++) {
          availableTagsForADDdocname.push(docname[i].documentName);
        }
      }
    });

    /*Check Error*/
    $('#ID_documentForm #ID_DC_input_newDocName').keyup(function() {
      /*ตรวจสอบไฟล์ใน Input*/
      $('#ID_documentForm input[type=file]').change(function() {
        if (!isNaN(this.value)) {
          document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");
          $('#ID_DC_comfirm_newDoc').attr('disabled', 'disabled');
        }
      });

      let inputNewDocName = document.getElementById('ID_DC_input_newDocName').value;
      let inputNewDocNamelowcase = inputNewDocName.toLowerCase();
      let choices4NewDocName = availableTagsForADDdocname;
      for (let i = 0; i < choices4NewDocName.length; i++) {

        var resultOfsearchTagsForDocName = choices4NewDocName.includes(inputNewDocNamelowcase);
        if (resultOfsearchTagsForDocName == false) {
          if ($.trim($('#ID_documentForm #ID_DC_input_newDocName').val()) == '') {
            /*Emptyinput*/
            $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');

            document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
            document.getElementById("ID_DC_insert_emptyname").classList.remove("hide");

          } else {
            /*เคสผ่าน*/
            $('#ID_documentForm input[type=submit]').removeAttr('disabled');

            document.getElementById("ID_DC_insert_duplicatename").classList.add("hide");
            document.getElementById("ID_DC_insert_emptyname").classList.add("hide");;
          }

        } else {
          /*Duplicateinput*/
          $('#ID_documentForm input[type=submit]').attr('disabled', 'disabled');

          document.getElementById("ID_DC_insert_duplicatename").classList.remove("hide");
          document.getElementById("ID_DC_insert_emptyname").classList.add("hide");
        }
      }
    });




  });
});


/*แสดงชื่อเก่าบนแถบแก้ไขชื่อ*/
function showOldname(oldname){
  document.getElementById("oldNameForm").interHTML=oldname;
  document.getElementById("oldNameForm").value=oldname;

}
