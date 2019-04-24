var express = require('express');
var router = express.Router();

var $mysql = require("mysql");
var sql = require("./mysql");

/**
 * 上一级接口 /userfind
 * 根据请求，在数据库查找数据的接口。
 * 数据量：json对象数组，长度至少为1，不能为0
 */
router.post('/', function (req, res, next) {
  var request = req.body;
  var select = toSelect(request.element,
    request.weapon,
    request.sex,
    request.rare,
    request.role);
  var $sql = $mysql.createConnection(sql.picture); //创建连接
  $sql.connect(); //打开连接
  $sql.query(select, function (err, response) {
    $sql.end();// 关闭连接
    if (err) {
      console.log("错误", err);//我们打印出，错误信息
      res.send([{ "id": -1 }]);
    } else {
      res.send(response);
    }
  });
})

// 拼接sql语句
function toSelect(element, weapon, sex, rare, role) {
  var str = "select * from roule where ";
  if (element) {
    str += "element=" + element + " and ";
  }
  if (weapon) {
    str += "weapon=" + weapon + " and ";
  }
  if (sex) {
    str += "sex=" + sex + " and ";
  }
  if (rare) {
    str += "rare=" + rare + " and ";
  }
  if (role) {
    str += "genus='" + role + "' and ";
  }
  return str + "1=1 order by id desc";
}
module.exports = router;
