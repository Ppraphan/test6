var mysql = require('mysql');
var express = require('express');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var flash = require('req-flash');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var flash = require('connect-flash');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});

module.exports = function(app) {
  // app.use(cookieParser());
  // app.use(session({
  //   secret: '123'
  // }));
  // app.use(flash());
  app.use(cookieParser());

  app.use(flash()); // use connect-flash for flash messages stored in session

  app.get('/Department', function(req, res) {
    var sql = "select countryName, uniName, facultyName, departmentName, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from faculty fac, department en, sub_dpment sd, university u, country c where c.countryISOCode = u.countryISOCode AND  fac.uniID = u.uniID AND en.facultyID = fac.facultyID AND en.departmentID = sd.Sub_Dpment_Parent;"
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      var te = "พอเถอะ";
      console.log(te);
      // req.flash("msg"," ");
      // res.locals.messages = "";
      res.render('pages/Department', {
        data: rows,
        messages: "555",
      });
    });
  });
  app.post('/Department', function(req, res) {
    var parent_Dpment = req.body.parent_Dpment;
    var dpmant_name = req.body.dpmant_name;

    sql = "Insert into sub_dpment(Sub_Dpment_name,Sub_Dpment_Parent) values('" + dpmant_name + "','" + parent_Dpment + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var query = con.query('select Dpment_Name, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from en_dpment en, sub_dpment sd where en.Dpment_ID = sd.Sub_Dpment_Parent', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Department', {
        data: rows
      });
    });
  });

  app.post('/Department/update', function(req, res) {
    var sql = "UPDATE sub_dpment SET Sub_Dpment_name ='" + req.body.file_NameUpdate + "' WHERE Sub_Dpment_name ='" + req.body.file_Nameold + "'AND Sub_Dpment_Parent='" + req.body.Sub_Dpment_Parent + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });

    var query = con.query('select Dpment_Name, Sub_Dpment_name, Sub_Dpment_ID, Sub_Dpment_Parent from en_dpment en, sub_dpment sd where en.Dpment_ID = sd.Sub_Dpment_Parent', function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/Department', {
        data: rows,
        messages: "555",
      });
    });
    res.redirect('/Department');
  });

  app.get('/Department/delete/:id', function(req, res) {
    var query = "DELETE FROM sub_dpment WHERE Sub_Dpment_ID =" + req.params.id;
    console.log(query);
    con.query(query, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
    });
    res.redirect('/Department', {
      messages: "ลบหมดละสัส",
    });
  });

  app.get("/Department/getAllCountry/", function(req, res) {
    var sql = "SELECT * FROM project.country ORDER BY countryName ASC";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });


  app.get("/Department/getUniinCountry/", function(req, res) {
    var catdata = req.query.countryData;
    console.log(catdata);

    //  Query uses the value from the url.
    var sql = "SELECT * FROM project.university where countryISOCode ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/Department/getFacultyinUni/", function(req, res) {
    var catdata = req.query.uniData;
    console.log(catdata);

    //  Query uses the value from the url.
    var sql = "SELECT * FROM project.faculty where facultyID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });






}
