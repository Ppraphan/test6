var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = require('./connect-db.js');
module.exports = function(app) {

  app.get('/my-portforio', function(req, res) {
    var userinfo =req.user;
    var mses = req.query.valid;
    var query = con.query('SELECT * FROM tresearchtype', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/my-portforio', {
        userinfo:userinfo,
        data: rows,
        messages: mses,
      });
    });
  });

  app.get("/my-portforio/reqAlltype/", function(req, res) {
    var sql = "SELECT Name_researchType FROM tresearchtype";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      r2 = rows;
      res.send(r2);
    });
  });

  app.post('/my-portforio', function(req, res) {
    var userinfo =req.user;
    var file_Name = req.body.file_Name;
    var file_NameLowcase = file_Name.toLowerCase();
    var fName = (file_NameLowcase);
    var mses = file_NameLowcase;

    sql = "Insert into tresearchtype(Name_researchType) values('" + fName + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM tresearchtype', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/my-portforio', {
        userinfo:userinfo,
        data: rows,
        messages: 'เพิ่ม  '+ mses + '  เรียบร้อยแล้ว',
      });
    });
  });

  app.get('/my-portforio/delete/:id', function(req, res) {
    var idRST = req.params.id;

    console.log(idRST);
    var query2 = "DELETE FROM tresearchtype WHERE idresearchType='" + idRST + "'";

    console.log(query2);
    con.query(query2, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/my-portforio?valid=' + mses);
  });

  app.post('/my-portforio/update', function(req, res) {
    console.log(req.body.file_NameUpdate);
    console.log(req.body.file_Nameold);
    var oldname = req.body.file_Nameold;
    var newname = req.body.file_NameUpdate;

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

    var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น' + newname + 'เรียบร้อยแล้ว');
    res.redirect('/my-portforio?valid=' + mses);
  });
}
