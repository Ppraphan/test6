/*researchbranch-Table*/
$(document).ready(function() {
  var t = $('#researchbranchTable').DataTable({
    "columns": [{
        "orderable": false
      },
      {
        "orderable": true
      },
      {
        "orderable": false
      },
      {
        "orderable": false
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
