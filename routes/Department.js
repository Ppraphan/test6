var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
})

module.exports = function (app) {
  app.get('/Department', function(req, res) {
    var query = con.query('select Dpment_Name, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from en_dpment en, sub_dpment sd where en.Dpment_ID = sd.Sub_Dpment_Parent', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Department', {
        data: rows
      });
    });
  });
  app.post('/Department', function(req, res) {
    var parent_Dpment = req.body.parent_Dpment;
    var dpmant_name = req.body.dpmant_name;

    sql = "Insert into sub_dpment(Sub_Dpment_name,Sub_Dpment_Parent) values('" + dpmant_name + "','" + parent_Dpment + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('select Dpment_Name, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from en_dpment en, sub_dpment sd where en.Dpment_ID = sd.Sub_Dpment_Parent', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Department', {
        data: rows
      });
    });
  });

  app.post('/Department/update', function(req, res) {
    var sql = "UPDATE sub_dpment SET Sub_Dpment_name ='" + req.body.file_NameUpdate + "' WHERE Sub_Dpment_name ='" + req.body.file_Nameold + "'AND Sub_Dpment_Parent='" + req.body.Sub_Dpment_Parent + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = con.query('select Dpment_Name, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from en_dpment en, sub_dpment sd where en.Dpment_ID = sd.Sub_Dpment_Parent', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Department', {
        data: rows
      });
    });
    res.redirect('/Department');
  });

  app.get('/Department/delete/:id', function(req, res) {
    var query = "DELETE FROM sub_dpment WHERE Sub_Dpment_ID =" + req.params.id;
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    res.redirect('/Department');
  });
}
