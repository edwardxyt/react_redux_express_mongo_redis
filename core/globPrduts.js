const path = require('path')
const fs = require('fs')
const glob = require('glob')

const globSync = (url) => {
  let apis = glob.sync(url);
  let globFiles = [];
  apis.map(function(elem, index) {
    let fileName = elem.slice(elem.lastIndexOf('/')+1)
    globFiles.push(fileName)
  })
  if(globFiles.length>0){
    return globFiles
  }else {
    return '没有匹配到结果！'
  }
}
const globPromise = (url) => {
  return new Promise(function(resolve, reject) {
    let apis = glob(url, {matchBase:true}, (er, files) => {
      let globFiles = [];

      files.forEach((file) => {
        let fileName = file.slice(file.lastIndexOf('/')+1)
        globFiles.push(fileName)
      });

      if(globFiles.length>0){
        resolve(globFiles);
      }else {
        reject('没有匹配到结果！')
      }
    });
  });
}

module.exports = {
  globSync,
  globPromise
};
