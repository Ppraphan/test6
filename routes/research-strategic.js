var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');
const con = require('./connect-db.js');

module.exports = function(app) {

  app.get('/research-strategic', function(req, res) {
    var userinfo =req.user;
    var mses = req.query.valid;
    var query = con.query('SELECT * FROM researchstrategic', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/research-strategic', {
        userinfo:userinfo,
        data: rows,
        messages: mses,
      });
    });
  });

  app.get("/research-strategic/reqAlltype/", function(req, res) {
    var sql = "SELECT rsearchStrategicName FROM researchstrategic";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      r2 = rows;
      res.send(r2);
    });
  });

  app.post('/research-strategic', function(req, res) {
    var userinfo =req.user;
    var file_Name = req.body.file_Name;
    var file_NameLowcase = file_Name.toLowerCase();
    var fName = (file_NameLowcase);
    var mses = file_NameLowcase;

    sql = "Insert into researchstrategic(rsearchStrategicName) values('" + fName + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM researchstrategic', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/research-strategic', {
        userinfo:userinfo,
        data: rows,
        messages: 'เพิ่ม  '+ mses + '  เรียบร้อยแล้ว',
      });
    });
  });

  app.get('/research-strategic/delete/:id', function(req, res) {
    var idRST = req.params.id;

    console.log(idRST);
    var query2 = "DELETE FROM researchstrategic WHERE researchstrategicID='" + idRST + "'";

    console.log(query2);
    con.query(query2, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/research-strategic?valid=' + mses);
  });

  app.post('/research-strategic/update', function(req, res) {
    console.log(req.body.file_NameUpdate);
    console.log(req.body.file_Nameold);
    var oldname = req.body.file_Nameold;
    var newname = req.body.file_NameUpdate;

    var sql = "UPDATE researchstrategic SET rsearchStrategicName ='" + req.body.file_NameUpdate + "' WHERE rsearchStrategicName ='" + req.body.file_Nameold + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = "SELECT * FROM researchstrategic"
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น' + newname + 'เรียบร้อยแล้ว');
    res.redirect('/research-strategic?valid=' + mses);
  });
}
