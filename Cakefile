
child_process = require 'child_process'
fs = require 'fs'
util = require './scripts/lib/util'

console.log "Running on #{process.platform}"
util.npmInstall()
console.log("")   # add a newline just because it looks nicer


task 'build', 'Build & create distribution packages', ->
  util.systemCmd 'grunt build'


task 'clean',  'delete all compiled js - doc/examples, dist/react-datum', ->
  util.systemCmd 'grunt clean'


task 'watch', 'watch source files and examples and build when changed', ->
  invoke 'unwatch'
  invoke 'build'
  # hard to do from within grunt
  util.systemCmd("grunt watch >coffee.log 2>&1 & echo $! > watch.pid")
  console.log 'now watching for changes: `tail -f coffee.log`. stop watching with `cake unwatch`'


task 'unwatch', 'Stop background watcher spawned via `cake watch`', ->
  # another thing you can't really do with grunt
  if fs.existsSync 'watch.pid'
    util.systemCmd("kill -9 `cat watch.pid`", failOnError: false)
    fs.unlinkSync 'watch.pid'
  else
    console.log 'not currently watching'
