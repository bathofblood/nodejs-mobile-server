/*
 * @Author: your name
 * @Date: 2021-12-14 10:32:42
 * @LastEditTime: 2021-12-21 14:32:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Drill\Backend\nodeJs\mysql.js
 */
var mysql = require("mysql");

// 创建连接池
var pool = mysql.createPool({
  host: "jeecg-boot-mysql",
  user: "root",
  password: "123456",
  database: "jeecg-ibm",
  port: 3305,
});

// 查询方法
var query = function (sql, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log("[CONNECT MYSQL ERROR] - ", err.message);
    } else {
      // 查询
      conn.query(sql, function (qerr, result) {
        if(qerr){
          console.log("[SELECT ERROR] - ", qerr.message);
        }
        var dataString = JSON.stringify(result);
        console.log("result Json:" + dataString);
        //事件驱动回调
        callback(qerr, result);
      });
      //释放连接
      conn.release();
    }
  });
};

module.exports = query;
