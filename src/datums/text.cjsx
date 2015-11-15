
React = require('react')
_ = require('underscore')

Datum = require('./datum')


###
  For like text!  See also Datum

  the Datum base class does most of the work by default of handling text, but for JSX
  beauty, let's create an extension specifically for text data
###
module.exports = class Text extends Datum
  @displayName: "react-datum.Text"


  render: ->
    super    # for breakpoint debugging


  renderValueForDisplay: ->
    @renderEllipsizedValue super
