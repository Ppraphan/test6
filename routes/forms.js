var axios = require('axios');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
const con = require('./connect-db.js');

module.exports = function(app) {

  app.get('/forms', function(req, res) {
    var userinfo = req.user;
    var query = con.query('SELECT * FROM project.document', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/forms', {
        userinfo: userinfo,
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
    res.redirect('/forms');
  });

  app.get('/forms/download/:id', function(req, res) {
    var file = './forms/' + req.params.id;
    res.download(file); // Set disposition and send it.
  });

  app.post('/forms', function(req, res) {

    var userinfo = req.user;
    var startup_image = req.files.foo;
    var file_Part = req.files.foo.name;
    var file_Name = req.body.fName;

    var dr = (file_Name);
    var dr2 = (file_Part);


    startup_image.mv('./forms/' + file_Part, function(err) {
      if (startup_image == null) {
        console.log(err);
      } else {
        console.log('../forms/' + file_Part + "\t" + "uploaded");
      }
    });

    sql = "Insert into project.document(documentName,documentDir) values('" + dr + "','" + dr2 + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('SELECT * FROM project.document', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);

      res.render('pages/forms', {
        userinfo: userinfo,
        data: rows,
      });
    });

  });

  app.get('/forms/getallofname', function(req, res){
    var sql = "SELECT documentName FROM project.document";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      docname = rows;
      res.send(docname);
    });
  });
}
