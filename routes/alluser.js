var mysql = require('mysql');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');
var querystring = require('querystring');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});

module.exports = function(app) {

  app.get('/alluser/', function(req, res) {
    var mses = req.query.valid;
    var sameNameUni = 0;
    var sql = "SELECT nameIDHuman,firstname,lastname,country,university,facultyName,uniName FROM users u,country c,university uni , faculty f WHERE u.country = c.countryISOCode AND u.university = uni.uniID AND u.faculty = f.facultyID "
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/alluser', {
        data: rows,
        messages: mses,
        sameNameUni: sameNameUni,
      });
    });
  });

}
