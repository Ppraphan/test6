var bodyParser = require('body-parser');
var querystring = require('querystring');
var nodemailer = require('nodemailer'); /*ส่งอีเมล*/

var con = require('./connect-db.js'); /*เชื่อมต่อฐานข้อมูล*/

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rds.en.rmutt@gmail.com',
    pass: '0904309482'
  }
});

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
    var idNewProject = req.body.idofproject;
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

    var io2;
    var lastProjID;
    var newProjID;

    /*เพิ่มค่าID โปรเจคที่สร้างใหม่*/

    newProjID = parseInt(idNewProject, 10);
    newProjID = newProjID++;


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




    /*เพิ่มข้อมูลรายละเอียดโครงการวิจัย*/
    function dogoodA(name_projectParentName) {
      var idprojParent = name_projectParentName;

      var sql1 = "INSERT INTO project.project(projectNameTH,projectNameEN,projectSet,projectMain,projectParent,projectYears,idGrant,projectAmount,countryISOCode,uniID,facultyID,departmentID,subDepartmentID,researchTypeID,researchBranchID,researchFormID,researchStrategicID,stateOfProJ,dateState1,dateState2,dateState3,dateState4,dateState5,dateState6,dateState7,dateState8,dateState9,dateState10,dateState11,dateState12)  VALUES ('" + nameProjectTH + "','" + nameProjectEN + "','" + projectSet + "','" + projectMain + "','" + idprojParent + "','" + projectYears + "','" + budgetName + "','" + projectAmount + "','" + country + "','" + university + "','" + faculty + "','" + department + "','" + subdepartment + "','" + name_PJ_ADD_ResearcType + "','" + name_PJ_ADD_Researchbranch + "','" + name_PJ_ADD_Researchform + "','" + name_PJ_ADD_Researchstrategic + "','" + stateOfProJ + "','" + dateState1 + "','" + dateState2 + "','" + dateState3 + "','" + dateState4 + "','" + dateState5 + "','" + dateState6 + "','" + dateState7 + "','" + dateState8 + "','" + dateState9 + "','" + dateState10 + "','" + dateState11 + "','" + dateState12 + "');";
      console.log(sql1);
      con.query(sql1, function(err) {
        if (err) throw err;

      });
    };

    /*การเพิ่มหัวหน้าโครงการในโครงการใหม่*/
    function dogoodB(newProjID) {
      var peopleLD = [];
      var listProportionLD = [];

      for (var k = 0; k <= 9; k++) {
        peopleLD[k] = req.body['nameLDIDProj' + k];
        listProportionLD[k] = req.body['nameProportionLD' + k];


        if (peopleLD[k] != '' && peopleLD[k] != undefined) {
          if (listProportionLD[k] == '') {
            var nowpeople = peopleLD[k];
            var nowlistLD = "-";

            var sql_LD1 = "INSERT INTO project.LDProject (idUser_LD, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','" + nowlistLD + "');";

            con.query(sql_LD1);
            console.log(sql_LD2);

          } else {
            var nowpeople = peopleLD[k];
            var nowlistLD = listProportionLD[k];

            var sql_LD2 = "INSERT INTO project.LDProject (idUser_LD, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','" + nowlistLD + "');";

            con.query(sql_LD2);
            console.log(sql_LD2);
          }
        } else {
          console.log("NON DATA");
        }
      }

    };

    /*การเพิ่มนักวิจัยโครงการในโครงการใหม่*/
    function dogoodC(newProjID) {
      var peopleRS = [];
      var listProportionRS = [];

      for (var j = 0; j <= 9; j++) {
        peopleRS[j] = req.body['nameRSIDProj' + j];
        listProportionRS[j] = req.body['nameProportionRS' + j];


        if (peopleRS[j] != '' && peopleRS[j] != undefined) {
          if (listProportionRS[j] == '') {
            var nowpeople = peopleRS[j];
            var nowlistRS = "-";

            var sql3 = "INSERT INTO project.RSProject (idUser_RS, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','" + nowlistRS + "');";

            con.query(sql3);
            console.log(sql3);

          } else {
            var nowpeople = peopleRS[j];
            var nowlistRS = listProportionRS[j];

            var sql32 = "INSERT INTO project.RSProject (idUser_RS, idproject, proportion) VALUES ('" + nowpeople + "','" + newProjID + "','" + nowlistRS + "');";

            con.query(sql32);
            console.log(sql32);
          }
        } else {
          console.log("NON DATA");
        }
      }

    };

    async function dogood() {
      // await dogoodB(newProjID);
      // await dogoodC(newProjID);

      await dogoodA(name_projectParentName, projectMain);
    }


    dogood();

    var mses = encodeURIComponent('เพิ่มโครงการใหม่สำเร็จ');
    res.redirect('/all-project?valid=' + mses);

  });






  /*้แก้ไขโครงการ*/
  app.post('/update-project', function(req, res) {
    console.log("--------------------Post to update-project-------------------------------------")
    var mses = req.query.valid;
    var userinfo = req.user;

    /*ข้อมูลโครงการ*/
    var projID = req.body.idofproject;

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

    var emailLD = [];
    var nameProJLD;

    var emailRS = [];
    var nameProJRS;

    function dogoodA() {
      var sql0 = "SELECT stateOfProJ,projectNameTH FROM project.project WHERE idproject ='" + projID + "';";
      console.log(sql0);
      con.query(sql0, function(err, rows) {
        if (err) throw err;
        console.log("SELECT stateOfProJ,projectNameTH  " + rows[0].stateOfProJ);

        if (rows[0].stateOfProJ != stateOfProJ) {
          console.log("Project's status has changed");
          if (stateOfProJ == "1") {
            docaseLD1();
            docaseRS1();
          }
          if (stateOfProJ == "2") {
            docaseLD2();
            docaseRS2();
          }
          if (stateOfProJ == "3") {
            docaseLD3();
            docaseRS3();
          }
          if (stateOfProJ == "4") {
            docaseLD4();
            docaseRS4();
          }
          if (stateOfProJ == "5") {
            docaseLD5();
            docaseRS5();
          }
          if (stateOfProJ == "6") {
            docaseLD6();
            docaseRS6();
          }
          if (stateOfProJ == "7") {
            docaseLD7();
            docaseRS7();
          }
          if (stateOfProJ == "8") {
            docaseLD8();
            docaseRS8();
          }
          if (stateOfProJ == "9") {
            docaseLD9();
            docaseRS9();
          }
          if (stateOfProJ == "10") {
            docaseLD10();
            docaseRS10();
          }
          if (stateOfProJ == "11") {
            docaseLD11();
            docaseRS11();
          }
          if (stateOfProJ == "12") {
            docaseLD12();
            docaseRS12();
          } else {
            console.log("rows[0].stateOfProJ ERROR");
          }

        } else {
          console.log("Project's status still same");
        }

      });
    };

    function dogoodB() {
      var sql1 = "UPDATE project.project SET projectNameTH = '" + nameProjectTH + "', projectNameEN = '" + nameProjectEN + "', projectSet = '" + projectSet + "', projectMain = '" + projectMain + "', projectParent = '" + name_projectParentName + "', projectYears = '" + projectYears + "' , idGrant = '" + budgetName + "' , projectAmount = '" + projectAmount + "', countryISOCode = '" + country + "' , uniID = '" + university + "', facultyID = '" + faculty + "', departmentID = '" + department + "', subDepartmentID = '" + subdepartment + "' , researchTypeID = '" + name_PJ_ADD_ResearcType + "' , researchBranchID = '" + name_PJ_ADD_Researchbranch + "', researchFormID = '" + name_PJ_ADD_Researchform + "', researchStrategicID = '" + name_PJ_ADD_Researchstrategic + "', stateOfProJ = '" + stateOfProJ + "'  , dateState1 = '" + dateState1 + "' , dateState2 = '" + dateState2 + "', dateState3 = '" + dateState3 + "', dateState4 = '" + dateState4 + "', dateState5 = '" + dateState5 + "' , dateState6 = '" + dateState6 + "', dateState7 = '" + dateState7 + "', dateState8 = '" + dateState8 + "' , dateState9 = '" + dateState9 + "', dateState10 = '" + dateState10 + "', dateState11 = '" + dateState11 + "', dateState12 = '" + dateState12 + "' WHERE (idproject = '" + projID + "');";
      console.log(sql1);
      con.query(sql1, function(err) {
        if (err) throw err;
      });
    };

    function docaseLD1() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 1 ทำบันทึกขออนุมัติดำเนินโครงการฯ (ฟอร์ม 2)พร้อมแนบแผนการใช้จ่ายเงิน (วจ.1) (ฟอร์ม 1)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD2() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 2 ทำบันทึกเบิกงวด 1 (ฟอร์ม 3)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD3() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 3 การจัดซื้อวัสดุ (ฟอร์ม 4)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD4() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 4 การจัดจ้าง (ฟอร์ม 5)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD5() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 5 ใบสำคัญรับเงิน (ฟอร์ม 6)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD6() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 6 ขอขยายเวลาดำเนินโครงการวิจัยฯ (ฟอร์ม 7)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD7() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 7 ทำบันทึกส่งหลักฐานการใช้เงิน (ฟอร์ม 8)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD8() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 8 ทำบันทึกเบิกเงินงวดที่ 2 (ฟอร์ม 9 )พร้อมแนบรายงานความก้าวหน้า(ฟอร์ม 10 )',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD9() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 9 ทำบันทึกเบิกงวด 3 (ฟอร์ม 11)พร้อมส่งเล่มรายงานวิจัยฉบับสมบูรณ์ 6 เล่ม ซีดี 2 แผ่น',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD10() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 10 ทำบันทึกส่งเล่มรายงานวิจัย (ฟอร์ม 12)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD11() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 11 ทำบันทึกส่งมอบครุภัณฑ์ (ถ้ามี) (ฟอร์ม 13)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseLD12() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.LDProject,project.users WHERE project.users.id = project.LDProject.idUser_LD AND project.project.idproject = project.LDProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailLD.push(rows[i].email);
          nameProJLD = rows[0].projectNameTH;
        }
        console.log("emailLD " + emailLD);

        var mailOptions = {
          from: 'Research Database System',
          to: emailLD,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นหัวหน้าโครงการชื่อ ' + nameProJLD + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 12 ททำบันทึกปิดโครงการวิจัย (ฟอร์ม 14)พร้อมแนบ วจ.2 (ฟอร์ม 15)',
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS1() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 1 ทำบันทึกขออนุมัติดำเนินโครงการฯ (ฟอร์ม 2)พร้อมแนบแผนการใช้จ่ายเงิน (วจ.1) (ฟอร์ม 1)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS2() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 2 ทำบันทึกเบิกงวด 1 (ฟอร์ม 3 )',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS3() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 3 การจัดซื้อวัสดุ (ฟอร์ม 4)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS4() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 4 การจัดจ้าง (ฟอร์ม 5)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS5() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 5 ใบสำคัญรับเงิน (ฟอร์ม 6)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS6() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 6 ขอขยายเวลาดำเนินโครงการวิจัยฯ (ฟอร์ม 7)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS7() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 7 ทำบันทึกส่งหลักฐานการใช้เงิน (ฟอร์ม 8)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS8() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 8 ทำบันทึกเบิกเงินงวดที่ 2 (ฟอร์ม 9 )พร้อมแนบรายงานความก้าวหน้า(ฟอร์ม 10 )',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS9() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 9 ทำบันทึกเบิกงวด 3 (ฟอร์ม 11)พร้อมส่งเล่มรายงานวิจัยฉบับสมบูรณ์ 6 เล่ม ซีดี 2 แผ่น',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS10() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 10 ทำบันทึกส่งเล่มรายงานวิจัย (ฟอร์ม 12)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS11() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 11 ทำบันทึกส่งมอบครุภัณฑ์ (ถ้ามี) (ฟอร์ม 13)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    function docaseRS12() {
      var sqll0 = "SELECT email,projectNameTH FROM project.project,project.RSProject,project.users WHERE project.users.id = project.RSProject.idUser_RS AND project.project.idproject = project.RSProject.idproject AND project.project.idproject = '" + projID + "';";
      console.log(sqll0);
      con.query(sqll0, function(err, rows) {
        if (err) throw err;
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          emailRS.push(rows[i].email);
          nameProJRS = rows[0].projectNameTH;
        }
        console.log("emailRS " + emailRS);

        var mailOptionsRS = {
          from: 'Research Database System',
          to: emailRS,
          subject: 'สถานะโครงการของคุณมีการเปลี่ยนแปลง',
          text: 'โครงการที่ท่านเป็นผู้ร่วมวิจัย ชื่อ ' + nameProJRS + ' เจ้าหน้าที่ได้มีเปลี่ยนแปลงสถานะของโครงการ โดยปัจจุบันอยู่ในขั้นตอนที่ 12 ทำบันทึกปิดโครงการวิจัย (ฟอร์ม 14)พร้อมแนบ วจ.2 (ฟอร์ม 15)',
        };

        transporter.sendMail(mailOptionsRS, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      });


    }

    async function dogood() {
      await dogoodA();
      await dogoodB();
    }

    dogood();
    var mses = encodeURIComponent('แก้ไขรายละเอียดโครงการสำเร็จ');
    res.redirect('/all-project?valid=' + mses);
  });

  /*ดูรายละเอียดโครงการ ของผู้ใช้งาน*/
  app.get('/view-project/:id', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var projID = req.params.id;

    var sql0 = "SELECT * FROM project.project where idproject ='" + projID + "';";
    con.query(sql0, function(err, rows) {
      console.log(rows);

      var sql1 = "SELECT * FROM project.project where idproject ='" + projID + "';" +

        "SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.LDProject where project.LDProject.idproject = project.project.idproject  and project.LDProject.idUser_LD = project.users.id and project.LDProject.idproject = '" + projID + "';" +

        "SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.RSProject where project.RSProject.idproject = project.project.idproject  and project.RSProject.idUser_RS = project.users.id and project.RSProject.idproject = '" + projID + "';" +

        "SELECT * FROM project.country;" +

        "SELECT * FROM project.university WHERE countryISOCode= '" + rows[0].countryISOCode + "'and uniName != 'example'order by uniName;" +

        "SELECT * FROM project.faculty WHERE uniID= '" + rows[0].uniID + "' order by facultyName;" +

        "SELECT * FROM project.department WHERE facultyID= '" + rows[0].facultyID + "'order by departmentName;" +

        "SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + rows[0].departmentID + "'order by Sub_Dpment_name;" +

        "SELECT * FROM project.tresearchtype;" +

        "SELECT * FROM project.researchbranch;"

        +
        "SELECT * FROM project.researchform;" +

        "SELECT * FROM project.researchstrategic;" +

        "SELECT * FROM project.grants;" +

        "SELECT * FROM project.project,project.grants where project.project.idGrant = project.grants.idGrants and project.project.idproject='" + rows[0].projectParent + "';" +

        "SELECT distinct grants_Years FROM project.grants order by grants_Years;";


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
          dataRshGrantsYears: rows1[14],
        });
      });

    });

  });

  /*ดูรายละเอียดโครงการ ของฉัน*/
  app.get('/viewmy-project/:id', function(req, res) {
    var userinfo = req.user;
    var mses = req.query.valid;

    var projID = req.params.id;

    var sql0 = "SELECT * FROM project.project where idproject ='" + projID + "';";
    con.query(sql0, function(err, rows) {
      console.log(rows);

      var sql1 = "SELECT * FROM project.project where idproject ='" + projID + "';SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.LDProject where project.LDProject.idproject = project.project.idproject  and project.LDProject.idUser_LD = project.users.id and project.LDProject.idproject = '" + projID + "';SELECT email,academicPositions,firstname,lastname,proportion,projectNameTH FROM project.users,project.project,project.RSProject where project.RSProject.idproject = project.project.idproject  and project.RSProject.idUser_RS = project.users.id and project.RSProject.idproject = '" + projID + "';SELECT * FROM project.country;SELECT * FROM project.university WHERE countryISOCode= '" + rows[0].countryISOCode + "'and uniName != 'example'order by uniName;SELECT * FROM project.faculty WHERE uniID= '" + rows[0].uniID + "' order by facultyName;SELECT * FROM project.department WHERE facultyID= '" + rows[0].facultyID + "'order by departmentName;SELECT * FROM project.sub_dpment WHERE Sub_Dpment_Parent= '" + rows[0].subDepartmentID + "'order by Sub_Dpment_name;SELECT * FROM project.tresearchtype;SELECT * FROM project.researchbranch;SELECT * FROM project.researchform;SELECT * FROM project.researchstrategic;SELECT * FROM project.grants;SELECT * FROM project.project,project.grants where project.project.idGrant = project.grants.idGrants and project.project.idproject='" + rows[0].projectParent + "'";


      con.query(sql1, function(err, rows1) {
        if (err) console.log("Error Selecting : %s ", err);

        console.log(rows1[0][0]);
        console.log(rows1[1]);

        res.render('pages/viewmy-project', {
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

  /*ลบโครงการวิจัย*/
  app.get('/deleteproject/:id', function(req, res) {
    var projID = req.params.id;
    console.log(projID);

    var query = "DELETE FROM project.project WHERE (idproject = '" + projID + "');";
    console.log(query);
    con.query(query, function(err, rows) {
      if (err) console.log("Error Selecting : %s ", err);

      var query1 = "DELETE FROM project.LDProject WHERE (idproject = '" + projID + "');";
      console.log(query1);

      con.query(query1, function(err, rows) {
        if (err) console.log("Error Selecting : %s ", err);

        var query2 = "DELETE FROM project.RSProject WHERE (idproject = '" + projID + "');";
        console.log(query2);

        con.query(query2, function(err, rows) {
          if (err) console.log("Error Selecting : %s ", err);
        });

      });

    });



    var mses = encodeURIComponent('ลบ  เรียบร้อยแล้ว');
    res.redirect('/all-project?valid=' + mses);
  });




  /*ขอรายชื่อหัวหน้าโครงการ โดยอีเมล*/
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
