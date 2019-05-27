var mysql = require('mysql');
var bCrypt = require('bcrypt-nodejs');
var fileUpload = require('express-fileupload');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var con = require('./connect-db.js');

var role = require('./role.js');


module.exports = function(app) {

  /*ดูข้อมูลส่วนตัว-ของฉัน*/
  app.get('/me', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var userCoutryID = req.user.country;
    var userUniID = req.user.university;
    var userFacID = req.user.faculty;
    var userDpmentID = req.user.department;
    console.log(userinfo);

    var sql1 = "SELECT * FROM project.country order by countryName;SELECT * FROM project.university WHERE countryISOCode= '" + userCoutryID + "';SELECT * FROM project.faculty WHERE uniID= '" + userUniID + "';SELECT * FROM project.department WHERE facultyID= '" + userFacID + "';SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + userDpmentID + "';";

    con.query(sql1, function(err, results) {
      console.log(sql1);
      if (err) console.log("Error Selecting : %s ", err);
      console.log(results);

      res.render('pages/me', {
        userinfo: userinfo,
        messages: mses,

        data0: results[0],
        data1: results[1],
        data2: results[2],
        data3: results[3],
        data4: results[4],
      });
    });

  });

  // ขอข้อมูลหน่วยงาน
  app.get("/me/getUniversityName/", function(req, res) {
    var catdata = req.query.countryData;
    console.log("catdata : " + catdata);
    var sql = "SELECT * FROM project.university where countryISOCode = '" + catdata + "' ;";

    con.query(sql, function(err, results) {
      if (err) throw err;

      res.send(results);
    });
  });
  app.get("/me/getFacultyinUni/", function(req, res) {
    var catdata = req.query.universityData;
    console.log(catdata);

    var sql = "SELECT * FROM project.faculty where uniID ='" + catdata + "';SELECT * FROM project.university,project.faculty,project.department,project.sub_dpment WHERE project.university.uniID = project.faculty.uniID AND project.faculty.facultyID = project.department.facultyID AND project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.university.uniID=  '" + catdata + "'  AND project.faculty.facultyName= '-';  ";

    con.query(sql, function(err, results) {
      console.log(results);
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });

  });
  app.get("/me/getDpmentinFac/", function(req, res) {
    var catdata = req.query.facultyValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.department where facultyID ='" + catdata + "';SELECT * FROM project.faculty,project.department,project.sub_dpment WHERE  project.faculty.facultyID = project.department.facultyID AND project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.faculty.facultyID= '" + catdata + "' AND project.department.departmentName='-';  ";
    console.log(sql);
    con.query(sql, function(err, results) {
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });
  });
  app.get("/me/getSubinDpment/", function(req, res) {
    var catdata = req.query.departmentValue;
    console.log(catdata);

    var sql = "SELECT * FROM project.sub_dpment where Sub_Dpment_Parent ='" + catdata + "';SELECT * FROM project.department,project.sub_dpment WHERE   project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent AND project.department.departmentID='" + catdata + "' AND project.sub_dpment.Sub_Dpment_name='-';   ";
    console.log(sql);
    con.query(sql, function(err, results) {
      if (err) throw err;
      var data = {
        data0: results[0],
        data1: results[1]
      }

      res.send(data);
    });
  });

  /*แก้ไขข้อมูลส่วนตัวของฉัน*/
  app.post('/editmyinfo', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    // ข้อมูลจากในฟอร์ม
    var startup_image = req.files.profileimage;
    var myEmail = req.body.editemail;
    var myRole = req.body.userPermission;
    var myHumanID = req.body.humanID;
    var myBirthDay = req.body.birthday;
    var myPrefix = req.body.prefix;
    var myAcademicPositions = req.body.academicPositions;
    var myFName = req.body.myFName;
    var myLName = req.body.myLName;
    var myEN_FName = req.body.myEN_FName;
    var myEN_LName = req.body.myEN_LName;
    var myNationality = req.body.nationality;
    var myTel = req.body.myTel;


    if (startup_image == null) {
      var sql = "UPDATE project.users SET email ='" + myEmail +
        "',userPermission ='" + myRole +
        "',nameIDHuman='" + myHumanID +
        "',birthday='" + myBirthDay +
        "',prefix='" + myPrefix +
        "',academicPositions='" + myAcademicPositions +
        "',firstname='" + myFName +
        "',lastname='" + myLName +
        "',engFirstName='" + myEN_FName +
        "',engLastName='" + myEN_LName +
        "',nationality='" + myNationality +
        "',telNumber='" + myTel +
        "' WHERE id ='" + req.user.id + "' ";

      var query = con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        mses = "อัพเดทข้อมูลเรียบร้อย"
        res.redirect('/me?valid=' + mses);
      });

    } else {
      var imageName = req.files.profileimage.name;
      var imagetype = req.files.profileimage.mimetype;
      var imageNameWithoutspace = imageName.replace(/\s/g, '');
      var dr2 = (imageNameWithoutspace);
      console.log(imagetype);

      startup_image.mv('./public/userprofile/' + req.user.id + imageNameWithoutspace, function(err) {
        if (startup_image == null) {
          console.log(err);
        } else {
          console.log('./public/userprofile/' + req.user.id + imageNameWithoutspace + "\t" + "uploaded");
        }
      });

      var sql = "UPDATE project.users SET profilePic ='" + req.user.id + imageNameWithoutspace +
        "',email ='" + myEmail +
        "',userPermission ='" + myRole +
        "',nameIDHuman='" + myHumanID +
        "',birthday='" + myBirthDay +
        "',prefix='" + myPrefix +
        "',academicPositions='" + myAcademicPositions +
        "',firstname='" + myFName +
        "',lastname='" + myLName +
        "',engFirstName='" + myEN_FName +
        "',engLastName='" + myEN_LName +
        "',nationality='" + myNationality +
        "',telNumber='" + myTel +
        "' WHERE id ='" + req.user.id + "' ";

      var query = con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        mses = "อัพเดทข้อมูลเรียบร้อย"
        res.redirect('/me?valid=' + mses);
      });
    }
  });
  app.post('/editmywork', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var myfristDayJoin = req.body.myfristDayJoin;
    var mydayLeft = req.body.mydayLeft;
    var myCountryID = req.body.myCountryID;
    var myUniversityID = req.body.myUniversityID;
    var myFacultyID = req.body.myFacultyID;
    var myDepartmentID = req.body.myDepartmentID;
    var mySubDepartmentID = req.body.mySubDepartmentID;

    var sql = "UPDATE project.users SET fristDayJoin ='" + myfristDayJoin +
      "',dayLeft ='" + mydayLeft +
      "',country ='" + myCountryID +
      "',university='" + myUniversityID +
      "',faculty='" + myFacultyID +
      "',department='" + myDepartmentID +
      "',subdepartment='" + mySubDepartmentID +
      "' WHERE id ='" + req.user.id + "' ";

    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      mses = "อัพเดทข้อมูลเรียบร้อย"
      res.redirect('/me?valid=' + mses);
    });

  });



  /*ดูข้อมูลส่วนตัว-ของผู้ใช้*/
  app.get('/user/:id', function(req, res) {
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

      var sql2 = "SELECT * FROM project.country order by countryName;SELECT * FROM project.university WHERE countryISOCode= '" + userCoutryID + "';SELECT * FROM project.faculty WHERE uniID= '" + userUniID + "';SELECT * FROM project.department WHERE facultyID= '" + userFacID + "';SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + userDpmentID + "';SELECT * FROM project.users WHERE id= '" + userid + "';";

      con.query(sql2, function(err, results2) {
        console.log(sql1);
        if (err) console.log("Error Selecting : %s ", err);
        console.log(results2[5]);

        res.render('pages/user', {
          userinfo: userinfo,
          messages: mses,


          id: userid,
          data0: results2[0],
          data1: results2[1],
          data2: results2[2],
          data3: results2[3],
          data4: results2[4],
          selectuser: results2[5][0],
        });
      });

    });

  });

  /*แก้ไขข้อมูลส่วนตัวของผู้ใช้*/
  app.post('/edituserinfo', function(req, res) {
    var userinfo = req.body.idThisUser;
    var mses = req.query.valid;

    // ข้อมูลจากในฟอร์ม
    var startup_image = req.files.profileimage;
    var myEmail = req.body.editemail;
    var myRole = req.body.userPermission;
    var myHumanID = req.body.humanID;
    var myBirthDay = req.body.birthday;
    var myPrefix = req.body.prefix;
    var myAcademicPositions = req.body.academicPositions;
    var myFName = req.body.myFName;
    var myLName = req.body.myLName;
    var myEN_FName = req.body.myEN_FName;
    var myEN_LName = req.body.myEN_LName;
    var myNationality = req.body.nationality;
    var myTel = req.body.myTel;


    if (startup_image == null) {
      var sql = "UPDATE project.users SET email ='" + myEmail +
        "',userPermission ='" + myRole +
        "',nameIDHuman='" + myHumanID +
        "',birthday='" + myBirthDay +
        "',prefix='" + myPrefix +
        "',academicPositions='" + myAcademicPositions +
        "',firstname='" + myFName +
        "',lastname='" + myLName +
        "',engFirstName='" + myEN_FName +
        "',engLastName='" + myEN_LName +
        "',nationality='" + myNationality +
        "',telNumber='" + myTel +
        "' WHERE id ='" + userinfo + "' ";

      var query = con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        mses = "อัพเดทข้อมูลเรียบร้อย"
        res.redirect('/user/'+userinfo+'/?valid=' + mses);
      });

    } else {
      var imageName = req.files.profileimage.name;
      var imagetype = req.files.profileimage.mimetype;
      var imageNameWithoutspace = imageName.replace(/\s/g, '');
      var dr2 = (imageNameWithoutspace);
      console.log(imagetype);

      startup_image.mv('./public/userprofile/' + userinfo + imageNameWithoutspace);

      var sql = "UPDATE project.users SET profilePic ='" + userinfo + imageNameWithoutspace +
        "',email ='" + myEmail +
        "',userPermission ='" + myRole +
        "',nameIDHuman='" + myHumanID +
        "',birthday='" + myBirthDay +
        "',prefix='" + myPrefix +
        "',academicPositions='" + myAcademicPositions +
        "',firstname='" + myFName +
        "',lastname='" + myLName +
        "',engFirstName='" + myEN_FName +
        "',engLastName='" + myEN_LName +
        "',nationality='" + myNationality +
        "',telNumber='" + myTel +
        "' WHERE id ='" + userinfo + "' ";

      var query = con.query(sql, function(err, rows) {
        if (err)
          console.log("Error Selecting : %s ", err);
        mses = "อัพเดทข้อมูลเรียบร้อย"
        res.redirect('/user/'+userinfo+'/?valid=' + mses);
      });
    }
  });

  app.post('/edituserwork', function(req, res) {
    var userinfo = req.body.idThisUser;
    var mses = req.query.valid;

    var myfristDayJoin = req.body.myfristDayJoin;
    var mydayLeft = req.body.mydayLeft;
    var myCountryID = req.body.myCountryID;
    var myUniversityID = req.body.myUniversityID;
    var myFacultyID = req.body.myFacultyID;
    var myDepartmentID = req.body.myDepartmentID;
    var mySubDepartmentID = req.body.mySubDepartmentID;

    var sql = "UPDATE project.users SET fristDayJoin ='" + myfristDayJoin +
      "',dayLeft ='" + mydayLeft +
      "',country ='" + myCountryID +
      "',university='" + myUniversityID +
      "',faculty='" + myFacultyID +
      "',department='" + myDepartmentID +
      "',subdepartment='" + mySubDepartmentID +
      "' WHERE id ='" + userinfo + "' ";

    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      mses = "อัพเดทข้อมูลเรียบร้อย"
      res.redirect('/user/'+userinfo+'/?valid=' + mses);
    });

  });



  /*จัดการรหัสผ่าน*/
  app.post('/reset-password', function(req, res) {
    var userinfo = req.user;
    var userid = req.user.id;
    var mses = req.query.valid;

    var password = req.body.newPassword1;

    var userPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(8));

    var sql1 = "UPDATE `project`.`users` SET `password` = '" + userPassword + "' WHERE (`id` = '" + userid + "');";

    con.query(sql1, function(err, results) {
      console.log(sql1);
      if (err) console.log("Error Selecting : %s ", err);


      mses = "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว"
      res.redirect('/?valid=' + mses);
    });

  });

}
