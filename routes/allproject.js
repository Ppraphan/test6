var bodyParser = require('body-parser');
var querystring = require('querystring');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  app.get('/new-project', function(req, res) {
    var mses = req.query.valid;
    var userinfo = req.user;

      con.query('SELECT grants_Years FROM project.grants GROUP BY grants_Years; SELECT countryISOCode,countryName FROM project.country order by countryName;SELECT * FROM project.tresearchtype;SELECT * FROM project.researchbranch;SELECT * FROM project.researchform;SELECT * FROM project.researchstrategic;', function(err, results ) {
        if (err) console.log("Error Selecting : %s ", err);

        res.render('pages/new-project', {
          userinfo: userinfo,
          data0: results[0],
          data1: results[1],
          data2: results[2],
          data3: results[3],
          data4: results[4],
          data5: results[5],

          messages: mses,
        });
      });
  });

  app.get('/getusername', function(req, res) {
    var catdata = req.query.emailsearchUserLD;
    console.log(catdata);
    var sql = "SELECT id,firstname,lastname FROM project.users WHERE email ='" + catdata + "' ";
      con.query(sql, function(err, rows ) {
        if (err) console.log("Error Selecting : %s ", err);
        res.send(rows);
        console.log(rows);
      });
  });


}
