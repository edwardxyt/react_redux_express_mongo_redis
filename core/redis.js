const debug = require('debug')('app:redis')
const setting = require('../config').redis;
const redis = require('redis'),
    client = redis.createClient(setting.port, setting.host, setting.options);

client.auth(setting.password,function(){
  debug('密码******通过认证');
});

client.on('ready', function(err,res){
  if(err)
  {
      debug('Error:'+ err);
      return;
  }else {
    debug('redis 准备就绪!');
  }
});

client.info(function(err,response){
  debug('redis info!');
});

// ------------------------------------------------------------------------
// connect：Redis的Connection事件之一，在不设置client.options.no_ready_check的情况下，客户端触发connect同时它会发出ready，如果设置了client.options.no_ready_check，当这个stream被连接时会触发connect，这时候就可以自由尝试发命令
// ------------------------------------------------------------------------
client.on('connect',function(){
  debug('redis connect!');
});

client.on('end',function(err){
  debug('redis 结束！');
});

client.on('error',function(error){
  debug('Error:' + error);
});

module.exports = client
