/*myProjectTable*/
$(document).ready(function() {
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
    ]
  });

});
