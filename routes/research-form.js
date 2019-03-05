var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = mysql.createConnection({
  host: "35.220.198.55",
  user: "root",
  password: "itmyfinalproject",
  database: "project"
});

module.exports = function(app) {

  app.get('/research-form', function(req, res) {
    var userinfo =req.user;
    var mses = req.query.valid;
    var query = con.query('SELECT * FROM project.researchform', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/research-form', {
        userinfo:userinfo,
        data: rows,
        messages: mses,
      });
    });
  });

  app.get("/research-form/reqAlltype/", function(req, res) {
    var sql = "SELECT researchformName FROM project.researchform";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      r2 = rows;
      console.log(r2);
      res.send(r2);
    });
  });

  app.post('/research-form', function(req, res) {
    var userinfo =req.user;
    var file_Name = req.body.file_Name;
    var file_NameLowcase = file_Name.toLowerCase();
    var fName = (file_NameLowcase);
    var mses = file_NameLowcase;

    sql = "Insert into project.researchform(researchformName) values('" + fName + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM project.researchform', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/research-form', {
        userinfo:userinfo,
        data: rows,
        messages: 'เพิ่ม  '+ mses + '  เรียบร้อยแล้ว',
      });
    });
  });

  app.get('/research-form/delete/:id', function(req, res) {
    var idRST = req.params.id;

    console.log(idRST);
    var query2 = "DELETE FROM project.researchform WHERE researchformID='" + idRST + "'";

    console.log(query2);
    con.query(query2, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/research-form?valid=' + mses);
  });

  app.post('/research-form/update', function(req, res) {
    console.log(req.body.file_NameUpdate);
    console.log(req.body.file_Nameold);
    var oldname = req.body.file_Nameold;
    var newname = req.body.file_NameUpdate;

    var sql = "UPDATE project.researchform SET researchformName ='" + req.body.file_NameUpdate + "' WHERE researchformName ='" + req.body.file_Nameold + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = "SELECT * FROM project.researchform"
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น' + newname + 'เรียบร้อยแล้ว');
    res.redirect('/research-form?valid=' + mses);
  });
}
