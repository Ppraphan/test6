var bodyParser = require('body-parser');
var querystring = require('querystring');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  app.get('/report', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    res.render('pages/report', {
      userinfo: userinfo,
      messages: mses,
    });

  });



}
