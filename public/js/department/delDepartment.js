/*ดึงรายชื่อ เมื่อลบหน่วยงานย่อย*/
function fnDelSubDpment() {
  let subdpment_name = document.getElementById("selectSubDpmantID_edit");
  let text_subdpment_name = subdpment_name.options[subdpment_name.selectedIndex].text;
  document.getElementById("id_delDubDpmentName").value = text_subdpment_name;

  let subdpment_id = document.getElementById("selectSubDpmantID_edit");
  let text_subdpment_id = subdpment_id.options[subdpment_id.selectedIndex].value;
  document.getElementById("id_delDubDpmentID").value = text_subdpment_id;
};

/*ดึงรายชื่อ เมื่อลบหน่วยงานหลัก*/
function fnDelDpment() {
  let dpment_name = document.getElementById("selectDpmantID_edit");
  let text_dpment_name = dpment_name.options[dpment_name.selectedIndex].text;
  document.getElementById("id_delDDpmentName").value = text_dpment_name;

  let dpment_id = document.getElementById("selectDpmantID_edit");
  let text_dpment_id = dpment_id.options[dpment_id.selectedIndex].value;
  document.getElementById("id_delDDpmentID").value = text_dpment_id;
};

/*ดึงรายชื่อ เมื่อลบคณะ*/
function fnDelFaculty() {
  let faculty_name = document.getElementById("getFaculty_edit");
  let text_faculty_name = faculty_name.options[faculty_name.selectedIndex].text;
  document.getElementById("id_delFacultyName").value = text_faculty_name;

  let faculty_id = document.getElementById("getFaculty_edit");
  let text_faculty_id = faculty_id.options[faculty_id.selectedIndex].value;
  document.getElementById("id_delFacultyID").value = text_faculty_id;
}

/*ดึงรายชื่อ เมื่อลบมหาวิทยาลัย*/
function fnDelUni() {
  let uni = document.getElementById("getUni_edit");
  let text_uni = uni.options[uni.selectedIndex].text;
  document.getElementById("id_delUniName").value = text_uni;

  let Uni_id = document.getElementById("getUni_edit");
  let text_Uni_id = Uni_id.options[Uni_id.selectedIndex].value;
  document.getElementById("id_delUniID").value = text_Uni_id;
}
