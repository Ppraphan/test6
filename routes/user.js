var mysql = require('mysql');
var express = require('express');
var bCrypt = require('bcrypt-nodejs');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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

  app.get('/user/:id', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var userid = req.params.id;

    var sql1 = "SELECT * FROM project.users WHERE id= '" + userid + "';";

    con.query(sql1, function(err, results) {
      if (err) console.log("Error Selecting : %s ", err);


      var userCoutryID = results[0].country;
      var userUniID = results[0].university;
      var userFacID = results[0].faculty;
      var userDpmentID = results[0].department;
      var userSubDpmentID = results[0].subdepartment;

      var sql2 = "SELECT * FROM project.country order by countryName;SELECT * FROM project.university WHERE countryISOCode= '" + userCoutryID + "';SELECT * FROM project.faculty WHERE uniID= '" + userUniID + "';SELECT * FROM project.department WHERE facultyID= '" + userFacID + "';SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + userDpmentID + "';SELECT * FROM project.users WHERE id= '" + userid + "';";

      con.query(sql2, function(err, results2) {
        console.log(sql1);
        if (err) console.log("Error Selecting : %s ", err);
        console.log(results2[5]);

        res.render('pages/user', {
          userinfo: userinfo,
          messages: mses,


          id:userid,
          data0: results2[0],
          data1: results2[1],
          data2: results2[2],
          data3: results2[3],
          data4: results2[4],
          selectuser:  results2[5][0],
        });
      });

    });

  });

  app.post('/reset-password', function(req, res) {
    var userinfo = req.user;
    var userid = req.user.id;
    var mses = req.query.valid;

    var password = req.body.newPassword1;

    var userPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(8));

    var sql1 = "UPDATE `project`.`users` SET `password` = '" + userPassword + "' WHERE (`id` = '" + userid + "');";

    con.query(sql1, function(err, results) {
      console.log(sql1);
      if (err) console.log("Error Selecting : %s ", err);


      mses = "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว"
      res.redirect('/?valid=' + mses);
    });

  });

}
