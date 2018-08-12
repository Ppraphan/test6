var express = require('express');
var app = express();
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var Vue = require('vue');
var http = require('http');
var fs = require('fs');
var bodyParser = require("body-parser");
const url = require('url');
const querystring = require('querystring');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connedted!");
});

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set('view engine', 'ejs', 'vue');

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});


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

  var sql = "UPDATE tresearchtype SET Name_researchType ='" +req.body.file_NameUpdate+ "' WHERE Name_researchType ='" +req.body.file_Nameold+ "' ";
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

app.get('/forms', function(req, res) {
  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/forms', {
      data: rows
    });
  });
});

app.get('/forms/delete/:id', function(req, res) {

  var sql = "SELECT Picpart FROM tpicpart WHERE PicID=" + req.params.id;

  con.query(sql, function(err, fields) {
    if (err) throw err;
    var filePath = __dirname + '/forms/' + fields[0].Picpart;
    console.log(filePath);
    fs.unlinkSync(filePath);
  });

  var query = "DELETE FROM tpicpart WHERE PicID=" + req.params.id;
  console.log(query);
  con.query(query, function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
  });

  res.redirect('/forms');
});
/*
app.get('/forms/delete/:id', function(req, res) {
  var query = "DELETE FROM tpicpart WHERE PicID=" + req.params.id;

  console.log(query);
  con.query(query, function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
  });

  var filePath = __dirname + '/forms/' + req.params.id + '.jpg';
  fs.unlinkSync(filePath);

  res.redirect('/forms');
  /*
  ----------------------------------------------------------------
  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/forms', {
      data: rows
    });
  });

  res.render('pages/forms', {
    data: rows
  });

});
*/
app.get('/forms/download/:id', function(req, res) {
  var file = __dirname + '/forms/' + req.params.id;
  res.download(file); // Set disposition and send it.
});

app.get('/new-forms', function(req, res) {
  res.render('pages/new-forms');
});


app.post('/forms', function(req, res) {

  var startup_image = req.files.foo;
  var file_Part = req.files.foo.name;
  var file_Name = req.body.fName;

  var dr = (file_Name);
  var dr2 = (file_Part);

  startup_image.mv(__dirname + '/forms/' + file_Part, function(err) {
    if (startup_image == null) {
      console.log(err);
    } else {
      console.log(file_Part + "\t" + "uploaded");
    }
  });

  sql = "Insert into tpicpart(Picname,Picpart) values('" + dr + "','" + dr2 + "')";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Insert Complete...");
  });

  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
  });
  res.redirect('/forms');

});
/*
app.delete('/forms', function(req, res) {

  var dl = 3;

  sql = "DELETE FROM tpicpart(Picpart) values('" + dl + "')";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Insert Complete...");
  });

  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/forms', {
      data: rows
    });
  });

});
*/


app.listen(8080);
console.log('8080 is Running...');
