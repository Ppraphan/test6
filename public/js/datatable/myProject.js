/*myProjectTable*/
$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('table.myProjectTable tfoot th').each(function() {
    var title = $(this).text();
    $(this).html('<input type="text" id="txtSearchbuttomMyProjectTable" placeholder="Search ' + title + '" />');
  });;

    // DataTable
  var table = $('table.myProjectTable').DataTable({
    "columns": [
      {
        "width": "55px",
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

  $('#txtSearchTopMyProjectTable').on('keyup', function() {
    $('table.myProjectTable')
      .DataTable()
      .search($('#txtSearchTopMyProjectTable').val(), false, true)
      .draw();
  });

  $('#txtSearchbuttomMyProjectTable').on('keyup', function() {
    $('table.myProjectTable')
      .DataTable()
      .search($('#txtSearchbuttomMyProjectTable').val(), false, true)
      .draw();
  });

});
