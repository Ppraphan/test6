var bodyParser = require('body-parser');
var querystring = require('querystring');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {
  /*หน้าโครงการวิจัยทั้งหมด*/
  app.get('/project', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var sql = "SELECT idproject,projectNameTH,departmentName,grants_Years FROM project.project,project.department,project.grants WHERE project.project.idGrant = project.grants.idGrants AND  project.project.departmentID = project.department.departmentID";

    con.query(sql, function(err, rows) {
      res.render('pages/project', {
        userinfo: userinfo,
        messages: mses,
        
        data0: rows,
      });
    });

  });

  /*เปิดหน้าโครงการวิจัยใหม่*/
  app.get('/new-project', function(req, res) {

    var mses = req.query.valid;
    var userinfo = req.user;

    con.query('SELECT grants_Years FROM project.grants GROUP BY grants_Years; SELECT countryISOCode,countryName FROM project.country order by countryName;SELECT * FROM project.tresearchtype;SELECT * FROM project.researchbranch;SELECT * FROM project.researchform;SELECT * FROM project.researchstrategic;SELECT `idproject` FROM `project`.`project` ORDER BY idproject DESC LIMIT 1;SELECT distinct grants_Years FROM project.project,project.grants WHERE projectSet = 1 AND projectParent = idproject AND project.project.idGrant = project.grants.idGrants ;', function(err, results) {
      if (err) console.log("Error Selecting : %s ", err);
      /*เพิ่มค่าID โปรเจคที่สร้างใหม่*/
      let io = results[6];
      let io2 = io[0].idproject;
      let lastProjID = parseInt(io2);
      let newProjID = lastProjID + 1;

      res.render('pages/new-project', {
        userinfo: userinfo,
        data0: results[0],
        data1: results[1],
        data2: results[2],
        data3: results[3],
        data4: results[4],
        data5: results[5],
        data6: newProjID,
        data7: results[7],

        messages: mses,
      });
    });
  });

  /*้เพิ่มโครงการใหม่*/
  app.post('/new-project', function(req, res) {
    console.log("--------------------Post to /new-project-------------------------------------")
    var mses = req.query.valid;
    var userinfo = req.user;

    /*ข้อมูลโครงการ*/
    var nameProjectTH = req.body.NAME_nameProjectTH; /*ชื่อโครงการภาษาไทย*/
    var nameProjectEN = req.body.NAME_nameProjectEN; /*ชื่อโครงการภาษาอังกฤษ*/
    var projectYears = req.body.projectYears; /*ปีของโครงการ*/

    var projectSet = req.body.projectSet; /*เป็นโครงการชุดใช่หรือไม่*/
    var projectMain = req.body.projectMain; /*เป็นโครงการหลักของโครงการชุดใช่หรือไม่*/
    var name_projectParentName = req.body.name_projectParentName; /*รหัสของโครงการหลัก*/
    var BudgetName = req.body.BudgetName; /*ปีงบประมาณ*/
    var amountBudget = req.body.amountBudget; /*งบประมาณที่ได้รับ*/

    var country = req.body.country; /*รหัสประเทศ*/
    var university = req.body.university; /*รหัสมหาวิทยาลัย*/
    var faculty = req.body.faculty; /*รหัสคณะ*/
    var department = req.body.department; /*รหัสของหน่วยงานหลัก*/
    var subdepartment = req.body.subdepartment; /*รหัสของหน่วยงานย่อย*/

    var name_PJ_ADD_ResearcType = req.body.name_PJ_ADD_ResearcType; /*รหัสของประเภทงานวิจัย*/
    var name_PJ_ADD_Researchbranch = req.body.name_PJ_ADD_Researchbranch; /*รหัสของสาขาการวิจัย*/
    var name_PJ_ADD_Researchform = req.body.name_PJ_ADD_ResearcType; /*รหัสของรูปแบบการวิจัย*/
    var name_PJ_ADD_Researchstrategic = req.body.name_PJ_ADD_Researchstrategic; /*รหัสของยุทศาสตร์การวิจัย*/

    var sql0 = "SELECT `idproject` FROM `project`.`project` ORDER BY idproject DESC LIMIT 1;";
    console.log(sql0);
    con.query(sql0, function(err, results) {
      if (err) throw err;
      /*เพิ่มค่าID โปรเจคที่สร้างใหม่*/
      var io2 = results[0].idproject;;
      var lastProjID = parseInt(io2);
      var newProjID = lastProjID + 1;

      console.log("newProjID = " + newProjID);
      console.log("nameProjectTH = " + nameProjectTH);
      console.log("nameProjectEN = " + nameProjectEN);
      console.log("projectYears = " + projectYears);
      console.log("projectSet = " + projectSet);
      console.log("projectMain = " + projectMain);
      console.log("name_projectParentName = " + name_projectParentName);
      console.log("BudgetName = " + BudgetName);
      console.log("amountBudget = " + amountBudget);
      console.log("country = " + country);
      console.log("university = " + university);
      console.log("faculty = " + faculty);
      console.log("department = " + department);
      console.log("subdepartment " + subdepartment);
      console.log("name_PJ_ADD_ResearcType = " + name_PJ_ADD_ResearcType);
      console.log("name_PJ_ADD_Researchbranch = " + name_PJ_ADD_Researchbranch);
      console.log("name_PJ_ADD_Researchform = " + name_PJ_ADD_Researchform);
      console.log("name_PJ_ADD_Researchstrategic = " + name_PJ_ADD_Researchstrategic);

      if (projectSet == 1) {
        if (projectMain == 1) {
          name_projectParentName = newProjID;
          console.log("name_projectParentName = " + name_projectParentName);
        }
      }
      if (projectSet == 0) {
        projectMain = "-";
        name_projectParentName = "-";
      }


      var sql1 = "INSERT INTO `project`.`project` (`projectNameTH`, `projectNameEN`, `projectYears`, `projectSet`, `projectMain`, `projectParent`, `idGrant`, `researchTypeID`, `researchFormID`, `researchBranchID`, `researchStrategicID`, `countryISOCode`, `uniID`, `facultyID`, `departmentID`, `subDepartmentID`) VALUES ('" + nameProjectTH + "','" + nameProjectEN + "','" + projectYears + "','" + projectSet + "','" + projectMain + "','" + name_projectParentName + "','" + BudgetName + "','" + name_PJ_ADD_ResearcType + "','" + name_PJ_ADD_Researchform + "','" + name_PJ_ADD_Researchbranch + "','" + name_PJ_ADD_Researchstrategic + "','" + country + "','" + university + "','" + faculty + "','" + department + "','" + subdepartment + "');";
      console.log(sql1);
      con.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Insert Complete...");

        /*การเพิ่มหัวหน้าโครงการในโครงการใหม่*/
        var people = [];
        var listProportionLD = [];

        for (i = 0; i <= 9; i++) {
          people[i] = req.body['nameLDIDProj' + i];
          listProportionLD[i] = req.body['nameProportionLD' + i];

          if(people[i] != '' && listProportionLD[i] != ''){
            var sql2 = "INSERT INTO `project`.`LDProject` (`idUser_LD`, `idproject`, `proportion`) VALUES ('" + people[i] + "','" + newProjID + "','" + listProportionLD[i] + "');";

            con.query(sql2, function(err, results) {
              if (err) throw err;
              console.log("Insert Complete...");

            });
          }
        };

        /*การเพิ่มนักวิจัยโครงการในโครงการใหม่*/
        var peopleRS = [];
        var listProportionRS = [];

        for (i = 0; i <= 9; i++) {
          peopleRS[i] = req.body['nameLDIDProj' + i];
          listProportionRS[i] = req.body['nameProportionRS' + i];

          if(peopleRS[i] != '' && listProportionRS[i] != ''){
            var sql3 = "INSERT INTO `project`.`RSProject` (`idUser_RS`, `idproject`, `proportion`) VALUES ('" + peopleRS[i] + "','" + newProjID + "','" + listProportionRS[i] + "');";

            con.query(sql3, function(err, results) {
              if (err) throw err;
              console.log("Insert Complete...");

            });
          }
        };

        res.redirect('/?valid=' + mses);
      });

    });


  });

  /*ขอรายชื่อหัวหน้าโครงการ*/
  app.get('/getusername', function(req, res) {
    var catdata = req.query.emailsearchUserLD;
    console.log(catdata);
    var sql = "SELECT id,firstname,lastname FROM project.users WHERE email ='" + catdata + "' ";
    con.query(sql, function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.send(rows);
      console.log(rows);
    });
  });

  /*ขอรายชื่อผู้ร่วมวิจัย*/
  app.get('/getRSusername', function(req, res) {
    var catdata = req.query.emailsearchUserRS;
    console.log(catdata);
    var sql = "SELECT id,firstname,lastname FROM project.users WHERE email ='" + catdata + "' ";
    con.query(sql, function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);
      res.send(rows);
      console.log(rows);
    });
  });

  /*หน้าโครงการวิจัยทั้งหมด*/
  app.get('/all-project', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var sql = "SELECT idproject,projectNameTH,departmentName,grants_Years FROM project.project,project.department,project.grants WHERE project.project.idGrant = project.grants.idGrants AND  project.project.departmentID = project.department.departmentID";

    con.query(sql, function(err, rows) {
      res.render('pages/all-project', {
        userinfo: userinfo,
        messages: mses,
        data0: rows,
      });
    });

  });

  /*get ชื่อทุนวิจัยจากปีที่ถูกเลือก*/
  app.get("/all-project/getmaingrantsnamefromyear/", function(req, res) {
    var catdata = req.query.budgetYear;
    console.log(catdata);

    var sql = "SELECT idproject,projectNameTH FROM project.project,project.grants WHERE projectSet = 1 AND projectParent = idproject AND project.project.idGrant = project.grants.idGrants AND project.grants.grants_Years = '" + catdata + "' ";
    console.log(sql);
    con.query(sql, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

}
