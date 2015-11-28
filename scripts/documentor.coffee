#!/usr/bin/env coffee

HELP = """
  This script walks a tree of coffeescript and pulls out any ### comments and
  associates them with the next indent level out and up.  A .js file containing
  an array with the structure below is produced.
"""
MORE_HELP = """
  Example  (src/somefile.coffee):
    
  ###
    This block comment gets associated with the class
  ###
  class myAwesomeClass extends myAwesomeBaseClass
    
    @propTypes:
      # additional css classes (space seperated) to add to wrapper div
      className: React.PropTypes.string
      # can also accept model instance as context var. prop has precendence
      model: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Backbone.Model)
        React.PropTypes.object
      ])
        
    
    @defaultProps:   
      # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
      ellipsizeAt: 35
    
    ###
      this block comment gets associated with the constructor method.  putting it after
      the defaulting of options makes the options self documenting no?
    ###
    constructor: (options={}) =>
      @options = _.defaults options,
        # everything from this comment down will be associated with the constructor 
        # method as "defaultOptions"
        beAwesome: true                   # will this instance be awesome?
        extendAwesomeness: true           # push awesomeness outward
        forcedAwesome: false              # can we fake it if all else fails?
        awesomeIcon: "/img/awesome.icon"

  From the root directory:

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
  .option('-v --verbose', 'I like lots of output')
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
path = require('path')
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

debugger

class Documentor 
  # comments get handled first, if we are in a comment, then 
  commentRegex: /\#\#\#/g
  methodRegex: /^\s*((this\.|\@)*[\w\.]*)\s*[\:\=]\s*\((.*)\).*/
  classRegex: /^.*class\s*([\w\.]+)\s*(extends(.*))?\s*$/
  propTypesRegex: /^(\s*).*[\@\.]propTypes.*$/
  contextTypesRegex: /^(\s*).*[\@\.]contextTypes.*$/
  defaultPropsRegex: /^(\s*).*[\@\.]defaultProps.*$/
  defaultOptionsRegex: /^.*\_\.defaults.*options.*$/
  
  
  processFile: (file) =>
    console.log "Processing #{file}..."

    @currentFile = null
    @currentClass = null

    @lastClassIndex = null
    @lastMethodIndex = null
    
    @inComment = false
    @lastComments = []
    
    @inBlock = null  # whould be which block by name
    
    @handleSideFileComments(file)
    
    lines = fs.readFileSync(file).toString().split("\n");
    for line, lineNumber in lines
      continue unless line?
      continue if @handlePropTypes(line)
      continue if @handleDefaultProps(line)
      continue if @handleContextTypes(line)
      continue if @handleComment(line)
      continue if @handleClass(line, lineNumber, file)
      continue if @handleMethod(line, lineNumber, file)
      continue if @handleDefaultOptions(line)
      
  
  # returns the last unclaimed comment found
  claimComment: () =>
    comments = @lastComments
    @lastComments = []
    return comments
    
    
  # the first class comment in file can be pulled in from a file of the same
  # name with the .md extension
  handleSideFileComments: (file) =>
    ext = path.extname(file)
    mdFile = file.slice(0, -1 * ext.length) + ".md"
    if fs.existsSync(mdFile)
      console.log("found sidefile comments: #{mdFile}") if options.verbose
      @lastComments = fs.readFileSync(mdFile).toString().split("\n")
      
      
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
    
      
  handlePropTypes: (line) =>
    if @currentClass 
      return @_handleBlockType(line, @propTypesRegex, @currentClass, 'propTypes')
    return false
    
    
  handleDefaultProps: (line) =>
    if @currentClass 
      return @_handleBlockType(line, @defaultPropsRegex, @currentClass, 'defaultProps')
    return false
    
    
  handleContextTypes: (line) =>
    if @currentClass 
      return @_handleBlockType(line, @contextTypesRegex, @currentClass, 'contextTypes')
    return false
    
    
  handleDefaultOptions: (line) =>
    if @currentMethod 
      return @_handleBlockType(line, @defaultOptionsRegex, @currentMethod, 'defaultOptions')
    return false
    
    
    
  _handleBlockType: (line, regex, storageObj, type) =>
    if @inBlock == type
      matches = line.match /^(\s*).*$/
      return true unless matches?.length > 1
      whitespace = matches[1]
      if whitespace.length > (@currentWhiteSpace?.length || 0)
        storageObj[type] ||= []
        storageObj[type].push line
      else
        @inBlock = null
        @currentWhitespace = null
        return false
        
      return true;
    
    else 
      matches = line.match(regex)
      if matches?.length > 0
        @inBlock = type
        @currentWhiteSpace = matches[1]
        return true
    
    return false
    
    
  handleClass: (line, lineNumber, file) =>
    matches = line.match(@classRegex)
    return false unless matches?.length > 0
    comment = @claimComment()
    @createClassRecord(matches[1], matches[3], comment, line, lineNumber, file)
    
    
  handleMethod: (line, lineNumber, file) =>
    matches = line.match(@methodRegex)
    name = matches?[1]
    return false unless matches?.length > 0 && name[0] != '_' 
    comment = @claimComment()
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
    @currentMethod =
      id: _.uniqueId("dd_")
      name: name
      comment: comment
      lineNumber: lineNumber
      file: file
      signature: line
      
    if @currentClass
      @currentClass.methods.push @currentMethod
    else 
      moduleData.methods.push @currentMethod


updateDocumentorData = () =>
  module = _.find documentorData, (m) -> m.name == moduleName
  if module
    _.extend module, moduleData
  else
    documentorData.push moduleData
    

filterDocumentorData = () =>
  for module in documentorData
    unless options.allClasses
      module.classes = _.filter module.classes, (c) -> c.comment.length > 0
    for klass in module.classes
      unless options.allMethods
        klass.methods = _.filter klass.methods, (m) -> m.comment.length > 0
      
            
createOutputFile = () =>
  updateDocumentorData()
  filterDocumentorData()
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

