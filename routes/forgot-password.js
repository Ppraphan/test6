var mysql = require('mysql'); /*เดต้าเบส*/
var express = require('express');
var bCrypt = require('bcrypt-nodejs'); /*อัพไฟล์*/
var nodemailer = require('nodemailer'); /*ส่งอีเมล*/
var generator = require('generate-password'); /*เจนพาสเวิด*/

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var querystring = require('querystring');

var con = require('./connect-db.js');

var role = require('./role.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rds.en.rmutt@gmail.com',
    pass: '0904309482'
  }
});



module.exports = function(app) {

  app.get('/forgot-password', function(req, res) {
    var mses = req.query.valid;
    res.render('pages/forgot-password', {
      messages: mses,
    });
  });

  app.post('/forgot-password', function(req, res) {
    var email = req.body.email;

    var listID = [];

    var sql = "SELECT email FROM project.users";
    con.query(sql, function(err, rows, result) {
      console.log("------------------------------------------------");
      if (err) throw err;

      for (var i = 0; i < rows.length; i++) {
        listID.push(rows[i].email);
      }
      let result2 = listID;
      console.log(result2);

      for (let i = 0; i < result2.length; i++) {
        var resultSearch = result2.includes(email);
      }

      if (resultSearch == true) {
        var password = generator.generate({
          length: 10,
          numbers: true
        });
        console.log(password);
        var userPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(8));

        var mailOptions = {
          from: 'rds.en.rmutt@gmail.com',
          to: email,
          subject: 'Sending Email using Node.js',
          text: 'รหัสผ่านใหม่ของคุณคือ ' + password,
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {

            var sql1 = "UPDATE `project`.`users` SET `password` = '" + userPassword + "' WHERE (`email` = '" + email + "');";

            con.query(sql1, function(err, results) {
              console.log(sql1);
              if (err) console.log("Error Selecting : %s ", err);

              console.log('Email sent: ' + info.response);
              mses = "ระบบได้ส่งรหัสผ่านใหม่ไปที่อีเมลแล้ว";
              res.redirect('/signin?valid=' + mses);
            });

          }
        });

      } else {
        mses = "ไม่มีอีเมลนี้ในระบบ";
        res.redirect('/forgot-password?valid=' + mses);
      }

    });



  });


}
