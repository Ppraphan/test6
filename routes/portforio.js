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

    var sql = "SELECT * FROM project.users where university = '295';SELECT * FROM project.faculty;SELECT distinct facultyName FROM project.users,project.faculty where project.users.university = project.faculty.uniID and project.users.faculty=project.faculty.facultyID and project.faculty.uniID ='295'and project.faculty.facultyName != '-';SELECT distinct academicPositions FROM project.users;"
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);

        console.log(rows[0]);
      res.render('pages/portforio', {
        userinfo: userinfo,
        messages: mses,

        data: rows[0],
        data1: rows[1],
        data2: rows[2],
        data3: rows[3],
      });
    })


  });

}
