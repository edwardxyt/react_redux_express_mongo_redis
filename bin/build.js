#!/usr/bin/env node
const name = process.argv[2]
const exec = require('child_process').exec
const shell = require("shelljs")

shell.exec("echo hello " + name)

const child = exec('echo hello ' + name, function(err, stdout, stderr) {
  if (err) throw err
  shell.echo(stdout)
  shell.echo({ ip: process.env.npm_config_ip })
  // shell.echo(shell.cat('/Users/edward/workspaces/gm-web/package.json'))
})

// build world

// 不输出npm命令头
// npm -s --ip=192.168.0.140:9090 run ip
