  // var ctx = document.getElementById("myChart2");
  // var myChart = new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ["ภาควิชาวิศวกรรมคอมพิวเตอร์", "ภาควิชาวิศวกรรมไฟฟ้า", "ภาควิชาวิศวกรรมเครื่องกล", "ภาควิชาวิศวกรรมโยธา", "ภาควิชาวิศวกรรมอุตสาหการ", "ภาควิชาวิศวกรรมอาหาร"],
  //     datasets: [{
  //       label: 'จำนวนนักวิจัย',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   }
  // });


  $(document).ready(function() {
    $('#id_dataTypeofResearch').change(function() {
      var allofyears = [];
      var numberOfGrants = [];
      var dataTypeof = document.getElementById("id_dataTypeofResearch").value;

      if (dataTypeof == "numberOfResearchGrants") {

        $.ajax({
          type: 'GET',
          url: '/report/allofyears',
          dataType: 'json',
          success: function(rows) {

            $('#id_beginYear').append('<option selected value="-">' + "เลือก" + '</option>');
            $('#id_endYear').append('<option selected value="-">' + "เลือก" + '</option>');
            for (var i = 0; i < rows[0].length; i++) {

              allofyears.push(rows[0][i].grants_Years);
              numberOfGrants.push(rows[1][i].count);


              $('#id_beginYear').append('<option value="' + rows[0][i].grants_Years + '">' + rows[0][i].grants_Years + '</option>');
              $('#id_endYear').append('<option value="' + rows[0][i].grants_Years + '">' + rows[0][i].grants_Years + '</option>');
            };
            var ctx = document.getElementById("myChart2").getContext("2d");

            var data = {
              labels: ["Chocolate", "Vanilla", "Strawberry","ภาควิชา 1","ภาควิชา 2","ภาควิชา 3"],
              datasets: [{
                label: "ทุนภายนอก",
                backgroundColor: "#305f72",
                data: [3, 7, 4,11,7,3]
              }, {
                label: "ทุนภายใน",
                backgroundColor: "#f1d1b5",
                data: [4, 3, 5,8,2,12]
              }, ]
            };

            var myBarChart = new Chart(ctx, {
              type: 'bar',
              data: data,
              options: {
                barValueSpacing: 20,
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                    }
                  }]
                }
              }
            });





          }
        });





      }
    });
  });
