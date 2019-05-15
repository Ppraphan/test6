/*เพิ่มหัวหน้าโครงการ*/
$(document).ready(function() {
  var t = $('#memberLDProjTable').DataTable({
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
  });
  var counter = 0;

  $('#memberLDProjTable tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      t.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  $('#removeRow').click(function() {
    t.row('.selected').remove().draw(false);
  });

  var coulistLD = 0;
  $("#addRow").on('click', function() {
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

        const aidLD_EmailProj = 'idLDEmailProj';
        const bidLD_EmailProj = coulistLD;
        var cidLD_EmailProj = aidLD_EmailProj + bidLD_EmailProj;

        const aidLDNameProj = 'idLDNameProj';
        const bidLDNameProj = coulistLD;
        var cidLDNameProj = aidLDNameProj + bidLDNameProj;

        const aidLDLnameProj = 'idLDLnameProj';
        const bidLDLnameProj = coulistLD;
        var cidLDLnameProj = aidLDLnameProj + bidLDLnameProj;

        /*ค้นหาชื่อนักวิจัย*/
        $.ajax({
          type: 'GET',
          url: '/getusername?emailsearchUserLD=' + emailsearchUserLD,
          dataType: 'json',
          success: function(rows) {
            if (rows == '') {
              document.getElementById("notFoundSearchUserLD").classList.remove("hide");
            } else {
              t.row.add([
                '<p id="idLDEmailProj' + counter + '" ></p>',
                '<p id="idLDNameProj' + counter + '" ></p>',
                '<p id="idLDLnameProj' + counter + '" ></p>',
                '<input type="hidden" name="idLDIDProj' + counter + '" value=""/><input type="text" name="nameProportionLD' + counter + '" placeholder="สัดส่วนงานวิจัย" />',
              ]).draw(false);

              document.getElementById("notFoundSearchUserLD").classList.add("hide");
              const iduser = rows[0].id;
              const email = rows[0].email;
              const firstname = rows[0].firstname;
              const lastname = rows[0].lastname;
              alert(iduser);
              document.getElementById(cidLDIDProj).value = iduser;

              document.getElementById(cidLD_EmailProj).innerHTML = email;
              document.getElementById(cidLDNameProj).innerHTML = firstname;
              document.getElementById(cidLDLnameProj).innerHTML = lastname;

              counter++;
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
