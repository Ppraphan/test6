var mysql = require('mysql');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');
var querystring = require('querystring');

var con = require('./connect-db.js');

var role = require('./role.js');


module.exports = function(app) {

  app.get('/me', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;
    var userCoutryID = req.user.country;
    var userUniID = req.user.university;
    var userFacID = req.user.faculty;
    var userDpmentID = req.user.department;
    console.log(userinfo);

    var sql1 = "SELECT * FROM project.country order by countryName;SELECT * FROM project.university WHERE countryISOCode= '" + userCoutryID + "';SELECT * FROM project.faculty WHERE uniID= '" + userUniID + "';SELECT * FROM project.department WHERE facultyID= '" + userFacID + "';SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + userDpmentID + "';";

    con.query(sql1, function(err, results) {
      console.log(sql1);
      if (err) console.log("Error Selecting : %s ", err);
      console.log(results);

      res.render('pages/me', {
        userinfo: userinfo,
        messages: mses,

        data0: results[0],
        data1: results[1],
        data2: results[2],
        data3: results[3],
        data4: results[4],
      });
    });

  });

}
