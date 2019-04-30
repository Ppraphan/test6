$(document).ready(function() {
  $('#comfirmResetPassword').attr('disabled', 'disabled');
    $('#ME_ID_newPassword2,#ME_ID_newPassword1').keyup(function() {
      var ME_ID_newPassword1 = document.getElementById('ME_ID_newPassword1').value;
      var comfirmIDHumanChkPage = document.getElementById('ME_ID_newPassword2').value;

      if($.trim($('#ME_ID_newPassword2').val()) == ''){
        $('#comfirmResetPassword').attr('disabled', 'disabled');
        /*รหัสผ่านว่างเปล่า*/
        let elementalertEmptryName1 = document.getElementById("ME_ID_reset_Div_alertEmptryPS");
        elementalertEmptryName1.classList.remove("hide");

        let elementalertEmptryName2 = document.getElementById("ME_ID_reset_Div_wrongPS");
        elementalertEmptryName2.classList.add("hide");
      }else{
        if(ME_ID_newPassword1 != comfirmIDHumanChkPage){
          $('#comfirmResetPassword').attr('disabled', 'disabled');
          /*รหัสผ่านไม่ตรงกัน*/
          let elementalertEmptryName1 = document.getElementById("ME_ID_reset_Div_alertEmptryPS");
          elementalertEmptryName1.classList.add("hide");

          let elementalertEmptryName2 = document.getElementById("ME_ID_reset_Div_wrongPS");
          elementalertEmptryName2.classList.remove("hide");
        }
        else{
          /*เคสถูก*/
          $('#comfirmResetPassword').removeAttr('disabled');

          let elementalertEmptryName2 = document.getElementById("ME_ID_reset_Div_wrongPS");
          elementalertEmptryName2.classList.add("hide");

          var elementalertEmptryName1 = document.getElementById("ME_ID_reset_Div_alertEmptryPS");
          elementalertEmptryName1.classList.add("hide");

        }

      }
    });
});
