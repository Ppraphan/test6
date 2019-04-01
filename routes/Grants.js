var mysql = require('mysql');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/


module.exports = function(app) {

  app.get('/grants', function(req, res) {
    var mses = req.query.valid;
    var userinfo =req.user;
    var query = con.query('SELECT * FROM project.grants', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/grants', {
        userinfo:userinfo,
        messages: mses,
        data: rows,
      });
    });
  });
/*get ชื่อทุนวิจัยจากปีที่ถูกเลือก*/
app.get("/grants/getgrantsnamefromyear/", function(req, res) {
  var catdata = req.query.budgetYear;
  console.log(catdata);

  var sql = "SELECT * FROM project.grants WHERE grants_Years ='" + catdata + "' ";
  console.log(sql);
  con.query(sql, function(err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});


  app.post('/grants', function(req, res) {
    console.log(req.body.grants_Name);
    if(req.body.grants_Name){
      var grants_Name = req.body.grants_Name;
      var grants_Years = req.body.grants_Years;
      var grants_Supporter = req.body.grants_Supporter;
      var grants_Type = req.body.grants_Type;


      sql = "Insert into grants(grants_Name,grants_Years,grants_Supporter,grants_Type) values('" + grants_Name + "','" + grants_Years + "','" + grants_Supporter + "','" + grants_Type + "')";
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Insert Complete...");
      });

      var query = con.query('SELECT * FROM project.grants', function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
      });
      res.redirect('/grants');
    }
    else{
      res.redirect('/grants');
    }

  });

  app.get('/grants/delete/:id', function(req, res) {

    var query = "DELETE FROM grants WHERE idGrants=" + req.params.id;
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/grants');
  });



  app.get("/grants/detail/:catdata2", function(req, res) {
    var catdata = req.params.catdata2;
    console.log(catdata);

    //  Query uses the value from the url.
    var sql = "SELECT * FROM project.grants WHERE idGrants='" + req.params.catdata2 + "'";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.post('/grants/update/', function(req, res) {
    var idGrants =req.body.gIDEdit;
    var grants_Name = req.body.grants_Name;
    var grants_Years = req.body.grants_Years;
    var grants_Supporter = req.body.grants_Supporter;
    var grants_Type = req.body.grants_Type;


    var sql = "UPDATE grants SET grants_Name ='" + req.body.grants_Name +
              "',grants_Years='"+ req.body.grants_Years +
              "',grants_Supporter='"+ req.body.grants_Supporter +
              "',grants_Type='"+ req.body.grants_Type +
              "' WHERE idGrants ='" + req.body.gIDEdit + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/grants');
  });


}
