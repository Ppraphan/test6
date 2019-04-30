var exports = module.exports = {}
var path = require('path');
var axios = require('axios');
var mysql = require('mysql');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');


exports.useridcheck = function(req, res) {
  var userinfo =req.user;
  var mses = req.query.valid;
  res.render('pages/useridcheck', {
    userinfo:userinfo,
    messages: mses,
  });
}

exports.signin = function(req, res) {
  var mses = req.query.valid;
  res.render('pages/signin', {
    messages: mses,
  });
}

exports.dashboard = function(req, res) {
  var userinfo =req.user;
  res.render('pages/index', {
    userinfo:userinfo,
  });
}

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });


}
