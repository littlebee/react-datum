
React = require('react')
ReactDOM = require('react-dom')
Backbone = require('backbone')
_ = require('underscore')

if ReactBootstrap?               # if available globally
  Popover = ReactBootstrap.Popover
  OverlayTrigger = ReactBootstrap.OverlayTrigger

# see ./datum.md
module.exports = class Datum extends React.Component
  @displayName: "react-datum.Datum"

  @propTypes:
    # additional css classes (space seperated) to add to wrapper div
    className: React.PropTypes.string
    
    # can also accept model instance as context var. prop has precendence
    model: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Model)
      React.PropTypes.object
    ])
    
    # the backbone attribute on the model to get and set
    attr: React.PropTypes.string.isRequired
    
    label: React.PropTypes.string
    
    # set ellipsizeAt to false to display whole value. Only effects 'readonly' display
    # values displayed in 'edit' mode are never truncated.
    ellipsizeAt: React.PropTypes.oneOfType([
      React.PropTypes.number
      React.PropTypes.bool
    ])
    
    placeholder: React.PropTypes.string
    
    # 'readonly' = render for display;
    # 'edit' = render for input;
    inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit'])
    
    # set to true to not render a popover on ellipsized values
    noPopover: React.PropTypes.bool
    
    # set to true to set the model value on change. this defaults to true if inputMode = inlineEdit
    setOnChange: React.PropTypes.bool
    
    # setOnBlur = true model value is set when the input is blurred
    setOnBlur: React.PropTypes.bool
        
    # make this input readonly regardless of context or inputMode prop
    readonly: React.PropTypes.bool
    
    # make this input required and give it required class and invalid class when invalid
    required: React.PropTypes.bool

    # call back for when the datum changes
    onChange: React.PropTypes.func

  # no default for inputMode because we can also get from context, but default is
  # 'readonly'.  see @getInputMode()
  @defaultProps:
    # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
    ellipsizeAt: 35
    setOnBlur: true


  @contextTypes:
    # can also accept model instance as a prop.  prop has precendence
    model: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Model)
      React.PropTypes.object
    ])
    
    # note that the readonly prop takes precendence
    inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit'])
    
    # if there is a form context, we will register with it so that it can
    # interact with us
    form: React.PropTypes.object

  # override this to give the sub component an additional class
  subClassName: null

  # don't override this unless you dont want the datum class on the wrapper div
  className:  'datum'

  # this get's set to the inline edit control that is currently in editmode.
  # there can only be one inlineEdit type editing at a time per page
  @inlineEditor: null

  # see addValidations below
  validations: []
  

  constructor: (props) ->
    super props
    @initializeState()
    @addValidations @validateRequired


  initializeState: ->
    @state = {
      value: null
      errors: []
    }

  
  #..................................................React life cycle methods...........................................


  componentDidMount: ->
    # note that we don't need a form to work. this is for it's benefit, mostly
    # so it can ask us if we are valid (via @validate() method) and tell us
    # when the user cancels the update (via @reset() method)
    @context?.form?.addDatum?(@)
    modelValue = @getModelValue()


  componentWillReceiveProps: (nextProps) ->
    # TBD
    

  componentWillUnmount: ->
    @context?.form?.removeDatum?(@)
    
    # you can unmount without bluring save state value to 
    # model if it exists
    if @state.value? && @shouldSetOnBlur()
      @setValue(@state.value, setModelValue: true)
      
      
  #                           Rendering methods

  render: ->
    @renderDatumWrapper =>
      if @isEditable()
        @renderForInput()
      else
        @renderForDisplay()


  renderDatumWrapper: (contentFn)->
    # TODO: add data-zattr attribute for backward compatibility?
    <span className={@getFullClassName()} data-zattr={@props.attr}>
      {contentFn()}
    </span>


  renderForDisplay: ->
    <span>
      {@renderLabel()}
      {@renderValueOrPlaceholder()}
      {@renderIcons()}
    </span>


  renderLabel: ->
    if @props.label?
      return <label>{@props.label} </label>
    else
      return null


  renderValueOrPlaceholder: ->
    if @getModelValue()?
      displayValue = @renderValueForDisplay()
      @renderWrappedDisplayValue(displayValue)
    else
      @renderPlaceholder()


  ###
    In most cases, this is the method you want to override in a custom datum to 
    alter the way the model attribute is displayed when inputMode='readonly'
    
    This method is only called if the model value is not null.  
  ###
  renderValueForDisplay: ->
    return @getValueForDisplay()


  renderWrappedDisplayValue: (value)->
    <span className="datum-display-value" onClick={@onEditClick}>{value}</span>


  onEditClick: =>
    @constructor.inlineEditor = @
    @forceUpdate()
    _.defer => @focus()


  renderPlaceholder: ->
    placeholder = @props.placeholder
    return null unless placeholder?
    <span className="placeholder">{placeholder}</span>


  ###
    Note that this method is not called by Datum directly.  It is 
    provided here so that any Datum extensions can ellipsize whatever
    part of their rendering neccessary and have a consistent prop and 
    method for doing so.
  ###
  renderEllipsizedValue: (value, options={}) ->
    return value unless value?
    
    ellipsizeAt = @getEllipsizeAt()

    # don't try to ellipsize unless the value is a string,  subclass may have sent us
    # a value that is a react component.  this still doesn't catch the case where
    # a subclass component sent us HTML as a string.  Why would you?
    if ( value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt )
      ellipsizedValue = value.slice(0, ellipsizeAt-3) + '...'
      if @props.noPopover
        value = ellipsizedValue
      else
        # if react-bootstrap is available globally use it
        if Popover?
          popover = <Popover id='datumTextEllisize'>{value}</Popover>
          value = (
            <OverlayTrigger trigger={['hover','focus']} placement="bottom" overlay={popover}>
              <span>{ellipsizedValue}</span>
            </OverlayTrigger>
          )
        else
          value = <span title={value}>{ellipsizedValue}</span>

    return value


  renderForInput: ->
    # TODO : data-value is a hack, if the model value changes than the only thing that changes in our render
    #        is the value= passed to the <input> and react ignores changes to just the value, I think?
    #        without this the "Form with model context should respond to model changes" test fails
    <span className="datum-input" data-value={@getValueForInput()}>
      {@renderLabel()}
      {@renderInput()}
      {@renderIcons()}
    </span>


  ###
    In most cases this is the method you want to override to alter the presentation of the datum when
    inputMode='edit'.
    
    If you override this method, be sure to add @onBlur() and @onChange() to your input
    component 
  ###
  renderInput: ->
    <input {... @getInputComponentOptions()}/>
      

  renderIcons: ->
    if @isEditing() && @state.errors.length > 0
      errors = []
      # if react-bootstrap is globally available, we will use that
      if Popover?
        errors.push(<div>{error}</div>) for error in @state.errors
        popover = <Popover id='datumInvalid' bsStyle='danger'>
          {errors}
        </Popover>

        return (
          <OverlayTrigger trigger={['hover','focus']} placement="bottom" overlay={popover}>
            <span className="error validation">!</span>
          </OverlayTrigger>
        )
      else
        errors = @state.errors.join('\n')
        return (
          <span className="error validation" title={errors}>!</span>
        )

    return null


  ###
    This method can be overriden to provide custom determination of dirty state.
    dirty meaning, has the input value changed.  The base implementation assumes
    that the base behavior of setting state.value to null on model.set() happens.
  ###
  isDirty: () ->
    return @state.value?


  isEditable: () ->
    inputMode = @getInputMode()
    return true if inputMode == "edit" || (inputMode == "inlineEdit" && @isEditing())


  # if this input is an inlineEdit
  isEditing: () ->
    inputMode = @getInputMode()
    return inputMode == 'edit' || (inputMode == 'inlineEdit' && @constructor.inlineEditor == @)


  cancelEdit: () ->
    @setState errors: []


  ###
    When extending Datum, use @addValidations from constructor to add additional validations.
    'required' validation is automatically added (only invalid if empty and has 'required' prop)
    
    For example, see [Number datum](#Number)
    
    You can add validations to an individual instance of any Datum extension.
    
    `validations` argument should be one or an array of methods that accept the (value) to
    validate and return true if valid, false if not. 
  ###
  addValidations: (validations) =>
    validations = [validations] unless _.isArray(validations)
    @validations = @validations.concat validations


  getInputMode: () ->
    return "readonly" if @props.readonly
    return @props.inputMode || @context.inputMode || "readonly"
    
    
  getInputComponentOptions: () ->
    placeholder = @props.placeholder || ""
    value = @getValueForInput()
    return {
      type: "text" 
      placeholder: placeholder
      value: value 
      onChange: @onChange
      onBlur: @onBlur
      onKeyDown: @onInputKeyDown
      ref: @onInputRef
    }

  ### 
    This method should return the value for display from the model. You 
    can extend this method in a custom Datum to coerce or manipulate just
    the value used for display.   
    
    In most cases, you'll probably want to extend the Datum.renderValueForDisplay() 
    instead
  ###
  getValueForDisplay: () ->
    return @getModelValue()
    

  ###
    Extend this method to coerce or intepret the value from that model
    that this displayed when in input
  ###
  getValueForInput: () ->
    #console.log "Datum::getValueForInput", @state.value, @getModelValue(), JSON.stringify({value: @state.value})
    return if @state.value? then @state.value else @getModelValue()
    
    
  ###
    this method returns the value in the input as seen by user
  ###
  getInputValue: () ->
    return @state.value
    
    
  ###
    returns the Backbone Model currently associated with the datum
  ###
  getModel: (newProps = @props)->
    return newProps?.model || @context?.model || new Backbone.Model()


  ###
    returns the value currently set on the model
    
    warning: Do not override this method to return a component element or jsx; bad things will happen.
  ###
  getModelValue: (newProps = @props)->
    return null unless model = @getModel()
    value = if model instanceof Backbone.Model  
      model.get(newProps.attr) 
    else 
      model[newProps.attr]
    return value


  ###
    Extend this model to interpret the value prior to saving for example a Percent datum
    that the user enters a value that is 100x what gets saved to model
    
    options pass through to model.set
  ###
  setModelValue: (value=@getInputValue(), options={}) ->
    return unless value?   # value == null means the user didn't change it
    @getModel()?.set(@props.attr, value, options)


  saveModel: ->
    @getModel()?.save();


  getEllipsizeAt: ->
    return @props.ellipsizeAt


  getFullClassName: ->
    className = if @subClassName? then "#{@className} #{@subClassName}" else @className
    className += " required" if @props.required
    className += " invalid" if @state.errors.length > 0
    className += " #{@props.className}" if @props.className?
    return className


  shouldSetOnChange: ->
    @props.setOnChange == true || (@getInputMode() == 'inlineEdit' && !@props.setOnChange == false)


  shouldSetOnBlur: ->
    @props.setOnBlur == true && !@shouldSetOnChange()


  # on every change, it needs to set the value in state (see @setValue()) with
  # the event.target.value in the input.  On next render the value in state
  # is what the user sees, so you could also intercept this method
  onChange: (event, options = {}) =>
    @setValue(event.target.value, setModelValue: @shouldSetOnChange())
      
    if @shouldSetOnChange()
      @toDisplayMode()

    if options.callOnChangeHandler? and options.callOnChangeHandler and @props.onChange?
      @props.onChange(event)


  # onChange above captures the value in state.  
  # onBlur only sets the value on the model with the current state value, and
  #   only if state value is not null 
  onBlur: (event) =>
    value = @getInputValue()
    return unless value?
    @setValue(value, setModelValue: @shouldSetOnBlur())

    if @shouldSetOnBlur() || @getInputMode() == 'inlineEdit' # if inline edit should get back to display mode.
      @toDisplayMode()


  toDisplayMode: () ->
    if @constructor.inlineEditor == @
      @constructor.inlineEditor = null
      @forceUpdate()


  
  onInputKeyDown: (event) =>
    @props.onKeyDown?(event)
    
  
  # sets the value of the datum (display and input text)
  setValue: (newValue, options={}) =>
    options = _.defaults options,
      # causes the new value to be set on the model too
      setModelValue: false
      
    valid = @validate(newValue)
    if options.setModelValue
      @setModelValue(newValue)
      @setState(value: newValue)
    else
      @setState(value: newValue)
      
  
  

  ###
    This method can be used to get at the inner input component if one exists, only
    while inputMode=='edit'
  ###
  getInputComponent: () =>
    @inputComponent


  onInputRef: (input) =>
    @inputComponent = input


  focus: () =>
    if @getInputComponent()?
      node = ReactDOM.findDOMNode(@getInputComponent())
      node.focus()
      node.select()

  ###
    This method is called to validate the value in the input.
    
    Note that validations such as props.required also need to apply if the user 
    hasn't changed the input, so the default value is the coalesce of state.value
    or model value.  state.value (see getInputValue()) is null if the user has
    not made changes. 
  ###
  validate: (value=@getValueForInput())->
    return true unless @isEditable()
    @setState errors: []
    errors = []
    for validation in @validations
      valid = validation(value)
      unless valid == true
        errors.push valid
    @setState errors: errors
    
    return errors.length == 0


  validateRequired: (value) =>
    # Check for value only if the element is visible and has required class. If not return true
    return true unless @props.required
    return true if !(_.isNull(value) || _.isEmpty(value) || _.isUndefined(value))
    return "This input is required"


