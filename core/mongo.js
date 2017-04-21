const config = require('../config'),
  mongoose = require('mongoose'),
  debug = require('debug')('app:mongoDB'),
  DB_URL = config.mongodb.host + config.mongodb.port + '/' + config.mongodb.database;

/**
 * 连接
 */
const db = mongoose.connect(DB_URL);

/**
  * 连接成功
  */
db.connection.on('connected', function () {
    debug('Mongoose连接 开启地址：' + DB_URL);
});

/**
 * 连接异常
 */
db.connection.on('error',function (err) {
    debug('Mongoose连接 错误：' + err);
});

/**
 * 连接断开
 */
db.connection.on('disconnected', function () {
    debug('Mongoose连接 断开');
});

module.exports = db
