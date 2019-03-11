var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  app.get('/department', function(req, res) {
    var userinfo =req.user;
    var mses = req.query.valid;
    var sql = "select * from project.faculty , project.department , project.sub_dpment , project.university , project.country where project.country.countryISOCode = project.university.countryISOCode AND project.faculty.uniID = project.university.uniID AND project.department.facultyID = project.faculty.facultyID AND project.department.departmentID = project.sub_dpment.Sub_Dpment_Parent;"
    var query = con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      res.render('pages/department', {
        userinfo:userinfo,
        data: rows,
        messages: mses,
      });
    });
  });

  /*เพิ่มมหาวิทยาลัยใหม่ อย่างเดียว*/
  app.post('/department/newuni', function(req, res) {
    var txtUniName = req.body.txtUniName;
    var txtUniNameLOWCASE = txtUniName.toLowerCase();
    var countryISOCodeName = req.body.countryISOCodeName;

    var sql1 = "INSERT INTO `project`.`university` (`uniName`, `countryISOCode`) VALUES ('" + txtUniNameLOWCASE + "','" + countryISOCodeName + "');";
    con.query(sql1, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql2 = "INSERT INTO `project`.`faculty` (`uniID`, `facultyName`) VALUES ((SELECT `uniID` FROM `project`.`university` ORDER BY uniID DESC LIMIT 1), '-');";
    con.query(sql2, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql3 = "INSERT INTO `project`.`department` (`facultyID`, `departmentName`) VALUES ((SELECT `facultyID` FROM `project`.`faculty` ORDER BY facultyID DESC LIMIT 1), '-');";
    con.query(sql3, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql4 = "INSERT INTO `project`.`sub_dpment` (`Sub_Dpment_Parent`, `Sub_Dpment_name`) VALUES ((SELECT `departmentID` FROM `project`.`department` ORDER BY departmentID DESC LIMIT 1), '-');";
    con.query(sql4, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var mses = encodeURIComponent('เพิ่ม  ' + txtUniName + '  เรียบร้อยแล้ว');
    res.redirect('/department?valid=' + mses);

  });

  /*เพิ่มคณะใหม่ อย่างเดียว*/
  app.post('/department/newFaculty', function(req, res) {
    var uniNameForFaculty = req.body.NameOfuniIDForFaculty;
    var txtFacultyName = req.body.txtFacultyName;
    var txtFacultyNameLOWCASE = txtFacultyName.toLowerCase();

    var sql2 = "INSERT INTO `project`.`faculty` (`uniID`,`facultyName`) VALUES ('" + uniNameForFaculty + "','" + txtFacultyNameLOWCASE + "');";
    con.query(sql2, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql3 = "INSERT INTO `project`.`department` (`facultyID`, `departmentName`) VALUES ((SELECT `facultyID` FROM `project`.`faculty` ORDER BY facultyID DESC LIMIT 1), '-');";
    con.query(sql3, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql4 = "INSERT INTO `project`.`sub_dpment` (`Sub_Dpment_Parent`, `Sub_Dpment_name`) VALUES ((SELECT `departmentID` FROM `project`.`department` ORDER BY departmentID DESC LIMIT 1), '-');";
    con.query(sql4, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var mses = encodeURIComponent('เพิ่ม  ' + txtFacultyName + '  เรียบร้อยแล้ว');
    res.redirect('/department?valid=' + mses);

  });

  /*เพิ่มหน่วยงานหลักใหม่ อย่างเดียว*/
  app.post('/department/newdepartment/', function(req, res) {
    var nameOfuniIDFordepartment = req.body.NameOfuniIDFordepartment;
    var txtdepartmentName = req.body.txtdepartmentName;
    var txtdepartmentNameLOWCASE = txtdepartmentName.toLowerCase();

    var sql3 = "INSERT INTO `project`.`department` (`facultyID`, `departmentName`) VALUES ('" + nameOfuniIDFordepartment + "','" + txtdepartmentNameLOWCASE + "');";
    con.query(sql3, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql4 = "INSERT INTO `project`.`sub_dpment` (`Sub_Dpment_Parent`, `Sub_Dpment_name`) VALUES ((SELECT `departmentID` FROM `project`.`department` ORDER BY departmentID DESC LIMIT 1), '-');";
    con.query(sql4, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var mses = encodeURIComponent('เพิ่ม  ' + txtdepartmentName + '  เรียบร้อยแล้ว');
    res.redirect('/department?valid=' + mses);

  });

  /*เพิ่มหน่วยงานย่อยใหม่ อย่างเดียว*/
  app.post('/department/newsubdepartment/', function(req, res) {
    var nameOfdpmentIDForsubdepartment = req.body.NameOfdpmentIDForsubdepartment;
    var txtsubdepartmentName = req.body.txtsubdepartmentName;
    var txtsubdepartmentNameLOWCASE = txtsubdepartmentName.toLowerCase();

    var sql3 = "INSERT INTO `project`.`sub_dpment` (`Sub_Dpment_Parent`, `Sub_Dpment_name`) VALUES ('" + nameOfdpmentIDForsubdepartment + "','" + txtsubdepartmentNameLOWCASE + "');";
    con.query(sql3, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var sql4 = "INSERT INTO `project`.`sub_dpment` (`Sub_Dpment_Parent`, `Sub_Dpment_name`) VALUES ((SELECT `departmentID` FROM `project`.`department` ORDER BY departmentID DESC LIMIT 1), '-');";
    con.query(sql4, function(err, result) {
      if (err) throw err;
      console.log("Insert Complete...");
    });

    var mses = encodeURIComponent('เพิ่ม  ' + txtsubdepartmentName + '  เรียบร้อยแล้ว');
    res.redirect('/department?valid=' + mses);

  });

  /*แก้ไขชื่อมหาลัย*/
  app.post('/department/updateuniname/', function(req, res) {
    var id = req.body.oldUniID;
    var newname = req.body.newUniName;
    var oldname = req.body.name_displayOlduniname;

    var sql = "UPDATE project.university SET uniName='" + newname + "' WHERE uniID='" + id + "'";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น ' + newname + 'เรียบร้อยแล้ว');
      console.log('change to ' + oldname + '=>' + newname + 'already');
      res.redirect('/department?valid=' + mses);
    });
  });

  /*แก้ไขชื่อคณะ*/
  app.post('/department/updatefacultyname/', function(req, res) {
    var id = req.body.oldFacultyID;
    var newname = req.body.newFacultyName;
    var oldname = req.body.name_displayOldFacultyname;

    var sql = "UPDATE project.faculty SET facultyName='" + newname + "' WHERE facultyID='" + id + "'";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err)
        console.log("Error Selecting : %s ", err);
      var mses = encodeURIComponent('เปลี่ยน  ' + oldname + 'เป็น ' + newname + 'เรียบร้อยแล้ว');
      console.log('change to ' + oldname + '=>' + newname + 'already');
      res.redirect('/department?valid=' + mses);
    });
  });

  app.get("/department/getAllCountry/", function(req, res) {

    var sql = "SELECT * FROM project.country ORDER BY countryName ASC";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/department/getNameUniinCountry/", function(req, res) {
    var catdata = req.query.countryData;
    console.log(catdata);

    var sql = "SELECT uniName FROM project.university where countryISOCode ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/department/getNameofFacultyinUni/", function(req, res) {
    var catdata = req.query.uniData;
    console.log(catdata);

    var sql = "SELECT facultyName FROM project.faculty where uniID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/Department/getNameofDepartmentinFaculty/", function(req, res) {
    var catdata = req.query.facultyData;
    console.log(catdata);

    var sql = "SELECT departmentName FROM project.department WHERE facultyID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/Department/getUniinCountry/", function(req, res) {
    var catdata = req.query.countryData;
    console.log(catdata);

    var sql = "SELECT * FROM project.university where countryISOCode ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/Department/getFacultyinUni/", function(req, res) {
    var catdata = req.query.uniData;
    console.log(catdata);

    var sql = "SELECT * FROM project.faculty where uniID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/Department/getDpmentinFac/", function(req, res) {
    var catdata = req.query.facultyID;
    console.log(catdata);

    var sql = "SELECT * FROM project.department where facultyID ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  app.get("/department/getSubinDpment/", function(req, res) {
    var catdata = req.query.dpmantID;
    console.log(catdata);

    var sql = "SELECT * FROM project.sub_dpment where Sub_Dpment_Parent ='" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });
}
