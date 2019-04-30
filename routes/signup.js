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
    var startup_image = req.files.profileimage;


    var userid;

    if (startup_image == null) {
      let sql1 = "SELECT id FROM project.users ORDER BY id DESC LIMIT 1";
      con.query(sql1, function(err, result) {
        if (err) throw err;
        userid = result[0].id;
        console.log("sql1 userid = " + userid);

        let sql = "UPDATE project.users SET profilePic = 'default-profile.jpg' WHERE id = '" + userid+ "' "
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });
      });
    } else {
      var imageName = req.files.profileimage.name;
      var imagetype = req.files.profileimage.mimetype;
      var imageNameWithoutspace = imageName.replace(/\s/g, '');
      var dr2 = (imageNameWithoutspace);
      console.log(imagetype);
      let sql1 = "SELECT id FROM project.users ORDER BY id DESC LIMIT 1";
      con.query(sql1, function(err, result) {
        if (err) throw err;
        userid = result[0].id;
        console.log("sql1 userid = " + userid);

        startup_image.mv('./public/userprofile/' + userid+imageNameWithoutspace, function(err) {
          if (startup_image == null) {
            console.log(err);
          } else {
            console.log('../userprofile/'  +userid+ imageNameWithoutspace + "\t" + "uploaded");
          }
        });



        let sql = "UPDATE project.users SET profilePic = '" + userid+imageNameWithoutspace + "' WHERE id = '" + userid + "' "
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("Insert Complete...");
        });
      });

    }

    res.redirect('/alluser');
  });

  app.get("/signup/getUniversityName/", function(req, res) {
    var catdata = req.query.countryData;
    console.log("catdata : " + catdata);
    var sql = "SELECT * FROM project.university where countryISOCode = '" + catdata + "' ;";

    con.query(sql, function(err, results) {
      if (err) throw err;

      res.send(results);
    });
  });

  app.get("/signup/getFacultyinUni/", function(req, res) {
    var catdata = req.query.universityData;
    console.log(catdata);

    var sql = "SELECT * FROM project.faculty where uniID ='" + catdata + "';SELECT * FROM project.university,project.faculty,project.department,project.sub_dpment WHERE project.university.uniID = project.faculty.uniID AND project.faculty.facultyID = project.department.facultyID AND project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.university.uniID=  '" + catdata + "'  AND project.faculty.facultyName= '-';  ";

    con.query(sql, function(err, results) {
      console.log(results);
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });

  });

  app.get("/signup/getDpmentinFac/", function(req, res) {
    var catdata = req.query.facultyValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.department where facultyID ='" + catdata + "';SELECT * FROM project.faculty,project.department,project.sub_dpment WHERE  project.faculty.facultyID = project.department.facultyID AND project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.faculty.facultyID= '" + catdata + "' AND project.department.departmentName='-';  ";
    console.log(sql);
    con.query(sql, function(err, results) {
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });
  });

  app.get("/signup/getSubinDpment/", function(req, res) {
    var catdata = req.query.departmentValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.sub_dpment where Sub_Dpment_Parent ='" + catdata + "';SELECT * FROM project.department,project.sub_dpment WHERE   project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.department.departmentID='4' AND project.sub_dpment.Sub_Dpment_name='-';   ";
    console.log(sql);
    con.query(sql, function(err, results) {
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });
  });

  app.get('/signup/delete/:id', function(req, res) {

    var query = "DELETE FROM `project`.`users` WHERE (`id` = '" + req.params.id + "');";
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    res.redirect('/alluser');
  });

}
