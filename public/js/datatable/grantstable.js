/*grantstable*/
$(document).ready(function() {
  // DataTable
var table = $('#grantstable').DataTable({
  "columns": [
    {
      "width": "20px",
    },
    {
      "width": "55px",
      "orderable": false,
    },
    {
      "width": "120px",
      "orderable": false,
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
  ],
  initComplete: function() {
    this.api().columns().every(function() {
      var column = this;
      var select = $('<select><option value=""></option></select>')
        .appendTo($(column.footer()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );

          column
            .search(val ? '^' + val + '$' : '', true, false)
            .draw();
        });

      column.data().unique().sort().each(function(d, j) {
        select.append('<option value="' + d + '">' + d + '</option>')
      });
    });

  }
});
table.on('order.dt search.dt', function() {
  table.column(0, {
    search: 'applied',
    order: 'applied'
  }).nodes().each(function(cell, i) {
    cell.innerHTML = i + 1;
  });
}).draw();

  // $('#grantstable').DataTable({
  //
  //
  // });


});
/*txtSearch-grants-table*/
$(document).ready(function() {
  $('#txtSearch').on('keyup', function() {
    $('#grantstable')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
  });
});
