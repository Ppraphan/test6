/*allProjectTable*/
$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('#allProjectTable tfoot th').each(function() {
    var title = $(this).text();
    $(this).html('<input type="text" id="txtSearchbuttomProjectTable" placeholder="Search ' + title + '" />');
  });;

    // DataTable
  var table = $('#allProjectTable').DataTable({
    "columns": [
      {
        "width": "55px",
      },
      {
        "width": "30px",
      },
      null,
      {
        "width": "55px",
        "orderable": false,
      },
      {
        "width": "55px",
        "orderable": false,
      },
    ]
  });

  // Apply the search
  table.columns().every(function() {
    var that = this;

    $('input', this.footer()).on('keyup change', function() {
      if (that.search() !== this.value) {
        that
          .search(this.value)
          .draw();
      }
    });
  });

  $('#txtSearchTopProjectTable').on('keyup', function() {
    $('#allProjectTable')
      .DataTable()
      .search($('#txtSearchTopProjectTable').val(), false, true)
      .draw();
  });

  $('#txtSearchbuttomProjectTable').on('keyup', function() {
    $('#allProjectTable')
      .DataTable()
      .search($('#txtSearchbuttomProjectTable').val(), false, true)
      .draw();
  });

});
