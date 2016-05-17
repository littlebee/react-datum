
React = require('react')
_ = require('underscore')

Datum = require('./datum')


###
  see ./text.md
###
module.exports = class Text extends Datum
  @displayName: "react-datum.Text"

  
  @propTypes: _.extend {}, Datum.propTypes,
    # set to true if rendering known, safe, html.  see https://facebook.github.io/react/tips/dangerously-set-inner-html.html. 
    displayAsHtml: React.PropTypes.bool
    
    # set ellipsizeAt to false to display whole value. Only effects 'readonly' display
    # values displayed in 'edit' mode are never truncated.
    ellipsizeAt: React.PropTypes.oneOfType([
      React.PropTypes.number
      React.PropTypes.bool
    ])
    # If we want the ellipsis to be like ...Long Name we need to make this true
    reverseEllipsis: React.PropTypes.bool

  @defaultProps: _.extend {}, Datum.defaultProps,
    # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
    ellipsizeAt: 35
    reverseEllipsis: false
    

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