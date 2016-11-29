
React = require('react')
_ = require('underscore')

Text = require('./text')


###
  see ./label.md
###
module.exports = class Label extends Text
  @displayName: "react-datum.Label"

  render: ->
    super    # for breakpoint debugging


  renderValueForDisplay: ->
    superVal = super
    
    labelProps = {}
    tooltip = @getPropOrMetadata('tooltip')
      
    label = if superVal?
      @renderWithPopover(<label {... labelProps}>{superVal}</label>, tooltip, 'datumLabelTooltip', 'datum-tooltip')
    else
      null
    
    return label
    
    
  getModelValue: (newProps = @props, newContext = @context) ->
    if @props.children?
      return @props.children
    
    return super
    


  