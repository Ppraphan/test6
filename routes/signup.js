var authController = require('../controllers/authcontroller.js');
var exports = module.exports = {}
var path = require('path');
var axios = require('axios');
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});

module.exports = function(app, passport) {
  app.get("/signup/getUniversityName/", function(req, res) {
    var catdata = req.query.countryData;
    console.log(catdata);

    var sql = "SELECT * FROM project.university where countryISOCode ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/signup/getFacultyinUni/", function(req, res) {
    var catdata = req.query.universityData;
    console.log(catdata);

    var sql = "SELECT * FROM project.faculty where uniID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/signup/getDpmentinFac/", function(req, res) {
    var catdata = req.query.facultyValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.department where facultyID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/signup/getSubinDpment/", function(req, res) {
    var catdata = req.query.departmentValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.sub_dpment where Sub_Dpment_Parent ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });



}
