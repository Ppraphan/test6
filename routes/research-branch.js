var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
})

module.exports = function(app) {

  app.get('/research-branch', function(req, res) {
    var mses = req.query.valid;
    var query = con.query('SELECT * FROM researchbranch', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Research-branch', {
        data: rows,
        messages: mses,
      });
    });
  });

  app.get("/research-branch/reqAlltype/", function(req, res) {
    var sql = "SELECT researchbranchName FROM researchbranch";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      r2 = rows;
      res.send(r2);
    });
  });

  app.post('/research-branch', function(req, res) {
    var file_Name = req.body.file_Name;
    var file_NameLowcase = file_Name.toLowerCase();
    var fName = (file_NameLowcase);
    var mses = file_NameLowcase;

    sql = "Insert into researchbranch(researchbranchName) values('" + fName + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM researchbranch', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/research-branch', {
        data: rows,
        messages: 'เพิ่ม  '+ mses + '  เรียบร้อยแล้ว',
      });
    });
  });

  app.get('/research-branch/delete/:id', function(req, res) {
    var idRST = req.params.id;

    console.log(idRST);
    var query2 = "DELETE FROM researchbranch WHERE researchbranchID='" + idRST + "'";

    console.log(query2);
    con.query(query2, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/research-branch?valid=' + mses);
  });

  app.post('/research-branch/update', function(req, res) {
    console.log(req.body.file_NameUpdate);
    console.log(req.body.file_Nameold);
    var oldname = req.body.file_Nameold;
    var newname = req.body.file_NameUpdate;

    var sql = "UPDATE researchbranch SET researchbranchName ='" + req.body.file_NameUpdate + "' WHERE researchbranchName ='" + req.body.file_Nameold + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = "SELECT * FROM researchbranch"
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น' + newname + 'เรียบร้อยแล้ว');
    res.redirect('/research-branch?valid=' + mses);
  });
}
