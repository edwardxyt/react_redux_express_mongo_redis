#!/usr/bin/env node
const name = process.argv[2]
const exec = require('child_process').exec
const shell = require("shelljs")
const debug = require('debug')('app:bin:build')

shell.exec("echo hello " + name)

const child = exec('echo hello ' + name, function(err, stdout, stderr) {
  if (err) throw err
  debug(stdout)
  debug({ ip: process.env.npm_config_ip })
})


// npm --ip=something run ip
