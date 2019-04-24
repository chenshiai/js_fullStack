var connction = {};
connction.picture = {
  host: "localhost",           //这是数据库的地址
  user: "root",                  //需要用户的名字
  password: "asd5288837",            //用户密码 ，如果你没有密码，直接双引号就是
  database: "picturebook"           //数据库名字
}

//好了，这样我们就能连接数据库了

module.exports = connction;