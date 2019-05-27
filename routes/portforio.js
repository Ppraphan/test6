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

  app.get('/researcher/:id', function(req, res) {
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

      var sql2 = "SELECT * FROM project.country order by countryName;SELECT * FROM project.university WHERE countryISOCode= '" + userCoutryID + "';SELECT * FROM project.faculty WHERE uniID= '" + userUniID + "';SELECT * FROM project.department WHERE facultyID= '" + userFacID + "';SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + userDpmentID + "';SELECT * FROM project.users WHERE id= '" + userid + "';SELECT * FROM project.project,project.LDProject,project.RSProject,project.users,project.grants WHERE project.project.idGrant = project.grants.idGrants AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = project.LDProject.idproject AND project.LDProject.idUser_LD = project.users.id AND project.users.id = '" + userid + "';SELECT * FROM project.project,project.LDProject,project.RSProject,project.users,project.grants WHERE project.project.idGrant = project.grants.idGrants AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = project.LDProject.idproject AND project.RSProject.idUser_RS = project.users.id AND project.users.id = '" + userid + "';SELECT * FROM project.portfolio WHERE userID = '" + userid + "';";

      con.query(sql2, function(err, results2) {

        if (err) console.log("Error Selecting : %s ", err);

        console.log(results2[6]);

        res.render('pages/researcher', {
          userinfo: userinfo,
          messages: mses,


          id: userid,

          data0: results2[0],
          data1: results2[1],
          data2: results2[2],
          data3: results2[3],
          data4: results2[4],

          selectuser: results2[5][0],

          dataRSProj:results2[7],
          dataLDProj:results2[6],

          dataPortforio:results2[8],
        });
      });

    });



  });

}
