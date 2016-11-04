
React = require('react')
Number = require('./number')

###
  This datum is an extension of [ReactDatum.Number](http://zulily.github.io/react-datum/docs/api/#Number) for
  display and input of percent values.   
  
  - Display value is affixed with '%' 
  - Display and input value are model value * 100 (model value is assumed to be 
  fractional value)
  - User input is assumed to be number percentage (* 100)
  - props.decimalPlaces is respected for both display and input


  Number datum has (maybe use to have) a format called  'percent' that will also
  do a little part of what Percent datum does.  The Percent datum is meant to 
  supercede 'percent' format to Number datum.

###
module.exports = class Percent extends Number
  @displayName: "react-datum.Percent"

  ###
    Model value returned is multiplied by 100.  Internal value for Percent
    is always the whole number displayed percentage rounded to requested
    decimal places.
  ###
  getModelValue: () ->
    superValue = super
    return superValue if !superValue?
    
    return @roundToDecimalPlaces(Number.safelyFloat(superValue) * 100)
    
    
  ###
    What get's saved to the model is the user entered value divided by 100  
  ###
  setModelValue: (value=@getInputValue(), options={}) ->
    return unless value?   # value == null means the user didn't change it
    value ||= 0
    floatValue = Number.safelyFloat(value) / 100
    return super(floatValue, options)
    
    
  ###
    Other formats like 'money' and 'abbreviate' are ignored.  Override react-datum.Money
  ###
  getFormats: () ->
    #   TODO: do a better job of this, allow or restrict only those formats from 
    #         super that are in conflict.   If someone wants to show 1000 percent then
    #         they may need 'comma'
    # superFormats = super
    # if superFormats.length > 0
    #   # use error to give a stack trace
    #   console.error 'react-datum.Percent is not compatible with other number formats like: ' + 
    #     JSON.stringify(superFormats) + '.  Ignoring.'
    return []
    
  
  ###
    Renders value for display as nn.n%.
    
    Base number has (maybe use to have) a format called  'percent' that will also
    do this little part of it.  The Percent datum is meant to supercede 'percent' 
    format to Number datum.
  ###
  renderValueForDisplay: ->
    # since getModelValue returns *100, all we need to do is slap on the percent
    superVal = super
    return superVal + '%'

  