exports.requireRole = function(role,req, res) {

    return function(req, res, next) {
      if (req.user.userPermission === role) {
        next();
      } else {
        console.log("ไม่ได้รับอนุญาตเข้าถึงส่วนนี้");
        res.send(403);
      }
    }

}
