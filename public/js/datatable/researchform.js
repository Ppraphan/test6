/*researchform-Table*/
$(document).ready(function() {
  var t = $('#researchformTable').DataTable({
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

/*form-Table*/
$(document).ready(function() {
  $.extend($.fn.dataTable.defaults, {
    "order": [0, 'asc']
  });
  var table = $('#form-Table').DataTable({
    "columns": [{
        "orderable": true
      },
      null,
      {
        "orderable": false
      },
      {
        "orderable": false
      },
      {
        "orderable": false
      },
    ],
  });

  table.on('order.dt search.dt', function() {
    table.column(0, {
      search: 'applied',
      order: 'applied'
    }).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();

});
/*txtSearch-form-Table*/
$(document).ready(function() {
  $('#form-Table').DataTable();


  $('#txtSearch').on('keyup', function() {
    $('#form-Table')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
  });
});
