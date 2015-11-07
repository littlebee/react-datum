
child_process = require "child_process"
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


module.exports =
  systemCmd: systemCmd
  handleError: handleError
