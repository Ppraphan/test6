// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var Vue = require('vue');


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

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});


app.get('/testtable', function(req, res) {
  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/testtable', {
      data: rows
    });
  });
});

app.get('/Research-Type', function(req, res) {
  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/Research-Type', {
      data: rows
    });
  });
});

app.post('/Research-Type', function(req, res) {

  var query = con.query('SELECT * FROM tpicpart', function(err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('pages/Research-Type', {
      data: rows
    });
  });
});

app.get('/about', function(req, res) {
  res.render('pages/about');
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



app.get('/new-forms', function(req, res) {
  res.render('pages/new-forms');
});


app.post('/forms', function(req, res) {

  var startup_image = req.files.foo;
  var fileName = req.files.foo.name;

  var dr = ('/forms/' + fileName + '.pdf');

  startup_image.mv(__dirname + '/forms/' + fileName , function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(fileName + "\t" + "uploaded");
    }
  });


  sql = "Insert into tpicpart(Picpart) values('" + dr + "')";
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



app.listen(8080);
console.log('8080 is Running...');
