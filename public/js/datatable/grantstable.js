/*grantstable*/
$(document).ready(function() {
  $('#grantstable').DataTable({
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


});
/*txtSearch-grants-table*/
$(document).ready(function() {
  $('#grantstable').DataTable();


  $('#txtSearch').on('keyup', function() {
    $('#grantstable')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
  });
});
