var axios = require('axios');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const authController = require('../controllers/authcontroller.js');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app, passport) {

  app.get("/addprofile", function(req, res) {
    var userinfo = req.user;
    res.render('pages/addprofile', {
      userinfo: userinfo,
    });
  });

  app.post("/addprofile", function(req, res) {
    var userid;

    if (startup_image == null) {
      let sql1 = "SELECT id FROM project.users ORDER BY id DESC LIMIT 1";
      con.query(sql1, function(err, result) {
        if (err) throw err;
        userid = result[0].id;
        console.log("sql1 userid = " + userid);

        let sql = "UPDATE project.users SET profilePic = 'default-profile.jpg' WHERE id = '" + userid + "' "
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });
      });
    } else {

      var startup_image = req.files.profileimage;
      var file_Part = req.files.profileimage.name;
      var dr2 = (file_Part);

      startup_image.mv('./userprofile/' + file_Part, function(err) {
        if (startup_image == null) {
          console.log(err);
        } else {
          console.log('../userprofile/' + file_Part + "\t" + "uploaded");
        }
      });

      let sql1 = "SELECT id FROM project.users ORDER BY id DESC LIMIT 1";
      con.query(sql1, function(err, result) {
        if (err) throw err;
        userid = result[0].id;
        console.log("sql1 userid = " + userid);

        let sql = "UPDATE project.users SET profilePic = '" + dr2 + "' WHERE id = '" + userid + "' "
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });
      });

    }

    console.log("out side userid = " + userid);
    res.redirect('/alluser');
  });

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
