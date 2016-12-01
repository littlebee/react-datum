
React = require('react')
ReactDOM = require('react-dom')
Backbone = require('backbone')
_ = require('underscore')

Options = require '../options'

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
    attr: React.PropTypes.string
    
    # optional label to render before value or input.  text values get wrapped in <label></label>
    # Can also be specified via metadata.
    label: React.PropTypes.node
    
    # optional tooltip / help text to show on hover over datum label.  You can use this to display 
    # a more wordy & helpful description of this attribute.  Get's applied as the title attribute
    # of our label element.  Can also be specified via metadata.  
    #
    # Ignored if props.label or metadata label does not exist or are both null.
    # 
    # Uses ReactBootstrap if provided.  See [ReactDatum.Options](#Options) below.
    tooltip: React.PropTypes.string
    
    # optional value or component to display if model.get(attr) returns null or undefined
    # Can also be specified via metadata
    placeholder: React.PropTypes.node

    # 'readonly' = render for display;
    # 'edit' = render for input;
    # 'inlineEdit' = datum will transition from readonly to edit on click
    inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit'])
    
    # getMetadata is an optional function that will be called to retrieve the props above where
    # metadata support is indicated.  The getMetadata method is passed the following 
    # arguments:  
    #     (prop, datumInstance) 
    # where `prop` is the datum prop for which metadata is being requested.  `datumInstance` is a reference 
    # to the datum component instance.  You can use the documented API methods on datumInstance, such
    # as getModel() to get the model associated with datumInstance, add datumInstance.props.attr to 
    # get the associated attr.
    #
    # In addition to this prop, which has first precedence, ReactDatum will also look for a 
    # getDatumMetadata method on the model instance and, if found, call it with the same arguments
    # to acquire the label, tooltip, placeholder and any other props supported by metadata. 
    # See [discussion and example above on model driven metadata](#metadata).
    getMetadata: React.PropTypes.func  
    
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
    
    # style to apply to outer datum div
    style: React.PropTypes.object
    
    # if true, renders a div as the component wrapper
    asDiv: React.PropTypes.bool

    # call back for when the datum changes
    onChange: React.PropTypes.func
    
    # value to use instead of model attribute.  You can use this instead of a model and attr to manually set 
    # the initial value of the component.   Model value is ignored for display, but still updated of in an
    # editable state
    value: React.PropTypes.node
    
    
  @defaultProps:
    # no default for inputMode because we can also get from context, see @getInputMode()
    # inputMode: 'readonly'
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
      #value: @getModelValue()
      errors: []
      isDirty: false
    }

  #..................................................React life cycle methods...........................................

  componentWillMount: ->
    @initializeState()
    

  componentDidMount: ->
    # note that we don't need a form to work. this is for it's benefit, mostly
    # so it can ask us if we are valid (via @validate() method) and tell us
    # when the user cancels the update (via @reset() method)
    @context?.form?.addDatum?(@)
    modelValue = @getModelValue()


  componentWillReceiveProps: (nextProps) ->
    prevModelValue = @getModelValue(@props)
    newModelValue = @getModelValue(nextProps)
    
    if JSON.stringify(prevModelValue) != JSON.stringify(newModelValue)
      @setState({
        value: newModelValue
      })
    

  componentWillUnmount: ->
    @context?.form?.removeDatum?(@)
    
    # you can unmount without bluring save state value to 
    # model if it exists
    if @isDirty() && @shouldSetOnBlur()
      @setValue(@state.value, setModelValue: true)
      
      
  #                           Rendering methods

  render: ->
    @renderDatumWrapper =>
      if @isEditable()
        @renderForInput()
      else
        @renderForDisplay()


  renderDatumWrapper: (contentFn)->
    wrapperProps =
      className: @getFullClassName()
      'data-zattr': @props.attr
      style: @props.style || {}
      
    if @props.asDiv 
      <div {... wrapperProps}>
        {contentFn()}
      </div>
    else
      <span {... wrapperProps}>
        {contentFn()}
      </span>


  renderForDisplay: ->
    <span>
      {@renderLabel()}
      {@renderValueOrPlaceholder()}
      {@renderIcons()}
    </span>


  renderLabel: ->
    labelProps = {}
    tooltip = @getPropOrMetadata('tooltip')
      
    label = if @getPropOrMetadata('label')?
      @renderWithPopover(<label {... labelProps}>{@getPropOrMetadata('label')}</label>, tooltip, 'datumTooltip', 'datum-tooltip')
    else
      null
    
    return label

  

  ###
    Override this method only if you need to not render the placeholder. 
  ###
  renderValueOrPlaceholder: ->
    if @getModelValue()?
      displayValue = @renderValueForDisplay()
      @renderWrappedDisplayValue(displayValue)
    else
      placeholderValue = @renderPlaceholder()
      @renderWrappedDisplayValue(placeholderValue)


  ###
    In most cases, this is the method you want to override in a custom datum to 
    alter the way the model attribute is displayed when inputMode='readonly'
    
    This method is only called if the model value is not null.  
  ###
  renderValueForDisplay: ->
    return @getValueForDisplay()


  renderWrappedDisplayValue: (value)->
    <span className="datum-display-value" onClick={@onEditClick} style={@props.style}>{value}</span>


  onEditClick: =>
    @constructor.inlineEditor = @
    @forceUpdate()
    _.defer => @focus()


  renderPlaceholder: ->
    placeholder = @getPropOrMetadata('placeholder')
    return null unless placeholder?
    <span className="placeholder">{placeholder}</span>


  ###
    Note that this method is not called by Datum directly.  It is 
    provided here in the Datum base class so that any Datum extensions 
    can ellipsize whatever part of their rendering neccessary and have 
    a consistent prop and method for doing so.
  ###
  renderEllipsizedValue: (value, options={}) ->
    return value unless value?
    
    ellipsizeAt = @getEllipsizeAt()

    # don't try to ellipsize unless the value is a string,  subclass may have sent us
    # a value that is a react component.  this still doesn't catch the case where
    # a subclass component sent us HTML as a string.  Why would you?
    if ( value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt )
      # If the option is 'reverseEllipsis' then we need to add ... at the start.
      if @props.reverseEllipsis
        ellipsizedValue = '...' + value.slice(value.length-(ellipsizeAt-3), value.length - 1)
      else
        ellipsizedValue = value.slice(0, ellipsizeAt-3) + '...'

      return @renderWithPopover(ellipsizedValue, value, 'datumEllipsizedValue', 'datum-ellipsized')

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
      className = "error validation"
      
      errorIconClass = Options.get('errorIconClass')
      errorIcon = if errorIconClass?
        <i className={errorIconClass}/>
      else
        '!'

      # multiple errors should be on their on line
      # if we are using ReactBootstrap, format the error messages with HTML
      if @getReactBootstrap()? && !@props.noPopover
        errors.push(<div>{error}</div>) for error in @state.errors
      else
        errors = @state.errors.join('\n')
    
      return @renderWithPopover(errorIcon, errors, 'datumInvalid', 'datum-invalid')

    return null
    
    
  renderWithPopover: (value, tooltip, popoverId, valueClass) ->
    return value unless tooltip?
    
    # if available globally or user called ReactDatum.set('ReactBootstrap', someLib)
    Rb = @getReactBootstrap()
            
    # if react-bootstrap is available use it
    if Rb? && !@props.noPopover
      popover = <Rb.Popover id={popoverId}>{tooltip}</Rb.Popover>
      rValue = (
        <Rb.OverlayTrigger overlay={popover} {... Options.get('RbOverlayProps')}>
          <span className={valueClass}>{value}</span>
        </Rb.OverlayTrigger>
      )
    else
      rValue = <span className={valueClass} title={tooltip}>{value}</span>
    
    return rValue


  ###
    This method can be overriden to provide custom determination of dirty state.
    dirty meaning, has the input value changed.  The base implementation assumes
    that the base behavior of setting state.value to null on model.set() happens.
  ###
  isDirty: () ->
    return @state.isDirty


  isEditable: () ->
    inputMode = @getInputMode()
    return true if inputMode == "edit" || (inputMode == "inlineEdit" && @isEditing())


  # if this input is an inlineEdit
  isEditing: () ->
    inputMode = @getInputMode()
    return inputMode == 'edit' || (inputMode == 'inlineEdit' && @constructor.inlineEditor == @)


  cancelEdit: () ->
    @setState { errors: [], value: @getModelValue() }

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
    placeholder = @getPropOrMetadata('placeholder') || ""
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
    Extend this method to coerce or intepret the value from the model
    that is displayed when in input
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
    returns the Backbone Model currently associated with the datum.
  ###
  getModel: (newProps = @props, newContext = @context)->
    return newProps?.model || newContext?.model || new Backbone.Model()


  ###
    returns the value currently set on the model
    
    warning: Do not override this method to return a component element or jsx; bad things will happen.
  ###
  getModelValue: (newProps = @props, newContext = @context)->
    return newProps.value if newProps.value? 
    return null unless model = @getModel(newProps, newContext)
    
    value = if _.isFunction(model.get)
      model.get(newProps.attr) 
    else 
      model[newProps.attr]
    return value


  ###
    Extend this model to interpret the value prior to saving for example a Percent datum
    that the user enters a value that is 100x what gets saved to model
    
    options pass through to model.set() 
  ###
  setModelValue: (value=@getInputValue(), options={}) ->
    return unless value?   # value == null means the user didn't change it
    model = @getModel()
    return unless model?
    
    if _.isFunction(model.set) 
      model.set(@props.attr, value, options) 
    else 
      model[@props.attr] = value


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
    

  getPropOrMetadata: (prop) ->
    unless @props[prop] == undefined
      return @props[prop] 
    
    return @props.getMetadata?(prop, @) || @getModel()?.getDatumMetadata?(prop, @) || undefined
    
    
  getReactBootstrap: ->
    # if available globally or user called ReactDatum.set('ReactBootstrap', someLib)
    return Options.get('ReactBootstrap') || window?.ReactBootstrap


  shouldSetOnChange: ->
    @props.setOnChange == true || (@getInputMode() == 'inlineEdit' && !@props.setOnChange == false)


  shouldSetOnBlur: ->
    @props.setOnBlur == true && !@shouldSetOnChange() && !@props.multi


  onChange: (event, options = {}) =>
    #options are passed through to props.onChange
    options = _.defaults options,
      silent: false
      event: event
      # this can be set to another value to send to the @props.onChange handler
      #   see CollectionPicker#onChange
      propsOnChangeValue: null
      
    # NOTE: don't assume that event arg contains anything more than
    #     target.value.  Some wrapped components like react-select don't
    #     provide the synth event on change 
    value = if event?.target?.value? then event?.target?.value else event
    
    @setValue(value, setModelValue: @shouldSetOnChange())
      
    if @shouldSetOnChange()
      @toDisplayMode()  # only happens if this is the inline editor

    # it should be very rare that options.silent is used
    if @props.onChange? and !options.silent
      @props.onChange(options.propsOnChangeValue||value, @, options)


  # onChange above captures the value in state.  
  # onBlur only sets the value on the model with the current state value, and
  #   only if state value is not null 
  onBlur: (event) =>
    value = @getInputValue()
    return if @isInputValueChanged()
    @setValue(value, setModelValue: @shouldSetOnBlur())

    if @shouldSetOnBlur() || @getInputMode() == 'inlineEdit' # if inline edit should get back to display mode.
      @toDisplayMode()


  isInputValueChanged: ->    
    @getInputValue() == @getModelValue()


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
      @setState({isDirty: false})
    else
      @setState({isDirty: true})

    @setState({value: newValue})
  

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


  # Jut comment
  validateRequired: (value) =>
    # Check for value only if the element is visible and has required class. If not return true
    return true unless @props.required
    return true if !(_.isNull(value) || _.isEmpty(value) || _.isUndefined(value))
    return "This input is required"


  

