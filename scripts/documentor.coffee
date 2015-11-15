#!/usr/bin/env coffee

###
  NOTE:  Incomplete.   Work in progress / get back to it one day.  
  
  Want to make it work?  Please do and thank you.

###



HELP = """
  This script parses the lexer tokens produced by the coffeescript or cjsx compiler, finds
  block comments and associates them with the identifier that follows.  
  
  Suppose you have a source file called src/myAwesomeClass.coffee, like this:
  ```coffeescript
    ###
      This latest bit of my genius is a game changer
    ###
    class MyAwesomeClass extends MyAwesomeBaseClass
        
      # oh, this must be a react class
      @propTypes:
        ### can also accept model instance as context var. prop has precendence ###
        model: @modelOrObject()
        
        ###
          Makes this awesome uneditable
          
          Careful when using
        ###
        readonly: React.PropTypes.bool
        
        ### you can style a buttonPossiton: 'top' to float left or right in css. ###
        buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none'])
        
      
      @defaultProps:
        readonly: false
        buttonPosition: 'bottom'

        
      constructor: (options={}) ->
        @options = _.defaults options,
          awesomeIcon: "/img/awesome.icon"
          
        super

      ###
        This method is called to make the *awesome* happen.  
      ###
      renderAwesomeness: (model, options={}) ->
        @options = _.defaults options,
          # will this instance be awesome?   
          beAwesome: true                   
          # push awesomeness outward 
          extendAwesomeness: true           
          # can we fake it if all else fails? (this comment will not be picked up)
          forcedAwesome: false              
        
  ```
  
  From the root directory:
  ```
  scripts/documentor.coffee src/myAwesomeClass.coffee
  ```
  
  The output is a JSON file of data like this:
  ```json
  [{
    file:  "myAwesomeClass.coffee",
    classes: [{
        name: "MyAwesomeClass",
        comment:"\n        This latest bit of my genius is a game changer\n"
        signature: "class MyAwesomeClass extends MyAwesomeBaseClass"
        props: [{
          name: "model",
          comment: "can also accept model instance as context var. prop has precendence",
          default: "null"
        },{
          name: "readonly",
          comment: "     Makes this awesome uneditable\n\n    Careful when using"
        }],
        context: [{
          name: 'model',
          comment "this can also be accepted as a prop called model. prop has precendence"
        }],
        methods: [{
          name: "constructor",
          comment: "",
          arguments: [
            "options={}"
          ],
          options: [{
            name: "awesomeIcon",
            default: "/img/awesome.icon",
            comment: ""
          }]
        },{
          name: "renderAwesomeness",
          comment: "This method is called to make the *awesome* happen. "
          arguments: [
            "model",
            "options={}"
          ],
          options: [{
            name: "beAwesome",
            default: "true",
            comment: " will this instance be awesome?   "
          },{
            name: "extendAwesomeness",
            default: "true",
            comment:  "push awesomeness outward ""
          },{
            name: "forcedAwesome",
            default: "false",
            comment: ""
          }]
        }]
    }]
  }]
  ```
"""


cliOptions = require('commander')
  .version('0.0.1')
  .option('-o --outputFile [path]', 'output path and file name of file to generate [./documentorData.js]', './documentorData.js')
  .option('-n --name [name]', 'name to add to module in documentor data. defaults to src file path')
  .option('--raw',  'display unfiltered tokens')
  .on('--help', () -> console.log HELP)
  

srcDir = null
cliOptions.command('*')
  .description('source dir')
  .action (arg) =>
    srcDir = arg
    # console.log 'arg = "%s"', arg
cliOptions.parse(process.argv)

unless srcDir
  console.log "fail: This script requires one parameter, the src dir or file to parse comments from.\n " +
    "use --help for more information"
  process.exit(1);

_ = require('underscore')
fs = require('fs')
path = require('path')
glob = require('glob')
utils = require('./lib/util')

cjsxCompiler = "node_modules/coffee-react/bin/cjsx"
coffeeCompiler = "coffee"

COMMENT_TOKEN = "HERECOMMENT"
CLASS_TOKEN = "CLASS"
SIGNIFICANT_TOKENS = ["IDENTIFIER", 'EXTENDS', CLASS_TOKEN, COMMENT_TOKEN]

currentContainer = null
unclaimedComment = null
documentorData = []
tokens = []
tokensIndex = 0

processFile = (file) ->
  console.log "processing #{file}"
  unclaimedComment = null
  tokens = getParseTokens(file)
  tokensIndex = 0
  fileObject = 
    name: file
    classes: []
    methods: []
  
  console.log tokens
  
  # unclaimedComment = findNextComment()
  # 
  # documentorData.push fileObject
  
  
#findNextComment: ->
  # loop 
  #   token = tokens[tokensIndex]
  #   if token.slice
  #     #TODO : finish this one day
      
    
parseClasses = (tokens) ->
  classes = []
  tokenIndex = 0
  

getParseTokens = (file) ->
  ext = path.extname(file)
  switch ext 
    when ".coffee" then compiler = coffeeCompiler
    when ".cjsx" then compiler = cjsxCompiler
    else return
    
  compilerCmd = "#{compiler} --tokens #{file}"
  rawTokens = utils.systemCmd(compilerCmd, showOutput: false).toString()
  tokenArray = rawTokens[1..-2].split("] [") 
  unless cliOptions.raw
    tokenArray = _.filter tokenArray, (token) -> token.split(' ')[0] in SIGNIFICANT_TOKENS
    
  return tokenArray
  

createOutputFile = () ->
  console.log "creating #{cliOptions.outputFile}"
  output = "base = (typeof module !== 'undefined' && module.exports) ? root : window\n" +
           "base.documentorData = #{JSON.stringify(documentorData, null, "  ")};\n"
  fs.writeFile cliOptions.outputFile, output, (err) ->
    throw err if(err)


if fs.lstatSync(srcDir).isDirectory()
  files = glob.sync(srcDir + "/**/*", nodir: true)
  files.forEach processFile
else
  processFile(srcDir)

createOutputFile

