
React = require('react')
Datum = require('./datum')


ONE_MILLION = 1000000
ONE_THOUSAND = 1000

###
  For real numbers.

  *props
  format - one of
    'abbreviate' - Add M and K to numbers greater than 1 million and
      1 thousand respectively
    'money' - display dollar sign and two decimal places zero filled
    'comma' - add comma separators at thousands

  minValue - validate value must be at least this value on change
  maxValue - validate value must be at most this value on change


  Only allows /[0-9\-\.]/ on input

###
class Number extends Datum
  @displayName: "widgets.react.Number"

  @propTypes: _.extend {}, Datum.propTypes,
    format: React.PropTypes.oneOf(['abbreviate','money','comma'])
    minValue: React.PropTypes.number
    maxValue: React.PropTypes.number

  charactersMustMatch: /^\-?[0-9]*\.?[0-9]*$/

  constructor: (props) ->
    super
    @addValidations [
      @validateMin
      @validateMax
    ]

  isAcceptableInput: (value) ->
    return value.match(@charactersMustMatch)


  # overrides super - adds formatting
  getValueForDisplay: ->
    dataValue = @getModelValue()
    switch @props.format
      when 'abbreviate'
        if  dataValue > ONE_MILLION
          "#{dataValue / ONE_MILLION}M"
        else if dataValue > ONE_THOUSAND
          "#{dataValue / ONE_THOUSAND}K"
        else
          dataValue
      when 'comma'
        # add thousands separater
        dataValue = dataValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      when 'money'
        dataValue = dataValue.toString().replace(/(.*\.\d$)/, '$10')
        unless dataValue.indexOf('.') >= 0
          dataValue += ".00"
        dataValue = "$#{dataValue}"
      else
        dataValue

    return dataValue


  # extends super
  renderPlaceHolder: ->
    if @props.placeholder?
      super
    # if we don't have a placeholder, render zero by default without the placeholder classes
    return <span>0</span>


  # extend super, ignore invalid input characters
  onChange: (event) =>
    inputValue = event.target.value
    if @isAcceptableInput(inputValue)
      super


  validateMin: (value) =>
    return true unless @props.minValue?
    return true if value >= @props.minValue
    return "The value must be equal or greater than #{@props.minValue}"


  validateMax: (value) =>
    return true unless @props.maxValue?
    return true if value <= @props.maxValue
    return "The value must be equal or less than #{@props.maxValue}"
