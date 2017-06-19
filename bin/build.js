#!/usr/bin/env node
var name = process.argv[2];
var exec = require('child_process').exec;
var shell = require("shelljs");

shell.exec("echo hello " + name);

var child = exec('echo hello ' + name, function(err, stdout, stderr) {
  if (err) throw err;
  console.log(stdout);
  console.log({ var: process.env.npm_config_var })
});


// npm --var=something run var
