#!/usr/bin/env coffee

glob = require('glob')
fs = require('fs')
path = require('path')
nsh = require('node-syntaxhighlighter')
language =  require('jsx-syntaxhighlighter')
_ = require('underscore')
moment = require('moment')

###
  This script generates a small HTML wrapper around each example in
  EXAMPLE_SRC_DIR that will show the source left and the result of
  executing the example on the right

  Results are written to corresponding directory in EXAMPLE_TARGET_DIR

  I broke from using react because I didn't want a build step to
  prebuild a build step and a plain coffeescript file can be run
  from the command line

###

EXAMPLE_SRC_DIR = 'src/examples'
EXAMPLE_TARGET_DIR = 'docs/examples'

rawTemplate = fs.readFileSync('scripts/lib/exampleFile.tpl')
exampleTemplate = _.template(rawTemplate.toString())

unless 'grunt' in process.argv
  throw "You should probably use `grunt examples` instead - which first builds the example " +
    "source into docs/examples.  this only creates the .html file for the examples"


processFile = (file) ->
  ext = path.extname(file)
  simpleName = path.basename(file, ext)
  relativePath = path.dirname(file).slice(EXAMPLE_SRC_DIR.length)
  return unless ext in [".coffee", ".js", ".jsx", ".cjsx"]

  rawSource = fs.readFileSync(file).toString()
  # console.log rawSource
  highlightedSource = nsh.highlight(rawSource, language) || rawSource

  templateArgs =
    sourceCode: highlightedSource
    # the example source compile from src/examples into respective
    # directories in docs/examples.   The compiled .js should already be there
    # as compiled there by `grunt`
    sourceFile: simpleName + '.js'

  fullOutPath = path.join(EXAMPLE_TARGET_DIR, relativePath, simpleName + '.html')
  exists = fs.existsSync(fullOutPath)
  if exists
    srcMtime = moment(fs.statSync(file).mtime)
    targetMtime = moment(fs.statSync(fullOutPath).mtime)
  if !exists || srcMtime.isAfter(targetMtime)
    console.log "processing file: " + file
    fs.writeFileSync fullOutPath, exampleTemplate(templateArgs)


files = glob.sync(EXAMPLE_SRC_DIR + '/**/*', {nodir: true})
files.forEach(processFile)
