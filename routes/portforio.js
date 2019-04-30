var axios = require('axios');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var bodyParser = require("body-parser");
var url = require('url');
var querystring = require('querystring');
const con = require('./connect-db.js');


module.exports = function(app) {

  app.get('/portforio', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var sql = "SELECT * FROM project.users"
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/portforio', {
        userinfo: userinfo,
        messages: mses,

        data: rows,
      });
    })


  });

}
