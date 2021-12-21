/*
 * @Author: your name
 * @Date: 2021-12-14 10:01:06
 * @LastEditTime: 2021-12-20 13:54:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Drill\Backend\nodeJs\server.js
 */
var express = require("express");
var query = require("./lib/mysql.js");
//const cors = require('cors')

var app = express();
// app.use(cors())

app.get("/jeecg-boot/meituan/meituanDiscount/mobile/list", function (req, res) {
  // 解析 url 参数
  var params = req.query;
  var offset = params.pageNo * params.pageSize;
  var rows = params.pageSize;
  var sql = "select id, product, current_price as currentPrice, old_price as oldPrice, picture from meituan_discount limit " + offset + "," + rows;
  console.log("sql:", sql);

  query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.set('Content-Type','text/plain') 
      res.send(result);
    }
  });
});

app.listen(8082);
