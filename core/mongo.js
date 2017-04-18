const mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/news',
    debug = require('debug')('app:mongoDB')

/**
 * 连接
 */
var db = mongoose.connect(DB_URL);

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
