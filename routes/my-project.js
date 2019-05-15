var bodyParser = require('body-parser');
var querystring = require('querystring');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  /*เปิดหน้าโครงการวิจัยใหม่*/
  app.get('/my-project', function(req, res) {
    var mses = req.query.valid;
    var userinfo = req.user;
    var userID = req.user.id; 

    var sql1 = "SELECT projectNameTH,grants_Years FROM project.project,project.LDProject,project.RSProject,project.users,project.grants WHERE project.project.idGrant = project.grants.idGrants AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = project.LDProject.idproject AND project.LDProject.idUser_LD = project.users.id AND project.users.id = '" + userID + "';SELECT projectNameTH,grants_Years FROM project.project,project.LDProject,project.RSProject,project.users,project.grants WHERE project.project.idGrant = project.grants.idGrants AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = project.LDProject.idproject AND project.RSProject.idUser_RS = project.users.id AND project.users.id = '" + userID + "';"

    con.query(sql1, function(err, results) {
      console.log(sql1);
      if (err) console.log("Error Selecting : %s ", err);
      console.log(results);

      res.render('pages/my-project', {
        userinfo: userinfo,
        messages: mses,

        data0: results[0],
        data1: results[1],
      });
    });

  });


}
