var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
})

module.exports = function (app) {
  app.get('/Research-Type', function(req, res) {
    var query = con.query('SELECT * FROM tresearchtype', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Research-Type', {
        data: rows
      });
    });
  });

  app.post('/research-type', function(req, res) {
    var file_Name = req.body.file_Name;
    var fName = (file_Name);

    sql = "Insert into tresearchtype(Name_researchType) values('" + fName + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM tresearchtype', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Research-Type', {
        data: rows
      });
    });
  });

  app.get('/research-type/delete/:id', function(req, res) {
    var query = "DELETE FROM tresearchtype WHERE idresearchType=" + req.params.id;
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/research-type');
  });

  app.post('/research-type/update', function(req, res) {
    console.log(req.body.file_NameUpdate);
    console.log(req.body.file_Nameold);

    var sql = "UPDATE tresearchtype SET Name_researchType ='" + req.body.file_NameUpdate + "' WHERE Name_researchType ='" + req.body.file_Nameold + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = "SELECT * FROM tresearchtype"
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/research-type');
  });
}
