
React = require('react')
_ = require('underscore')

Datum = require('./datum')


###
  see ./text.md
###
module.exports = class Text extends Datum
  @displayName: "react-datum.Text"

  
  @propTypes: _.extend {}, Datum.propTypes,
    displayAsHtml: React.PropTypes.bool
    # set ellipsizeAt to false to display whole value. Only effects 'readonly' display
    # values displayed in 'edit' mode are never truncated.
    ellipsizeAt: React.PropTypes.oneOfType([
      React.PropTypes.number
      React.PropTypes.bool
    ])

  @defaultProps: _.extend {}, Datum.defaultProps,
    # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
    ellipsizeAt: 35
    

  render: ->
    super    # for breakpoint debugging


  renderValueForDisplay: ->
    @renderEllipsizedValue super

  
  renderWrappedDisplayValue: (value)->
    if @props.displayAsHtml
      <span className="datum-display-value" dangerouslySetInnerHTML={@getMarkup(value)}/>
    else
      super
      

  getMarkup: (value) ->
    return {__html: value}