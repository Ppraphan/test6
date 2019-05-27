/*เพิ่มหัวหน้าโครงการ*/
$(document).ready(function() {
  var coulistLD = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var invertstack = [];
  var countID = 0;
  var currentID;

  /*init ตาราง*/
  var t = $('#view-memberLDProjTable').DataTable({
    "searching": false,
    "paging": false,
    "ordering": false,
    "info": false,

    "columnDefs": [{
      "targets": '_all',
      "searchable": false,

    }, {
      "width": "7rem",
      "targets": 3
    }]

  });

  $('#view-memberLDProjTable tbody').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      t.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  $('#removeRow').click(function() {
    function returnstack() {
      if (invertstack.length != 0) {

        var del = $('.selected td input[type=hidden]').attr('id');
        del = del.substr(del.length - 1);
        alert(del);
        for (var i = 0; i < invertstack.length; i++) {
          if (invertstack[i] == del) {
            invertstack.splice(i, 1);
            coulistLD.push(del);
          }
        }
        t.row('.selected').remove().draw(false);
      } else {
        alert("กรุณาเลือกรายการ");
      }
    }


      returnstack();






  });



  $("#addRow").on('click', function() {
    if (coulistLD.length < 1) {
      alert("สามารถเพิ่มได้สูงสุด 10 ท่าน");
      document.getElementById("searchUserLD").value = "";
    }
    if (coulistLD.length <= 10) {

      invertstack.push(currentID = coulistLD.pop());

      const emailsearchUserLD = document.getElementById("searchUserLD").value;

      if ($.trim($('#searchUserLD').val()) == '') {
        document.getElementById("emptrySearchUserLD").classList.remove("hide");

        document.getElementById("notFoundSearchUserLD").classList.add("hide");
      } else {

        document.getElementById("emptrySearchUserLD").classList.add("hide");

        const aidLDIDProj = 'idLDIDProj';
        const bidLDIDProj = currentID;
        var cidLDIDProj = aidLDIDProj + bidLDIDProj;

        const aidLD_EmailProj = 'idLDEmailProj';
        const bidLD_EmailProj = currentID;
        var cidLD_EmailProj = aidLD_EmailProj + bidLD_EmailProj;

        const aidLDNameProj = 'idLDNameProj';
        const bidLDNameProj = currentID;
        var cidLDNameProj = aidLDNameProj + bidLDNameProj;

        const aidLDLnameProj = 'idLDLnameProj';
        const bidLDLnameProj = currentID;
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

              function addrows() {
                t.row.add([
                  '<p id="idLDEmailProj' + currentID + '" ></p>',
                  '<p id="idLDNameProj' + currentID + '" ></p>',
                  '<p id="idLDLnameProj' + currentID + '" ></p>',
                  '<input type="hidden" id="idLDIDProj' + currentID + '" name="nameLDIDProj' + currentID + '" value=""/><input required type="text" id="nameProportionLD' + currentID + '" name="nameProportionLD' + currentID + '" placeholder="สัดส่วนงานวิจัย" autocomplete="off"/>',
                ]).draw(false);
              }

              function insertDatainrows() {
                document.getElementById("notFoundSearchUserLD").classList.add("hide");
                const iduser = rows[0].id;
                const email = rows[0].email;
                const firstname = rows[0].firstname;
                const lastname = rows[0].lastname;

                document.getElementById(cidLDIDProj).value = iduser;

                document.getElementById(cidLD_EmailProj).innerHTML = email;
                document.getElementById(cidLDNameProj).innerHTML = firstname;
                document.getElementById(cidLDLnameProj).innerHTML = lastname;


                countID++;

                document.getElementById("searchUserLD").value = "";
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
