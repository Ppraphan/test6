$(document).foundation();


function myFunction() {
    var x = document.getElementById("555");
    var y = document.getElementById("666");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }
}

$(document).ready(function() {
  $('#data').after('<ul id="nav" class="pagination text-center"></ul>');
  var rowsShown = 10;
  var rowsTotal = $('#data tbody tr').length;
  var numPages = rowsTotal / rowsShown;
  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    if (pageNum == 3) {
      $('#nav').append('<li><a' + i + '" class="ellipsis" aria-hidden="true"></a></li> ');
    } else {
      $('#nav').append('<li><a href="#" rel="' + i + '">' + pageNum + '</a></li> ');
    }
  }
  $('#data tbody tr ').hide();
  $('#data tbody tr ').slice(0, rowsShown).show();

  $('#nav a:first').addClass('active');
  $('#nav a').bind('click', function() {
    $('#nav a').removeClass('active');
    $(this).addClass('active');
    var currPage = $(this).attr('rel');
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $('#data tbody tr ').css('opacity', '0.0').hide().slice(startItem, endItem).
    css('display', 'table-row').animate({
      opacity: 1
    }, 300);
  });
});


$(document).ready(function() {

  $.extend($.fn.dataTable.defaults, {
    "order": [0, 'desc']
  });

  var table = $('#example').DataTable({
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

  $('#example tbody').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    alert(data[0] + "'s salary is: " + data[1]);
  });
  $('#delb').click(function() {
    table.row('.selected').remove().draw(false);
  });

});

$(document).ready(function() {



  var t = $('#example2').DataTable({
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




/*
$(document).ready(function(){
  $('#delb').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/forms/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
*/

$(function() {
  var showClass = 'show';
  $('input').on('checkval', function() {
    var label = $(this).prev('label');
    if (this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function() {
    $(this).trigger('checkval');
  });
});


// $(document).ready(function() {
//      $(':input[type="submit"]').prop('disabled', true);
//      $('input[type="text"]').keyup(function() {
//         if($(this).val() != '') {
//            $(':input[type="submit"]').prop('disabled', false);
//         }
//      });
//  });

$('input[type=file]').change(function() {
  var hasNoFiles = this.files.length == 0;
  $(this).closest('form') /* Select the form element */
    .find('input[type=submit]') /* Get the submit button */
    .prop('disabled', hasNoFiles); /* Disable the button. */
});


$('#myform > input').on('input', function() {
  var empty = false;
  $('form > input, form > select').each(function() {
    if ($(this).val() == '') {
      empty = true;
    }
  });

  if (empty) {
    $('#register').attr('disabled', 'disabled');
  } else {
    $('#register').removeAttr('disabled');
  }
});
