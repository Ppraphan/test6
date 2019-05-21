var bodyParser = require('body-parser');
var querystring = require('querystring');
var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

module.exports = function(app) {

  app.get('/project/:idproject', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var idOfProj = req.params.idproject;
    console.log(idOfProj);

    var sql = "SELECT * FROM project.project WHERE idproject ='" + idOfProj + "';";

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
    var projectSet = req.body.projectSet; /*เป็นโครงการชุดใช่หรือไม่*/
    var projectMain = req.body.projectMain; /*เป็นโครงการหลักของโครงการชุดใช่หรือไม่*/
    var name_projectParentName = req.body.name_projectParentName; /*รหัสของโครงการหลัก*/
    var projectYears = req.body.projectYears; /*ปีของโครงการ*/


    var budgetName = req.body.BudgetName; /*IDปีงบประมาณ*/
    var projectAmount = req.body.amountBudget; /*งบประมาณที่ได้รับ*/

    var country = req.body.country; /*รหัสประเทศ*/
    var university = req.body.university; /*รหัสมหาวิทยาลัย*/
    var faculty = req.body.faculty; /*รหัสคณะ*/
    var department = req.body.department; /*รหัสของหน่วยงานหลัก*/
    var subdepartment = req.body.subdepartment; /*รหัสของหน่วยงานย่อย*/

    var name_PJ_ADD_ResearcType = req.body.name_PJ_ADD_ResearcType; /*รหัสของประเภทงานวิจัย*/
    var name_PJ_ADD_Researchbranch = req.body.name_PJ_ADD_Researchbranch; /*รหัสของสาขาการวิจัย*/
    var name_PJ_ADD_Researchform = req.body.name_PJ_ADD_ResearcType; /*รหัสของรูปแบบการวิจัย*/
    var name_PJ_ADD_Researchstrategic = req.body.name_PJ_ADD_Researchstrategic; /*รหัสของยุทศาสตร์การวิจัย*/

    var stateOfProJ = req.body.stateOfProJ; /*สถานะของโครงการ*/

    var dateState1 = req.body.dateState1; /**/
    var dateState2 = req.body.dateState2; /**/
    var dateState3 = req.body.dateState3; /**/
    var dateState4 = req.body.dateState4; /**/
    var dateState5 = req.body.dateState5; /**/
    var dateState6 = req.body.dateState6; /**/
    var dateState7 = req.body.dateState7; /**/
    var dateState8 = req.body.dateState8; /**/
    var dateState9 = req.body.dateState9; /**/
    var dateState10 = req.body.dateState10; /**/
    var dateState11 = req.body.dateState11; /**/
    var dateState12 = req.body.dateState12; /**/

    var sql0 = "SELECT `idproject` FROM `project`.`project` ORDER BY idproject DESC LIMIT 1;";
    console.log(sql0);
    con.query(sql0, function(err, results) {
      if (err) throw err;
      /*เพิ่มค่าID โปรเจคที่สร้างใหม่*/
      var io2 = results[0].idproject;;
      var lastProjID = parseInt(io2);
      var newProjID = lastProjID + 1;


      if (projectSet == 1) {
        if (projectMain == 1) {
          name_projectParentName = newProjID;
          console.log("name_projectParentName = " + name_projectParentName);
        }
      }
      if (projectSet == 0) {
        projectMain = "0";
        name_projectParentName = "0";
      }

      function dogoodA() {
        var sql1 = "INSERT INTO project.project(projectNameTH,projectNameEN,projectSet,projectMain,projectParent,projectYears,idGrant,projectAmount,countryISOCode,uniID,facultyID,departmentID,subDepartmentID,researchTypeID,researchBranchID,researchFormID,researchStrategicID,stateOfProJ,dateState1,dateState2,dateState3,dateState4,dateState5,dateState6,dateState7,dateState8,dateState9,dateState10,dateState11,dateState12)  VALUES ('" + nameProjectTH + "','" + nameProjectEN + "','" + projectSet + "','" + projectMain + "','" + name_projectParentName + "','" + projectYears + "','" + budgetName + "','" + projectAmount + "','" + country + "','" + university + "','" + faculty + "','" + department + "','" + subdepartment + "','" + name_PJ_ADD_ResearcType + "','" + name_PJ_ADD_Researchbranch + "','" + name_PJ_ADD_Researchform + "','" + name_PJ_ADD_Researchstrategic + "','" + stateOfProJ + "','" + dateState1 + "','" + dateState2 + "','" + dateState3 + "','" + dateState4 + "','" + dateState5 + "','" + dateState6 + "','" + dateState7 + "','" + dateState8 + "','" + dateState9 + "','" + dateState10 + "','" + dateState11 + "','" + dateState12 + "')";
        console.log(sql1);
        con.query(sql1);
      }

      /*การเพิ่มหัวหน้าโครงการในโครงการใหม่*/
      function dogoodB() {
        var people = [];
        var listProportionLD = [];

        for (var i = 0; i <= 9; i++) {
          people[i] = req.body['nameLDIDProj' + i];
          listProportionLD[i] = req.body['nameProportionLD' + i];

          console.log("people[i] " + people);

          if (people[i] != '' && people[i] != undefined) {

            if (listProportionLD[i] == '') {
              var nowpeopleLD = people[i];

              var sql2 = "INSERT INTO project.LDProject (idUser_LD, idproject, proportion) VALUES ('" + nowpeopleLD + "','" + newProjID + "','-');";
              console.log(sql2);
              con.query(sql2);
            } else {
              var nowpeopleLD = people[i];
              var nowlistLD = listProportionLD[i];

              var sql22 = "INSERT INTO project.LDProject (idUser_LD, idproject, proportion) VALUES ('" + nowpeopleLD + "','" + newProjID + "','" + nowlistLD + "');";
              console.log(sql22);
              con.query(sql22);
            }

          } else {
            console.log("req.body['nameLDIDProj' + i] = NULL");
          }

        }
      }


      /*การเพิ่มนักวิจัยโครงการในโครงการใหม่*/
      function dogoodC() {
        var peopleRS = [];
        var listProportionRS = [];
        var j;
        for (j = 0; j <= 9; j++) {
          peopleRS[j] = req.body['nameRSIDProj' + j];
          listProportionRS[j] = req.body['nameProportionRS' + j];

          console.log("peopleRS[] " + peopleRS);
          console.log("listProportionRS[] " + listProportionRS);
          if (peopleRS[j] != '' && peopleRS[j] != undefined) {
            if (listProportionRS[j] == '') {
              var nowpeople = peopleRS[j];

              var sql3 = "INSERT INTO project.RSProject (idUser_RS, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','-')";

              con.query(sql3);
            } else {
              var nowpeople = peopleRS[j];
              var nowlistRS = listProportionRS[j];
              var sql32 = "INSERT INTO project.RSProject (idUser_RS, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','" + nowlistRS + "')";

              con.query(sql32);
            }
          } else {
            console.log("peopleRS[J] = " + peopleRS);
          }
        };
      }


      async function dogood() {
        await dogoodA();
        await dogoodB();
        await dogoodC();

        var mses = encodeURIComponent('เพิ่มโครงการใหม่สำเร็จ');
        res.redirect('/all-project?valid=' + mses);
      }


      dogood();

    });

  });

  /*ดูรายละเอียดโครงการ*/
  app.get('/view-project/:id', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var projID = req.params.id;

    var sql0 = "SELECT * FROM project.project where idproject ='" + projID + "';";
    con.query(sql0, function(err, rows) {
      console.log(rows);

      var sql1 = "SELECT * FROM project.project where idproject ='" + projID + "';SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.LDProject where project.LDProject.idproject = project.project.idproject  and project.LDProject.idUser_LD = project.users.id and project.LDProject.idproject = '" + projID + "';SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.RSProject where project.RSProject.idproject = project.project.idproject  and project.RSProject.idUser_RS = project.users.id and project.RSProject.idproject = '" + projID + "';SELECT * FROM project.country;SELECT * FROM project.university WHERE countryISOCode= '" + rows[0].countryISOCode + "'and uniName != 'example'order by uniName;SELECT * FROM project.faculty WHERE uniID= '" + rows[0].uniID + "'and facultyName != '-'order by facultyName;SELECT * FROM project.department WHERE facultyID= '" + rows[0].facultyID + "'order by departmentName;SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + rows[0].subDepartmentID + "'order by Sub_Dpment_name;SELECT * FROM project.tresearchtype;SELECT * FROM project.researchbranch;SELECT * FROM project.researchform;SELECT * FROM project.researchstrategic;SELECT * FROM project.grants;SELECT * FROM project.project,project.grants where project.project.idGrant = project.grants.idGrants and project.project.idproject='" + rows[0].projectParent + "'";


      con.query(sql1, function(err, rows1) {
        if (err) console.log("Error Selecting : %s ", err);

        console.log(rows1[0][0]);
        console.log(rows1[1]);

        res.render('pages/view-project', {
          userinfo: userinfo,
          messages: mses,

          dataProJ: rows1[0][0],
          dataLD: rows1[1],
          dataRS: rows1[2],
          dataCountry: rows1[3],
          dataUni: rows1[4],
          dataFac: rows1[5],
          dataDPMent: rows1[6],
          dataSubDPMent: rows1[7],

          dataRshtype: rows1[8],
          dataRshbranch: rows1[9],
          dataRshForm: rows1[10],
          dataRshStrategic: rows1[11],

          dataRshGrants: rows1[12],
          dataRshProjParent: rows1[13],
        });
      });

    });

  });









  /*ขอรายชื่อหัวหน้าโครงการ*/
  app.get('/getusername', function(req, res) {
    var catdata = req.query.emailsearchUserLD;
    console.log(catdata);
    var sql = "SELECT id,firstname,lastname,email FROM project.users WHERE email ='" + catdata + "' ";
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

    var sql = "SELECT idproject,projectNameTH,stateOfProJ,grants_Years FROM project.project,project.grants WHERE project.project.idGrant = project.grants.idGrants";

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
