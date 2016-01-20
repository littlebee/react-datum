
React = require('react')
_ = require('underscore')

Datum = require('./datum')


ONE_BILLION = 1000000000
ONE_MILLION = 1000000
ONE_THOUSAND = 1000

RECOGNIZED_FORMATS = ['abbreviate','money','comma', 'percent']

###
  For real numbers.

  Only allows `/^\-?[0-9]*\.?[0-9]*$/` on input
###
module.exports = class Number extends Datum
  @displayName: "react-datum.Number"

  @propTypes: _.extend {}, Datum.propTypes,
    # format only effects display, not input.  Possible values:
    # 'abbreviate' - Add M and K to numbers greater than 1 million and 1 thousand respectively
    # 'money' - display dollar sign and two decimal places zero filled
    # 'comma' - add comma separators at thousands
    # format: React.PropTypes.oneOfType([
    #   React.PropTypes.oneOf(RECOGNIZED_FORMATS)
    #   React.PropTypes.arrayOf(RECOGNIZED_FORMATS)
    # ])
    format: React.PropTypes.node
    
    # when input, validate value is at least this value on change
    minValue: React.PropTypes.number
    
    # when input, validate value is at most this value on change
    maxValue: React.PropTypes.number


  # TODO : push down this feature to Datum? with default to all   
  # will not allow characters to be entered that do not match this pattern
  charactersMustMatch: /^\-?[0-9]*\.?[0-9]*$/

  constructor: (props) ->
    super
    @addValidations [
      @validateMin
      @validateMax
    ]

  isAcceptableInput: (value) ->
    return value.match(@charactersMustMatch)

  ###
    overrides super - adds formatting
  ###
  renderValueForDisplay: ->
    dataValue = parseFloat(@getModelValue())
    formats = if _.isArray(@props.format) then @props.format else [@props.format]

    if 'percent' in formats
      dataValue *= 100

    # we are going to convert the dataValue to a string now.  All 
    # numberic processing should precede this comment

    decimalPlaces = @props.decimalPlaces
    if !decimalPlaces? && 'money' in formats && 'abbreviate' not in formats
      decimalPlaces = 2
    if decimalPlaces?
      dataValue = dataValue.toFixed(decimalPlaces)

    # at this point, dataValue is a string with 4 decimal places zero filled
    # all formatting that works on the text value goes after here
    
    if 'abbreviate' in formats
      dataValue = Math.round(parseFloat(dataValue))
      [dataValue, affix] = if dataValue >= ONE_BILLION
        [dataValue / ONE_BILLION, "MM"]
      else if dataValue >= ONE_MILLION
        [dataValue / ONE_MILLION, "M" ]
      else if dataValue >= ONE_THOUSAND
        [dataValue / ONE_THOUSAND, "K"]
      else
        [dataValue, ""]
      
      if decimalPlaces?
        dataValue = "#{dataValue.toFixed(decimalPlaces)}#{affix}"
      else
        dataValue = dataValue + affix

    if 'percent' in formats
      dataValue += "%"

    if 'comma' in formats
      # add thousands separater
      [wholeNumber, decimal] = dataValue.toString().split('.')
      dataValue = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      dataValue += '.' + decimal if decimal?

    if 'money' in formats
      dataValue = dataValue.toString().replace(/(.*\.\d$)/, '$10')
      unless dataValue.indexOf('.') >= 0
        dataValue += ".00" unless 'abbreviate' in formats
      dataValue = "$#{dataValue}"


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
