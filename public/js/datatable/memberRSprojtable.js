/*เพิ่มหัวหน้าโครงการ*/
$(document).ready(function() {
  var r_coulistLD = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var r_invertstack = [];
  var r_countID = 0;
  var r_currentID;

  /*init ตาราง*/
  var r_t = $('#memberRSProjTable').DataTable({
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    "columns": [
      null,
      null,
      null,
      {
        "width": "7rem",
      },
    ],
  });

  $('#memberRSProjTable tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      r_t.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  $('#removeRow2').click(function() {
      function returnstack() {
        if (r_invertstack.length != 0) {

          var r_del = $('.selected td input[type=hidden]').attr('id');
          r_del = r_del.substr(r_del.length - 1);
          alert(r_del);
          for (var i = 0; i < r_invertstack.length; i++) {
            if (r_invertstack[i] == r_del) {
              r_invertstack.splice(i, 1);
              r_coulistLD.push(r_del);
            }
          }
          r_t.row('.selected').remove().draw(false);
        } else {
          alert("กรุณาเลือกรายการ");
        }
      }
      returnstack();


  });


  $("#addRow2").on('click', function() {
    if (r_coulistLD.length < 1) {
      alert("สามารถเพิ่มได้สูงสุด 10 ท่าน");
      document.getElementById("searchUserRS").value = "";
    }
    if (r_coulistLD.length <= 10) {

      r_invertstack.push(r_currentID = r_coulistLD.pop());

      const emailsearchUserRS = document.getElementById("searchUserRS").value;

      if ($.trim($('#searchUserRS').val()) == '') {
        document.getElementById("emptrysearchUserRS").classList.remove("hide");

        document.getElementById("notFoundsearchUserRS").classList.add("hide");
      } else {

        document.getElementById("emptrysearchUserRS").classList.add("hide");

        const aidRSIDProj = 'idRSIDProj';
        const bidRSIDProj = r_currentID;
        var cidRSIDProj = aidRSIDProj + bidRSIDProj;

        const aidLD_EmailProj = 'idRSEmailProj';
        const bidLD_EmailProj = r_currentID;
        var cidLD_EmailProj = aidLD_EmailProj + bidLD_EmailProj;

        const aidRSNameProj = 'idRSNameProj';
        const bidRSNameProj = r_currentID;
        var cidRSNameProj = aidRSNameProj + bidRSNameProj;

        const aidRSLnameProj = 'idRSLnameProj';
        const bidRSLnameProj = r_currentID;
        var cidRSLnameProj = aidRSLnameProj + bidRSLnameProj;

        /*ค้นหาชื่อนักวิจัย*/
        $.ajax({
          type: 'GET',
          url: '/getusername?emailsearchUserLD=' + emailsearchUserRS,
          dataType: 'json',
          success: function(rows) {
            if (rows == '') {
              document.getElementById("notFoundsearchUserRS").classList.remove("hide");
            } else {

              function addrows() {
                r_t.row.add([
                  '<p id="idRSEmailProj' + r_currentID + '" ></p>',
                  '<p id="idRSNameProj' + r_currentID + '" ></p>',
                  '<p id="idRSLnameProj' + r_currentID + '" ></p>',
                  '<input type="hidden" id="idRSIDProj' + r_currentID + '" name="nameRSIDProj' + r_currentID + '" value=""/><input type="text" id="nameProportionRS' + r_currentID + '" name="nameProportionRS' + r_currentID + '" placeholder="สัดส่วนงานวิจัย"autocomplete="off" />',
                ]).draw(false);
              }

              function insertDatainrows() {
                document.getElementById("notFoundsearchUserRS").classList.add("hide");
                const iduser = rows[0].id;
                const email = rows[0].email;
                const firstname = rows[0].firstname;
                const lastname = rows[0].lastname;

                document.getElementById(cidRSIDProj).value = iduser;

                document.getElementById(cidLD_EmailProj).innerHTML = email;
                document.getElementById(cidRSNameProj).innerHTML = firstname;
                document.getElementById(cidRSLnameProj).innerHTML = lastname;


                r_countID++;

                document.getElementById("searchUserRS").value = "";
              }

              async function asyncCall() {
                await addrows();
                await insertDatainrows();
              }

              asyncCall();
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
