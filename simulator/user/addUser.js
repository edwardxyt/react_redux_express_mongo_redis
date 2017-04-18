const express = require( 'express' );
const path = require('path')
const router = express.Router();
const _ = require('lodash');

const api = require(path.relative(__dirname, API_USER));

/**
 * 添加新用户
 */
module.exports = router.post( '/user/addUser', ( req, res, next ) => {
  var user = {
		username : req.body.username,
		password: req.body.password,
		email: req.body.email
	};

  api.findOne({ username: user.username})
		.then(result => {
			if (result !== null) {
        res.json({
                success: false,
                result: '账户已存在！'
              });
			}else {
        api.save(user)
          .then(result => {
            res.json({
                success: true,
                result: result
              });
          })
      }
		})
});
