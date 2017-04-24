const express = require( 'express' );
const path = require('path')
const router = express.Router();
const _ = require('lodash');
const redis = require('redis');
const request = require('request');

const client = require(path.relative(__dirname, REDIS));
const api = require(path.relative(__dirname, API_USER));

/**
 * 查询用户
 */
module.exports = router.get( '/user/findAll', ( req, res, next ) => {
  if (!req.session.user) {
    console.log('error', '未登录!');
  }else {
    console.log('success', '已登录!');
  }

  request.get('http://www.baidu.com', function (error, response, body) {
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });

  req.session.user = {  //用户信息存入 session
        name:"Chen-xy",
        age:"22",
        address:"bj"
    };
  client.lrange('data', 0, -1 , function(err, list){
    if(list.length > 0){
      console.log('redis');

      res.json({
        success: true,
        session: req.session.user,
        result: JSON.parse(list)
      });
    }else {
      api.find({},{username:1, age:1, _id:0})
    		.then(result => {
          console.log('mongodb');

          res.json({
            success: true,
            result: result
          });

          client.rpush('data', JSON.stringify(result), function(){
            console.log('findAll 写入成功!');
          });
          client.expire('data', 60);
          client.ttl('data', function(err, data){
            console.log('I live for this long yet: ' + data);
          })
    		})
    }
  });


  /**
   * 返回所有用户
   * {} null {}
   */
	// api.find({})
	// 	.then(result => {
  //     res.json({
  //         success: true,
  //         result: result
  //       });
	// 	})

  /**
   * 返回只包含一个键值name、age的所有记录
   * {} { username: 1, age: 1, _id: 0 } {}
   * 说明：我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回，如果不要显示加上("_id":0)，但是，对其他不需要显示的属性且不是_id，
   */
	// api.find({},{username:1, age:1, _id:0})
	// 	.then(result => {
  //     res.json({
  //       success: true,
  //       result: result
  //     });
	// 	})

  /**
   * 返回所有age大于18的数据
   * { age: { '$gt': 18 } } null {}
   */
	// api.find({"age":{"$gt":18}})
	// 	.then(result => {
  //     res.json({
  //         success: true,
  //         result: result
  //       });
	// 	})

  /**
	 * 返回20条数据
	 * {} null { limit: 20 }
	 */
	// api.find({},null,{limit:20})
	// 	.then(result => {
  //     res.json({
  //         success: true,
  //         result: result
  //       });
	// 	})

  /**
	 * 查询所有数据，并按照age降序顺序返回数据
	 * {} null { sort: { age: -1 } }
	 */
	// api.find({},null,{sort:{age:-1}}) //1是升序，-1是降序
	// 	.then(result => {
  //     res.json({
  //         success: true,
  //         result: result
  //       });
	// 	})
});
