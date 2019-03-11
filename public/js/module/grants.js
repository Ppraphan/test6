/*ฟังก์ชันเพิ่ม-แสดง-ทุนงานวิจัย*/
function myFunctiongrants() {
  document.getElementById("addRT").classList.add("hide");
  var x = document.getElementById("pageNewGrants");
  var y = document.getElementById("pageShowAllGrants");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
};

function myFunctiongrants2() {
  document.getElementById("addRT").classList.remove("hide");
  var x = document.getElementById("pageNewGrants");
  var y = document.getElementById("pageShowAllGrants");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};
/*ฟังก์ชันแสดงทั้งหมด => เรียกดูรายละเอียด ของฟังก์ชันทุนงานวิจัย*/
function myFunctiongrants3(data) {
  var catdata2 = data;
  //   Note the url below. It adds catid=(#categoryBox value from above).
  $.ajax({
    type: 'GET',
    url: './grants/detail/' + catdata2,
    dataType: 'json',
    success: function(rows) {
      document.getElementById("gYearID").innerHTML = rows[i].grants_Years;
      document.getElementById("gTypeID").innerHTML = rows[i].grants_Type;
      document.getElementById("gNameID").innerHTML = rows[i].grants_Name;
      document.getElementById("gSupporterID").innerHTML = rows[i].grants_Supporter;
      document.getElementById("gDetailID").innerHTML = rows[i].grants_detail;
    }
  });

  document.getElementById("addRT").classList.add("hide");

  var x = document.getElementById("pageGrantsDetail");
  var y = document.getElementById("pageShowAllGrants");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
};

function myFunctiongrants4() {
document.getElementById("addRT").classList.remove("hide");

  var x = document.getElementById("pageShowAllGrants");
  var y = document.getElementById("pageGrantsDetail");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
};

function myFunctiongrants5(data) {
  addRT.classList.remove("disabled");
  var catdata2 = data;
  //   Note the url below. It adds catid=(#categoryBox value from above).
  $.ajax({
    type: 'GET',
    url: './grants/detail/' + catdata2,
    dataType: 'json',
    success: function(rows) {
      document.getElementById("gIDEdit").value = rows[i].idGrants;
      document.getElementById("gYearIDEdit").value = rows[i].grants_Years;
      document.getElementById("gTypeIDEdit").value = rows[i].grants_Type;
      document.getElementById("gNameIDEdit").value = rows[i].grants_Name;
      document.getElementById("gSupporterIDEdit").value = rows[i].grants_Supporter;
      document.getElementById("gDetailIDEdit").value = rows[i].grants_detail;
    }
  });


  var y = document.getElementById("pageShowAllGrants");
  var x = document.getElementById("pageEditGrantsDetail");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
};
