/*Department-table*/
$(document).ready(function() {
  $('#Department-table').DataTable({    
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

/*researchtype-Table*/
$(document).ready(function() {
  var t = $('#researchtype-Table').DataTable({
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
    "order": [0, 'desc']
  });
  var table = $('#form-Table').DataTable({
    "columns": [{
        "orderable": false
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

  $('#delb').click(function() {
    table.row('.selected').remove().draw(false);
  });

});
