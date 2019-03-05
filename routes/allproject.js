var mysql = require('mysql');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  app.get('/new-project', function(req, res) {
    var mses = req.query.valid;
    var userinfo =req.user;

    res.render('pages/new-project.ejs', {
      userinfo:userinfo,
      messages: mses,
    });

  });


}
