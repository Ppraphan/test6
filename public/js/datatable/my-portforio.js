/*researchtype-Table*/
$(document).ready(function() {
  var t = $('#myPortforioTable').DataTable({
    "columns": [{
        "orderable": false
      },
      {
        "orderable": false
      },
      {
        "orderable": false
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

  t.on('order.dt search.dt', function() {
    t.column(0, {
      search: 'applied',
      order: 'applied'
    }).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();
});
