/*researchtype-Table*/
$(document).ready(function() {
  var table = $('#ourResearcher').DataTable({
    "info": false,
    "searching": true,
    "pageLength": 4,
    "columns": [{
        "orderable": false
      },
      {
        "orderable": false
      },
      {
        "orderable": false
      },
    ]
  });



  $('#txtourResearcher').on('keyup', function() {
    $('#ourResearcher')
      .DataTable()
      .search($('#txtourResearcher').val(), false, true)
      .draw();
  });

  $('#selectFac').on('change', function() {
    $('#ourResearcher')
      .DataTable()
      .search($('#selectFac').val(), false, true)
      .draw();
  });

$('#selectacademicPos').on('change', function() {
  $('#ourResearcher')
    .DataTable()
    .search($('#selectacademicPos').val(), false, true)
    .draw();
});

});
