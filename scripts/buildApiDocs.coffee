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
moduleData = documentor.processFiles('src/')

datumClasses = []
otherClasses = []

for klass in moduleData.classes
  if klass.file? && strHelp.startsWith(klass.file, "src/datums/")
    datumClasses.push klass
  else
    otherClasses.push klass
    
headerHtml = headerTemplate(relativeRoot: '../..', selectedItem: 2)

indexHtml = indexTemplate(
  relativeRoot: '../..'
  header: headerHtml
  content: ReactDOMServer.renderToString(
    React.createElement(ApiDocs, {datumClasses: datumClasses, otherClasses: otherClasses})
  )
  bodyClass: 'api-index'
)

fs.writeFileSync "docs/api/index.html", indexHtml

