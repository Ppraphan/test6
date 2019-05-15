/*allUserTable*/
$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('#allUserTable tfoot th').each(function() {
    var title = $(this).text();
    $(this).html('<input type="text" id="txtSearch" placeholder="Search ' + title + '" />');
  });;

  // DataTable
  var table = $('#allUserTable').DataTable({
    "columns": [
      null,
      null,
      null,
      null,
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

  $('#txtSearchAllUser').on('keyup', function() {
    $('#allUserTable')
      .DataTable()
      .search($('#txtSearchAllUser').val(), false, true)
      .draw();
  });

  $('#txtSearch').on('keyup', function() {
    $('#allUserTable')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
  });
});
