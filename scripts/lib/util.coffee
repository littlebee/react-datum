
child_process = require "child_process"
request = require("request")
_ = require 'underscore'

HOME_DIR = process.env.HOME

systemCmd = (cmd, options={}) ->
  options = _.defaults options,
    failOnError: true

  console.log "$ " + cmd
  try
    out = child_process.execSync(cmd)
    process.stdout.write out
  catch e
    console.error e.stdout.toString()
    if options.failOnError
      throw e




handleError = (error) ->
  return unless error
  console.error(error)
  process.exit(1)

installBashSource = (options) ->
  console.log "downloading bash source script from #{options.url}"
  request options.url, (error, response, body) ->
    handleError error
    console.log "creating / updating #{options.localFile}"
    fs.writeFile options.localFile, body, handleError
    unless options.tag in fs.readFileSync("#{HOME_DIR}/.bash_profile").toString().split('\n')
      console.log "updating .bash_profile"
      fs.appendFile "#{HOME_DIR}/.bash_profile", "\n#{options.tag}\nsource #{options.localFile}\n", handleError


module.exports =
  systemCmd: systemCmd
  handleError: handleError
  installBashSource: installBashSource
