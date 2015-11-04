
React = require('react')
Datum = require('./datum')


###
  For like text!  See also Datum

  the Datum base class does most of the work by default of handling text, but for JSX
  beauty, let's create an extension specifically for text data
###
class Text extends Datum
  @displayName: "widgets.react.Text"


  render: ->
    super    # for breakpoint debugging
