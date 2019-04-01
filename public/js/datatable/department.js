/*departmentTable*/
$(document).ready(function() {
  // Setup - add a text input to each footer cell
  $('#departmentTable tfoot th').each(function() {
    var title = $(this).text();
    $(this).html('<input type="text" id="txtSearch" placeholder="Search ' + title + '" />');
  });;

  // DataTable
  var table = $('#departmentTable').DataTable();

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

  $('#txtSearchDepartment').on('keyup', function() {
    $('#departmentTable')
      .DataTable()
      .search($('#txtSearchDepartment').val(), false, true)
      .draw();
  });

  $('#txtSearch').on('keyup', function() {
    $('#departmentTable')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
  });

});
