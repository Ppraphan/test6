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

exports.signup = function(req, res) {
      res.render('pages/signup');    
}

exports.useridcheck = function(req, res) {
      res.render('pages/useridcheck');
}

exports.signin = function(req, res) {
  res.render('pages/signin');
}

exports.dashboard = function(req, res) {
  res.render('pages/index',);
}

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });


}
