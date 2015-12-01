#!/usr/bin/env coffee

React = require('react')
ReactDOMServer = require('react-dom/server')

require('coffee-react/register') #  jit compile .coffee and .cjsx on require

fs = require('fs')
path = require('path')
_ = require('underscore')
marked = require('marked')
nsh = require('node-syntaxhighlighter')
language =  require('jsx-syntaxhighlighter')

TARGET = "docs/api/index.html"

# marked is a markdown to html converter
marked.setOptions(
  highlight: (code) ->
    nsh.highlight(code, language) 
)

Documentor = require('../src/docs/api/documentor')
ApiDocs = require('../src/docs/api/apiDocs')

strHelp = require('../src/lib/stringHelpers')

indexTemplate = _.template(fs.readFileSync('src/docs/api/index.tpl').toString())
headerTemplate = _.template(fs.readFileSync('src/docs/header.tpl').toString())

documentor = new Documentor()
datumClasses = documentor.processFiles('src/datums/').classes
otherClasses = documentor.processFiles('src/', {}, {recursive: false}).classes

headerHtml = headerTemplate(relativeRoot: '../..', selectedItem: 2)

indexHtml = indexTemplate(
  relativeRoot: '../..'
  header: headerHtml
  content: ReactDOMServer.renderToString(
    React.createElement(ApiDocs, {datumClasses: datumClasses, otherClasses: otherClasses})
  )
  bodyClass: 'api-index'
)
console.log "creating #{TARGET}"
fs.writeFileSync TARGET, indexHtml

