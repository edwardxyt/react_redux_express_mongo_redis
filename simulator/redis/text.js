const express = require( 'express' );
const path = require('path')
const router = express.Router();
const _ = require('lodash');
const redis = require('redis');

const client = require(path.relative(__dirname, REDIS));
const api = require(path.relative(__dirname, API_USER));

/**
 * redis 测试接口
 */
module.exports = router.get( '/redis/text', ( req, res, next ) => {
  // client.set('author', 'Wilson', function(){
  //   console.log('author 写入成功!');
  //   client.quit();
  // });
  //
  // client.get('author', function(err, author){
  //   if(err)
  //   {
  //       console.log('Error:'+ err);
  //       return;
  //   }
  //
  //   res.json({
  //       success: true,
  //       result: _.random(1,9999),
  //       author: author
  //     });
  //
  //   client.quit();
  // });

  // ------------------------------------------------------------------------
  // redis.print：简便的回调函数，测试时显示返回值（从示例的输出结果中可以看出）
  // client.options.no_ready_check：默认值为false,当连接到一台redis服务器时，服务器也许正在从磁盘中加载数据库，当正在加载阶段，redis服务器不会响应任何命令，node_redis会发送一个“准备确认”的INFO命令，INFO命令得到响应表示此时服务器可以提供服务，这时node_redis会触发"ready"事件，如果该设置项设置为true，则不会有这种检查
  // client.hmset(hash, obj, [callback])：赋值操作，第一个参数是hash名称；第二个参数是object对象，其中key1:value1。。,keyn:valuen形式；第三个参数是可选回调函数
  // client.hmset(hash, key1, val1, ... keyn, valn, [callback])：与上面做用一致，第2个参数到可选回调函数之前的参数都是key1, val1, ... keyn, valn形式；
  // client.hgetall(hash, [callback])：获取值操作，返回一个对象
  // client.expire('short', 3); 3秒后 short失效
  // Redis TTL 命令以秒为单位返回 key 的剩余过期时间。
  // ------------------------------------------------------------------------
  // client.hmset('short', {'js':'javascript','C#':'C Sharp'}, function(){
  //   console.log('short 写入成功!');
  //   client.quit();
  // });
  // client.hmset('short', 'SQL','Structured Query Language','HTML','HyperText Mark-up Language', function(){
  //   console.log('redis 更新成功!');
  //   client.quit();
  // });
  // client.expire('short', 3);
  // client.ttl('short', function(err, data){
  //   console.log('I live for this long yet: ' + data);
  // })

  // client.hgetall("short", function(err, short){
  //     if(short){
  //       res.json({
  //           success: true,
  //           result: _.random(1,9999),
  //           short: short
  //       });
  //     }else {
  //       console.log('Error:'+ err);
  //     }
  //     client.quit();
  // });


  // ------------------------------------------------------------------------
  // client.sadd(key,value1,...valuen,[callback])：集合操作，向集合key中添加N个元素，已存在元素的将忽略；redis2.4版本前只能添加一个值
  // client.multi([commands])：这个标记一个事务的开始，由Multi.exec原子性的执行；github上描述是可以理解为打包，把要执行的命令存放在队列中，redis服务器会原子性的执行所有命令，node_redis接口返回一个Multi对象
  // sismember(key,value,[callback])：元素value是否存在于集合key中，存在返回1，不存在返回0
  // smembers(key,[callback])：返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
  // client.quit()：与之对应的还有一个client.end()方法，相对比较暴力；client.quit方法会接收到所有响应后发送quit命令，而client.end则是直接关闭；都是触发end事件
  // redis.print：简便的回调函数，测试时显示返回值（从示例的输出结果中可以看出）
  // ------------------------------------------------------------------------
  // var key = 'skills';
  // client.sadd(key, 'C#','java');
  // client.sadd(key, 'nodejs');
  // client.sadd(key, "MySQL");
  //
  // client.multi()
  //   .sismember(key,'php')
  //   .smembers(key)
  //   .exec(function (err, replies) {  //replies 回复
  //         console.log("MULTI got " + replies.length + " replies");
  //         replies.forEach(function (reply, index) {
  //             console.log("Reply " + index + ": " + reply.toString());
  //         });
  //
  //         res.json({
  //           success: true,
  //           result: _.random(1,9999)
  //         });
  //
  //         client.quit();
  // });
});
