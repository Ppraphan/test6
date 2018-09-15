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
  app.get('/signup', authController.signup);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    session: false,

  }));

  app.get("/signup/getDpment/:catdata", function(req, res) {
    var catdata = req.params.catdata;
    console.log(catdata);

    //  Query uses the value from the url.
    var sql = "SELECT Sub_Dpment_name FROM project.sub_dpment where Sub_Dpment_Parent ='" + req.params.catdata + "'";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

}
