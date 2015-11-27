#!/usr/bin/env coffee

HELP = """
  This script walks a tree of coffeescript and pulls out any ### comments and
  associates them with the next indent level out and up.  A .js file containing
  an array with the structure below is produced.
"""
MORE_HELP = """
  Example  (src/somefile.coffee):
    | # if I want to show something like the delaration of constant, e.g.
    | HELP = "this is a really neat script that does bla"
    | # I can just put it above the block comment and it will get sucked up into
    | # that thing's declaration (these single # comments also get sucked up).
    | ###
    |   This block comment will be associated with the file it could be empty
    |   if for example you wanted to just document that the file existed
    | ###
    |
    | class myAwesomeClass extends myAwesomeBaseClass
    |   ###
    |     This block comment gets associated with the class
    |   ###
    |
    |   constructor: (options={}) =>
    |     @options = _.defaults options,
    |       beAwesome: true                   # will this instance be awesome?
    |       extendAwesomeness: true           # push awesomeness outward
    |       forcedAwesome: false              # can we fake it if all else fails?
    |       awesomeIcon: "/img/awesome.icon"
    |     ###
    |       this block comment gets associated with the constructor method.  putting it after
    |       the defaulting of options makes the options self documenting no?
    |     ###

  From the root notjs directory:

    |  scripts/documentor.coffee ./src

  generates documentorData.js file in current directory that contains:

    |  var documentorData = [
    |    {
    |      "moduleName": "optional name given when running documentor or the path given to document",
    |      // both files and classes only have information in here if they are documented (have ###
    |      // comments at the same indentation level
    ...

  the output js file can then be loaded for a documentation page and a notjs script can pick it up and spit out the
  API documentation (see index.html in notjs root)

  Developer's note:  I really wanted to generate JSON data and pull that in from the script on the page,
  but then the documentation would only be viewable if served up remotely and I'd really like people to be
  able to view the API docs locally via a file:// url

  see --help output for options
"""

###

  Generates docs/documentorData.js  

###


options = require('commander')
  .version('0.0.1')
  .option('-o --outputFile [path]', 'output path and file name of file to generate [./documentorData.js]', './documentorData.js')
  .option('-n --name [name]', 'name to add to module in documentor data. defaults to src file path')
  .option('-c --allClasses)', 'add undocumented classes to documentorData')
  .option('-m --allMethods)', 'add undocumented methods to documentorData')
  .on('--help', () -> console.log HELP)

srcDir = null
options.command('*')
  .description('source dir')
  .action (arg) =>
    srcDir = arg
    # console.log 'arg = "%s"', arg
options.parse(process.argv)

unless srcDir
  console.log "fail: This script requires one parameter, the src dir, use --help for more information"
  process.exit(1);

_ = require('underscore')
fs = require('fs')
glob = require('glob')

# documentor only creates and updates modules in the existing file...
if fs.existsSync(options.outputFile)
  require(fs.realpathSync(options.outputFile))
else
  root.documentorData = []

moduleName = options.name || srcDir
moduleData =
  "id": _.uniqueId("dd_")
  "name":  moduleName
  "files": []
  "classes": []
  "methods": []

class Documentor 
  # comments get handled first, if we are in a comment, then 
  commentRegex: /\#\#\#/g
  methodRegex: /^\s*((this\.|\@)*[\w\.]*)\s*[\:\=]\s*\((.*)\).*/
  classRegex: /^.*class\s*([\w\.]+)\s*(extends(.*))?\s*$/


  processFile: (file) =>
    console.log "Processing #{file}..."

    @currentFile = null
    @currentClass = null

    @lastClassIndex = null
    @lastMethodIndex = null
    
    @inComment = false
    @lastComments = []
    
    lines = fs.readFileSync(file).toString().split("\n");
    for line, lineNumber in lines
      continue unless line?
      continue if @handleComment(line)
      continue if @handleClass(line, lineNumber, file)
      @handleMethod(line, lineNumber, file)
      
  
  # returns the last unclaimed comment found
  claimComment: () =>
    comments = @lastComments.join("\n")
    @lastComments = []
    return comments
    
    
  handleComment: (line) =>
    matches = line.match(@commentRegex)
    if @inComment
      if matches?.length > 0
        @inComment = false
      else
        @lastComments.push line
      return true
    else if matches?.length > 0
      # if there are opening and closing block comment on same line
      if matches.length > 1
        @lastComments.push line.replace(/\#\#\#/g, '')
      else
        @inComment = true
      return true
      
    return false
    
    
  handleClass: (line, lineNumber, file) =>
    matches = line.match(@classRegex)
    return false unless matches?.length > 0
    comment = @claimComment()
    if options.allClasses || comment.length > 0 
      @createClassRecord(matches[1], matches[3], comment, line, lineNumber, file)
    
    
  handleMethod: (line, lineNumber, file) =>
    matches = line.match(@methodRegex)
    name = matches?[1]
    return false unless matches?.length > 0 && name[0] != '_' 
    comment = @claimComment()
    if options.allMethods || comment.length > 0
      @createMethodRecord(name, comment, line, lineNumber, file)
    

  createClassRecord: (name, superClass, comment, line, lineNumber, file) =>
    @currentClass =
      id: _.uniqueId("dd_")
      name:    name
      comment: comment
      lineNumber: lineNumber
      file: file
      signature: line
      superClass: superClass
      methods: []
    moduleData.classes.push @currentClass


  createMethodRecord: (name, comment, line, lineNumber, file) =>
    method =
      id: _.uniqueId("dd_")
      name: name
      comment: comment
      lineNumber: lineNumber
      file: file
      signature: line
      
    if @currentClass
      @currentClass.methods.push method
    else 
      moduleData.methods.push method


updateDocumentorData = () =>
  module = _.find documentorData, (m) -> m.name == moduleName
  if module
    _.extend module, moduleData
  else
    documentorData.push moduleData

createOutputFile = () =>
  updateDocumentorData()
  console.log "creating #{options.outputFile}"
  output = "base = (typeof module !== 'undefined' && module.exports) ? root : window\n" +
           "base.documentorData = #{JSON.stringify(documentorData, null, "  ")};\n"
  fs.writeFile options.outputFile, output, (err) ->
    throw err if(err)

documentor = new Documentor()

if fs.lstatSync(srcDir).isDirectory()
  files = glob.sync(srcDir + "/**/*", nodir: true)
  for file in files
    documentor.processFile(file)
else
  documentor.processFile(srcDir)

createOutputFile()

