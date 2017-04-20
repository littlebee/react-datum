
React = require('react')
_ = require('underscore')

Datum = require('./datum')


###
  see ./link.md
###
module.exports = class Link extends Datum
  @displayName: "react-datum.Link"


  @propTypes: _.extend {}, Datum.propTypes,
    # attribute on model to display as the <a> content. if null ReactDatum.Link will 
    # render the children enclosed in an <a></a>
    nameAttr: React.PropTypes.string
    # passed to <a> as the target
    target: React.PropTypes.string
    
    # The link's content between the A tags can be ellisized.  Set ellipsizeAt to false 
    # to display whole value. Only effects 'readonly' display, values displayed 
    # in 'edit' mode are never truncated.
    ellipsizeAt: React.PropTypes.oneOfType([
      React.PropTypes.number
      React.PropTypes.bool
    ])

    # If we want the ellipsis to be like ...Long Name we need to make this true
    reverseEllipsis: React.PropTypes.bool

    #If you would like to show the url without the http/https, pass this prop as true
    hideProtocol: React.PropTypes.bool
    
    
    
  @defaultProps: _.extend {}, Datum.defaultProps,
    # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
    ellipsizeAt: 35
    target: '_blank'
    hideProtocol: false
    

  subClassName: 'link'

  # TODO add validations.

  # override
  renderValueForDisplay: () ->

    <a href={@_getHref()} target={@props.target}>
      {@_getTagContent()}
    </a>


  # Datum default renderForInput should should work

  _getHref: ->
    @getModelValue()
    

  _removeHttpForDisplay: ->
      value = @getModelValue()
      if value.indexOf('://') >= 3
        index = value.indexOf('://')+3
        value = value.slice(index)
      return value
    

  _getTagContent: ->
    if @props.nameAttr?
      contentValue = @getModel().get(@props.nameAttr)
      if _.isArray(contentValue)
        contentValue = contentValue.map((v) -> v.toString()).join(', ')
      return @renderEllipsizedValue(contentValue)
    else if @props.children?
      return <span>{@props.children}</span>
    else
      if @props.hideProtocol
        value = @_removeHttpForDisplay()
      else
        value = @getModelValue()
      return @renderEllipsizedValue(value)
