// 配置后端API地址前缀
const PREFIX_API = '/api';
const HOST = {
  LOCAL: 'http://localhost:3000',
  REMOTE: 'http://192.168.140.72:8091',
  RELEASE: 'http://192.168.140.72:8091'
};

const PLATFORM = {
  LOCAL: `${HOST.LOCAL}${PREFIX_API}`,
  REMOTE: `${HOST.REMOTE}${PREFIX_API}`,
  RELEASE: `${HOST.RELEASE}${PREFIX_API}`
};

// 配置后端API地址前缀
let API_HOST;

if (__DEV__) {
  API_HOST = PLATFORM.LOCAL;
  console.info('  -->   sim/本地开发，模拟api环境，【本地】接口, API_HOST: %s/...', API_HOST);
} else if (__PROD__) {
  API_HOST = PLATFORM.REMOTE;
  console.info('  -->   dev/开发环境，【后台】接口, API_HOST:%s/...', API_HOST);
} else if (__TEST__) {
  API_HOST = PLATFORM.RELEASE;
  console.info('  -->   release/!!!正式发布环境, API_HOST: %s/...', API_HOST);
}

window['API_HOST'] = API_HOST;

module.exports = {
  API_HOST
}
