var express = require('express');
var router = express.Router();
var path = require('path');
var $mysql = require("mysql");
var sql = require("./mysql");

/* GET users listing. */
// 角色页面跳转
router.get('/:id', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/page', 'test.html'));
});

/**
 * 获取角色数据接口, 根据传进的ID 查找指定ID的数据。
 * 数据量： 最多且至少一条数据
 */
router.get('/roledata/:id', function (req, res, next) {
  var $sql = $mysql.createConnection(sql.picture); //创建连接
  $sql.connect(); //打开连接
  var select = "select * from roule where id=" + req.params.id;
  $sql.query(select, function (err, response) {
    $sql.end();// 关闭连接
    if (err) {
      console.log("错误", err);//我们打印出，错误信息
      res.send({ "id": "-1" });
    } else {
      res.send(response[0]);      
    }
  });
})
module.exports = router;
