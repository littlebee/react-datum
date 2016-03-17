
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
    
    
  @defaultProps: _.extend {}, Datum.defaultProps,
    target: '_blank'
    

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
    

  _getTagContent: ->
    if @props.nameAttr?
      return @getModel().get(@props.nameAttr)
    else if @props.children?
      return <span>{@props.children}</span>
    else
      return @getModelValue()
