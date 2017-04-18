const express = require( 'express' );
const path = require('path')
const router = express.Router();
const _ = require('lodash');
var Mock = require('mockjs')

/**
 * 查询所有岗位
 */
module.exports = router.get( '/generator/getGuuid', ( req, res, next ) => {
  console.log('/generator/getGuuid');

  var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-4': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1
      }],
      "number1|1-100.1-2": 1,
      "number2|+1": 202,
      "boolean|1": true,
      "object|2-4": {
        "110000": "北京市",
        "120000": "天津市",
        "130000": "河北省",
        "140000": "山西省"
      },
      "array1|+1": [
        "AMD",
        "CMD",
        "UMD"
      ],
      "array2|3-4": [
        {
          "name|+1": [
            "Hello",
            "Mock.js",
            "!"
          ]
        }
      ],
      'id': '@natural',
      'data': '@date("yyyy-MM-dd")',
      'time': '@time("HH:mm:ss")'
  })

  res.cookie('name', 'edward');
  res.cookie('age', '32');
  res.json({
      success: true,
      data: data,
      result: _.random(1,9999)
    });
});
