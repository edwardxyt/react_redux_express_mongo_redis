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
module.exports = router.put( '/user/updateUser', ( req, res, next ) => {
  var user = {
		username : req.body.username,
		password: req.body.password,
    avatar: req.body.avatar,
    age : req.body.age,
    description: req.body.description,
		email: req.body.email,
    github: req.body.github,
    Update: _.now()
	};

  api.update({ username: user.username}, user)
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
});
