
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
    # 'percent' - multiply by 100 and postfix '%'
    #
    # can be an array of formats or a single string format
    format: React.PropTypes.oneOfType [
      React.PropTypes.array
      React.PropTypes.string
    ]
    
    # rounds value to n decimal places
    decimalPlaces: React.PropTypes.number
    
    # if decimalPlaces, zeroFill={true} will round out to n places 
    zeroFill: React.PropTypes.bool
    
    # when input, validate value is at least this value on change
    minValue: React.PropTypes.number
    
    # when input, validate value is at most this value on change
    maxValue: React.PropTypes.number
    
  
  @defaultProps: _.extend {}, Datum.defaultProps,
    # Exceptional case: when format='money' is used without format='abbreviate',
    # this defaults to 2
    decimalPlaces: null
    
    # Exceptional case: when format='money' is used without format='abbreviate',
    # this defaults to 2, you can however change the money behavior by explicitly
    # setting zerofill to false
    zeroFill: null
    
    
    
  


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
    value = parseFloat(@getModelValue())
    formats = if _.isArray(@props.format) then @props.format else @props.format?.toString().split(' ') || []

    if 'percent' in formats
      value *= 100
      
    # we are going to convert the value to a string now.  All 
    # numberic processing should precede this comment
    value = @roundToDecimalPlaces(value, formats)

    # at this point, value is a string with 4 decimal places zero filled
    # all formatting that works on the text value goes after here
    value = @abbreviate(value, formats)
    value = @addCommas(value, formats)
    value = @monitize(value, formats)

    if 'percent' in formats
      value += "%"

    return value


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
    
  ###  
    returns a string with number value input rounded to user requested props.decimalPlaces 
      and optionally zeroFilled if @props.zeroFill == true
    note that 'money', when not 'abbreviate'd should zero fill out to two decimal places 
    unless props indicate otherwise
  ###
  roundToDecimalPlaces: (value, formats) ->
    decimalPlaces = @props.decimalPlaces
    zeroFill = @props.zeroFill
    if 'money' in formats
      decimalPlaces ?= 2
      zeroFill ?= !('abbreviate' in formats)
      
    if decimalPlaces?
      value = value.toFixed(decimalPlaces)
      unless zeroFill
        value = parseFloat(value).toString()
        
    return value
    
    
  abbreviate: (value, formats) ->
    if 'abbreviate' in formats
      value = parseFloat(value)
      [value, affix] = if value >= ONE_MILLION
        [value / ONE_MILLION, "MM" ]
      else if value >= ONE_THOUSAND
        [value / ONE_THOUSAND, "K"]
      else
        [value, ""]

      value = "#{@roundToDecimalPlaces(value, formats)}#{affix}"
    return value
        
        
  addCommas: (value, formats) ->
    if 'comma' in formats
      # add thousands separater
      [wholeNumber, decimal] = value.toString().split('.')
      value = wholeNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      value += '.' + decimal if decimal?
    return value


  monitize: (value, formats) ->
    if 'money' in formats
      value = "$#{value}"
    return value

    
  
    