
React = require('react')
ReactDOM = require('react-dom')
Backbone = require('backbone')
_ = require('underscore')

if ReactBootstrap?               # if available globally
  Popover = ReactBootstrap.Popover
  OverlayTrigger = ReactBootstrap.OverlayTrigger

###
  see ./datum.md
###
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
    # TODO : add back support of 'inlineEdit'?
    # 'readonly' = render for display;
    # 'edit' = render for input;
    inputMode: React.PropTypes.oneOf(['readonly', 'edit'])  # 'inlineEdit'])
    # set to true to not render a popover on ellipsized values
    noPopover: React.PropTypes.bool
    # set to true to set the model value on change. this defaults to true if inputMode = inlineEdit
    setOnChange: React.PropTypes.bool
    # make this input readonly regardless of context or inputMode prop
    readonly: React.PropTypes.bool
    # make this input required and give it required class and invalid class when invalid
    required: React.PropTypes.bool


  # no default for inputMode because we can also get from context, but default is
  # 'readonly'.  see @getInputMode()
  @defaultProps:
    # ellipsizeAt is defaulted to prevent really long strings from breaking layouts
    ellipsizeAt: 35


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

  # use @addValidations from constructor to add additional validations.
  # See also Number datum
  validations: []
  

  constructor: (props) ->
    super props
    @state = {errors: []}
    @addValidations @validateRequired


  ###
      React life cycle methods
  ###

  componentDidMount: ->
    # note that we don't need a form to work. this is for it's benefit, mostly
    # so it can ask us if we are valid (via @validate() method) and tell us
    # when the user cancels the update (via @reset() method)
    @context?.form?.addDatum?(@)


  componentWillReceiveProps: (nextProps) ->
    model = nextProps.model || @context.model


  componentWillUnmount: ->
    @context?.form?.removeDatum?(@)


  ###
    Rendering methods
  ###

  render: ->
    @renderDatumWrapper =>
      if @isEditable()
        @renderForInput()
      else
        @renderForDisplay()


  renderDatumWrapper: (contentFn)->
    # TODO: add data-zattr attribute for backward compatibility?
    <span className={@getFullClassName()} data-zattr={@props.attr} data-z>
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
    <span className="datum-display-value">{value}</span>


  renderPlaceholder: ->
    placeholder = @props.placeholder
    return null unless placeholder?
    <span className="placeholder">{placeholder}</span>


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
    inputMode='edit'
  ###
  renderInput: ->
    placeholder = @props.placeholder || ""
    value = @getValueForInput()
    <input type="text" placeholder={placeholder} value={value} onChange={@onChange} ref={@onInputRef}/>


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
            <span className="error"><i className='icon-exclamation-sign'/></span>
          </OverlayTrigger>
        )
      else
        errors = @state.errors.join('\n')
        return (
          <span className="error" title={errors}><i className='icon-exclamation-sign fa fa-exclamation-triangle'/></span>
        )

    return null


  isEditable: () ->
    inputMode = @getInputMode()
    return true if inputMode == "edit" || (inputMode == "inlineEdit" && @isEditing())


  # if this input is an inlineEdit
  isEditing: () ->
    inputMode = @getInputMode()
    return inputMode == 'edit' || (inputMode == 'inlineEdit' && @constructor.inlineEditor == @)


  cancelEdit: () ->
    @setState errors: []


  addValidations: (validations) =>
    validations = [validations] unless _.isArray(validations)
    @validations = @validations.concat validations


  getInputMode: () ->
    return "readonly" if @props.readonly
    return @props.inputMode || @context.inputMode || "readonly"


  getValueForDisplay: () ->
    @getModelValue()


  getValueForInput: () ->
    @getModelValue()
    

  getModel: ->
    return @props?.model || @context?.model || new Backbone.Model()


  ###
    do not override this method to return a component element or jsx.  it's bad
  ###
  getModelValue: ->
    return null unless model = @getModel()
    value = if model instanceof Backbone.Model then model.get(@props.attr) else model[@props.attr]
    return value


  # options pass through to model.set
  setModelValue: (value, options={}) ->
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


  onChange: (event) =>
    currentValue = event.target.value
    @validate(currentValue)
    if @shouldSetOnChange()
      @setModelValue(currentValue)
    else
      @setModelValue(currentValue, silent: true)


  onInputRef: (input) =>
    @inputComponent = input


  focus: () =>
    if @inputComponent?
      node = ReactDOM.findDOMNode(@inputComponent)
      node.focus()
      node.select()


  validate: (value=@getModelValue())->
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
