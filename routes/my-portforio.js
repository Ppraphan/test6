var axios = require('axios');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
var con = require('./connect-db.js');
var Busboy = require('busboy');


module.exports = function(app) {

  /*เปิดหน้าผลงานของฉัน*/
  app.get('/my-portforio', function(req, res) {

    var userinfo = req.user;
    var mses = req.query.valid;
    var query = con.query('SELECT * FROM project.portfolio', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/my-portforio', {
        userinfo: userinfo,
        messages: mses,

        data: rows,
      });
    });
  });

  /*ดาวน์โหลด-เอกสารผลงานของฉัน*/
  app.get('/my-portforio/download/:id', function(req, res) {
    var file = './portforioDoc/' + req.params.id;
    res.download(file); // Set disposition and send it.
  });
  /*ลบรายการ-ผลงานของฉัน*/
  app.get('/my-portforio/delete/:id', function(req, res) {
    var id = req.params.id;

    var sql = "SELECT documentFile FROM  project.portfolio WHERE idportfolio=" + req.params.id;

    con.query(sql, function(err, fields) {
      if (err) throw err;
      var filePath = './portforioDoc/' + fields[0].documentFile;
      console.log(filePath);
      fs.unlinkSync(filePath);
    });

    var query2 = "DELETE FROM project.portfolio WHERE idportfolio='" + id + "'";
    console.log(query2);
    con.query(query2, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/my-portforio?valid=' + mses);
  });

  /*เพิ่มผลงานของฉันใหม่*/
  app.post('/my-portforio', function(req, res) {
    var userinfo = req.user;
    var userid = req.user.id;
    var mses = req.query.valid;

    var portName = req.body.portName;
    var portAbout = req.body.portAbout;
    var portFile = req.files.portFile;
    var portType = req.body.portType;

    if (portFile != '' && portFile != undefined) {

      var portFileName = req.files.portFile.name;
      var filesize = req.files.portFile.data.length;
      var pdfmaxsize = "30000000";

      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var formatted = dt.format('YmdHMS');

      if (filesize < pdfmaxsize) {
        console.log("filesize2 : " + filesize);

        portFile.mv('./portforioDoc/' + userid + formatted + portFileName, function(err) {
          if (portFile == null) {
            console.log(err);
          } else {
            console.log('../portforioDoc/' + userid + formatted + portFileName + "\t" + "uploaded");
          }
        });

        var sql = "Insert into project.portfolio(userID,title,about,documentFile,categoryID) values('" + userid + "','" + portName + "','" + portAbout + "','" + userid + formatted + portFileName + "','" + portType + "')";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });

        var query = con.query('SELECT * FROM project.portfolio', function(err, rows) {
          if (err)
            console.log("Error Selecting : %s ", err);

          res.render('pages/my-portforio', {
            userinfo: userinfo,
            messages: mses,

            data: rows,
          });
        });
      } else {
        var mses = encodeURIComponent('ไฟล์มีขนาดใหญ่เกินกว่า 30 MB');

        res.redirect('/my-portforio?valid=' + mses);
      }
    } else {
      sql1 = "Insert into project.portfolio(userID,title,about,documentFile,categoryID) values('" + userid + "','" + portName + "','" + portAbout + "','-','" + portType + "')";
      con.query(sql1);
      var query = con.query('SELECT * FROM project.portfolio', function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);

        res.render('pages/my-portforio', {
          userinfo: userinfo,
          messages: mses,

          data: rows,
        });
      });

    }



  });

  /*แก้ไขผลงาน*/
  app.post('/my-portforio/update', function(req, res) {
    var userinfo = req.user;
    var userid = req.user.id;
    var mses = req.query.valid;

    var portID = req.body.portID;
    var portName = req.body.portName;
    var portAbout = req.body.portAbout;
    var portFile = req.files.portFile;
    var portType = req.body.portType;

    if (portFile != '' && portFile != undefined) {

      var portFileName = req.files.portFile.name;
      var filesize = req.files.portFile.data.length;
      var pdfmaxsize = "30000000";

      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var formatted = dt.format('YmdHMS');

      /*ตรวจสอบขนาดไฟล์*/
      if (filesize < pdfmaxsize) {
        var sql = "SELECT documentFile FROM  project.portfolio WHERE idportfolio=" + portID;

        con.query(sql, function(err, fields) {
          if (err) throw err;
          var filePath = './portforioDoc/' + fields[0].documentFile;
          console.log(filePath);
          fs.unlinkSync(filePath);
        });

        portFile.mv('./portforioDoc/' + userid + formatted + portFileName, function(err) {
          if (portFile == null) {
            console.log(err);
          } else {
            console.log('../portforioDoc/' + userid + formatted + portFileName + "\t" + "uploaded");
          }
        });

        var sql = "UPDATE project.portfolio SET title = '" + portName + "', about = '" + portAbout + "' , categoryID = '" + portType + "', documentFile = '" + portFileName + "' WHERE (idportfolio = '" + portID + "')";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });

        var query = con.query('SELECT * FROM project.portfolio', function(err, rows) {
          if (err)
            console.log("Error Selecting : %s ", err);

          var mses = encodeURIComponent('เพิ่มไฟล์เรียบร้อยแล้ว');
          res.redirect('/my-portforio?valid=' + mses);
        });

      } else {
        var mses = encodeURIComponent('ไฟล์มีขนาดใหญ่เกินกว่า 30 MB');

        res.redirect('/my-portforio?valid=' + mses);
      }
    } else {
      var sql1 = "UPDATE project.portfolio SET title = '" + portName + "', about = '" + portAbout + "' , categoryID = '" + portType + "' WHERE (idportfolio = '" + portID + "')";
      con.query(sql1);
      var query = con.query('SELECT * FROM project.portfolio', function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);

        var mses = encodeURIComponent('อัพเดทเรียบร้อยแล้ว');
        res.redirect('/my-portforio?valid=' + mses);
      });

    }



  });




  /*ดูข้อมูลผลงานของฉัน*/
  app.get('/getportinfo', function(req, res) {
    var catdata = req.query.id;
    console.log(catdata);

    var sql = "SELECT * FROM project.portfolio where idportfolio ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });
}
