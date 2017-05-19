// 这里是您可以基于执行环境定义配置覆盖的位置。
// 提供一个键到与要定向的NODE_ENV匹配的默认导出，以及
// 基本配置将在导出自身之前应用您的覆盖。
module.exports = {
  // ======================================================
  // Overrides 覆盖 when NODE_ENV === 'development'
  // ======================================================
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`
  }),

  // ======================================================
  // Overrides 覆盖 when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}
