var mysql = require('mysql');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');
var querystring = require('querystring');

var con = require('./connect-db.js');

module.exports = function(app) {

  app.get('/alluser', function(req, res) {
    var userinfo =req.user;
    var mses = req.query.valid;
    var sql = "SELECT email,nameIDHuman,firstname,lastname,country,university,facultyName,uniName FROM project.users u,project.country c,project.university uni , project.faculty f WHERE u.country = c.countryISOCode AND u.university = uni.uniID AND u.faculty = f.facultyID;"
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/alluser', {
        userinfo:userinfo,
        data: rows,
        messages: mses,
      });
    });
  });

  app.get('/forgotPS', function(req, res) {
    res.render('pages/forgot-password');
  });

}
