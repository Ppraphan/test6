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


/*departmentTable*/
$(document).ready(function() {
    // Setup - add a text input to each footer cell
    $('#departmentTable tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" id="txtSearch" placeholder="Search '+title+'" />' );
    } );
});



/*txtSearch departmentTable*/
$(document).ready(function() {
  $('#departmentTable').DataTable({
    "searching": false,
    "columnDefs": [
    { "orderable": false, "targets": 5 },
    { "orderable": false, "targets": 6 }
  ]
  });
  $('#txtSearch').on('keyup', function() {
    $('#departmentTable')
      .DataTable()
      .search($('#txtSearch').val(), false, true)
      .draw();
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

  $('#delb').click(function() {
    table.row('.selected').remove().draw(false);
  });

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
