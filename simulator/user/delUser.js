const express = require( 'express' );
const path = require('path')
const router = express.Router();
const _ = require('lodash');
const redis = require('redis');

const client = require(path.relative(__dirname, REDIS));
const api = require(path.relative(__dirname, API_USER));

/**
 * 更新用户信息
 */
module.exports = router.delete( '/user/delUser', ( req, res, next ) => {
  var user = {
		username : req.body.username
	};

  api.findOne(user)
		.then(result => {
			if (result !== null) {
        api.remove({ username: user.username})
      		.then(result => {
            res.json({
              success: true,
              result: result
            });
            client.del('data', function (err, reply) {
              if (err) return false;
              console.log(reply);     // 删除成功，返回1，否则返回0(对于不存在的键进行删除操作，同样返回0)
            });
      		})
			}else {
        res.json({
          success: true,
          result: '删除失败，没有该用户！'
        });
      }
		})
});
