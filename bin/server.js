const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin/server')
const port = config.server_port

server.listen(port)
debug(`服务器运行在 http://${config.server_host}:${port}`)
