var axios = require('axios');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
const con = require('./connect-db.js');
var Busboy = require('busboy');
var dateTime = require('node-datetime');

module.exports = function(app) {

  app.get('/forms', function(req, res) {
    var mses = req.query.valid;
    var userinfo = req.user;

    var query = con.query('SELECT * FROM project.document', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);

      res.render('pages/forms', {
        userinfo: userinfo,
        messages: mses,

        data: rows,
      });
    });
  });

  app.get('/forms/delete/:id', function(req, res) {
    var userinfo = req.user;
    var sql = "SELECT documentDir FROM project.document WHERE documentID=" + req.params.id;

    con.query(sql, function(err, fields) {
      if (err) throw err;
      var filePath = './forms/' + fields[0].documentDir;
      console.log(filePath);
      fs.unlinkSync(filePath);
    });

    var query = "DELETE FROM project.document WHERE documentID=" + req.params.id;
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    
    var mses = encodeURIComponent('ลบเรียบร้อยแล้ว');
    res.redirect('/forms?valid=' + mses);
  });

  app.get('/forms/download/:id', function(req, res) {
    var file = './forms/' + req.params.id;
    res.download(file); // Set disposition and send it.
  });

  app.post('/forms', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var pdfmaxsize = "30000000";

    var startup_image = req.files.foo;
    var file_Name = req.body.fName;

    var dr = (file_Name);
    var dr2 = (file_Part);

    console.log("pdfmaxsize : " + pdfmaxsize);
    console.log("filesize1 : " + filesize);

    if (startup_image != null) {
      var file_Part = req.files.foo.name;
      var filesize = req.files.foo.data.length;

      var dt = dateTime.create();
      var formatted = dt.format('YmdHMS');

      var imageNameWithoutspace = file_Part.replace(/\s/g, '');
      console.log("file_name : " + file_Part);
      console.log("imageNameWithoutspace : " + imageNameWithoutspace);
      if (filesize < pdfmaxsize) {
        console.log("filesize2 : " + filesize);
        startup_image.mv('./forms/' + formatted+ imageNameWithoutspace);

        sql = "Insert into project.document(documentName,documentDir) values('" + dr + "','" + formatted+ imageNameWithoutspace + "')";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });

        var mses = encodeURIComponent('เพิ่มเรียบร้อยแล้ว');
        res.redirect('/forms?valid=' + mses);
      } else {
        var mses = encodeURIComponent('ไฟล์มีขนาดใหญ่เกินกว่า 30 MB');

        res.redirect('/forms?valid=' + mses);
      }
    }else{
      var mses = encodeURIComponent('ไม่มีไฟล์');

      res.redirect('/forms?valid=' + mses);
    }

  });

  app.get('/forms/getallofname', function(req, res) {
    var sql = "SELECT documentName FROM project.document";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      docname = rows;
      res.send(docname);
    });
  });

  app.post('/forms/update', function(req, res) {
    var oldID = req.body.name_id_oldNameForm;
    var newName = req.body.nameEdit;


    var query = "UPDATE `project`.`document` SET `documentName` = '" + newName + "' WHERE (`documentID` = '" + oldID + "');";
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    res.redirect('/forms');

  });
}
