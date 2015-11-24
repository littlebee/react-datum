#!/usr/bin/env coffee

fs = require('fs')
path = require('path')
_ = require('underscore')
marked = require('marked')
highlight = require('highlight.js')

# marked is a markdown to html converter
marked.setOptions(
  highlight: (code) ->
    return highlight.highlightAuto(code).value;
)

### 
  This script generates the docs/index.html file
###

DOCS_SRC_DIR = 'src/docs'
DOCS_TARGET_DIR = 'docs'

indexTemplate = _.template(fs.readFileSync('src/docs/index.tpl').toString())
headerTemplate = _.template(fs.readFileSync('src/docs/header.tpl').toString())

unless 'grunt' in process.argv
  throw "You should probably use `grunt docs` instead"

readmeHtml = marked(fs.readFileSync('README.md').toString())
headerHtml = headerTemplate(relativeRoot: '..', selectedItem: 0)
indexHtml = indexTemplate(relativeRoot: '..', header: headerHtml, readme: readmeHtml)
outPath = path.join(DOCS_TARGET_DIR, 'index.html')
console.log "creating #{outPath}"
fs.writeFileSync outPath, indexHtml


