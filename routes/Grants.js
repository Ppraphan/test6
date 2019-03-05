var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.220.198.55",
  user: "root",
  password: "itmyfinalproject",
  database: "project"
});

module.exports = function(app) {

  app.get('/grants', function(req, res) {
    var userinfo =req.user;
    var query = con.query('SELECT * FROM project.grants', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/grants', {
        userinfo:userinfo,
        data: rows,
      });
    });
  });


  app.post('/grants', function(req, res) {
    console.log(req.body.grants_Name);
    if(req.body.grants_Name){
      var grants_Name = req.body.grants_Name;
      var grants_Years = req.body.grants_Years;
      var grants_Supporter = req.body.grants_Supporter;
      var grants_Type = req.body.grants_Type;
      var grants_detail = req.body.grants_detail;



      sql = "Insert into grants(grants_Name,grants_Years,grants_Supporter,grants_Type,grants_detail) values('" + grants_Name + "','" + grants_Years + "','" + grants_Supporter + "','" + grants_Type + "','" + grants_detail + "')";
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Insert Complete...");
      });

      var query = con.query('SELECT * FROM project.grants', function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
      });
      res.redirect('/grants');
      res.status(200).json('success');
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
    var grants_detail = req.body.grants_detail;

    var sql = "UPDATE grants SET grants_Name ='" + req.body.grants_Name +
              "',grants_Years='"+ req.body.grants_Years +
              "',grants_Supporter='"+ req.body.grants_Supporter +
              "',grants_Type='"+ req.body.grants_Type +
              "',grants_detail='"+ req.body.grants_detail +
              "' WHERE idGrants ='" + req.body.grants_ID + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/grants');
  });


}
