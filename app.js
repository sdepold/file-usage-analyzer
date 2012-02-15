Array.prototype.unique = function() {
  var a=[];
  for (var b = 0; b < this.length; b++) {
    if(a.indexOf(this[b]) == -1) {
      a.push(this[b])
    }
  }
  return a
}

const fs      = require("fs")
    , file    = require("file")
    , logFile = process.env.LOGFILE
    , dir     = process.env.DIR
    , exec    = require('child_process').exec

var files = []

file.walkSync(dir, function(dirPath, dirs, _files) {
  _files.forEach(function(file) {
    files.push(dirPath + '/' + file)
  })
})

files = files.unique()

console.log(files.length)
exec('tail -n 1000000 ' + logFile, function(err, stdout, stderr) {
  var lines = stdout.split("\n")
  lines.forEach(function(line) {
    var match = line.match(/GET (.*?)[\?\s]/)

    if(match) {
      var filename = match[1]
        , absolute = dir + filename
        , index    = files.indexOf(absolute)

      files.splice(index + 1, 1)
    }
  })
  console.log(files.length)
})
