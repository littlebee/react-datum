
React = require('react')
Backbone = require('backbone')
_ = require('underscore')

if ReactBootstrap?                   #if loaded
  Popover = ReactBootstrap.Popover
  OverlayTrigger = ReactBootstrap.OverlayTrigger

###
  This is base class of all display+input components that render presentation
  of an attribute from a Backbone.Model or Javascript object.

  There is one required prop, 'attr' - the model attribute name.

  The backbone model or javascript object to get and set attributes on is
  specified in the @props.model or @context.model. Note that
  @props.model has precendence.

  TODO :  Better Examples

  Display an attribute from a javascript object

  ```coffeescript
  render: () ->
    user = new UsersModel("id24153GSA")
    user.fetch()

    # you don't need to wait for the fetch to complete because we are using
    # the **Model** contextual data component below which will rerender when
    # the model triggers 'sync'

    return (
      <Model model="UserModelClass">
        <Datum attr="firstName" label="FirstName"/>
        <Datum attr="firstName" label="LastName"/>
        <Datum attr="title"/>
      </Model>
    )
  ```

  Note that for clarity we have provided the **Text** datum.  You should probably
  use that instead of using **Datum** directly like the example above.  e.g.
  ```
    <Text attr="firstName" label="FirstName"/>
  ```

  *Validations*

  Datums support validations.  All validation methods should return either true or an
  error message.  All datums should support 'required' validation prop.

  To make a datum required, simply add the required prop to the component.  Ex:
  ```
    <Text attr="name" required>
  ```
  Validations are run at time of change and the datum element will get an invalid class
  for optional styling.  An exclamation icon is rendered in red and has a popup that
  will show all errors for that input.


###
module.exports = class Datum extends React.Component
  @displayName: "widgets.react.Datum"

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
  errors: []


  constructor: (props) ->
    super props
    @state = {value: @getModelValue()}
    @addValidations @validateRequired


  ###
      React life cycle methods
  ###

  componentWillMount: ->
    @setState value: @getModelValue()


  componentDidMount: ->
    # note that we don't need a form to work. this is for it's benefit, mostly
    # so it can ask us if we are valid (via @validate() method) and tell us
    # when the user cancels the update (via @reset() method)
    @context?.form?.addDatum?(@)


  componentWillReceiveProps: (nextProps) ->
    model = nextProps.model || @context.model
    @setState(value: model?.get(@nextProps.attr)) # state to null if not model or attr


  componentWillUnmount: ->
    @context?.form?.removeDatum?(@)


  ###
    Rendering methods
  ###

  render: ->
    @renderWrapper =>
      if @isEditable()
        @renderForInput()
      else
        @renderForDisplay()


  renderWrapper: (contentFn)->
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
      @renderValue()
    else
      @renderPlaceholder()


  renderValue: ->
    value = @getValueToRender()
    value = @renderEllipsizedValue(value)
    return value


  renderPlaceholder: ->
    placeholder = @props.placeholder
    <span className="placeholder">{placeholder}</span>


  renderEllipsizedValue: (value, options={}) ->
    ellipsizeAt = @getEllipsizeAt()
    ellipsizedValue = value.slice(0, ellipsizeAt-3) + '...'

    # don't try to ellipsize unless the value is a string,  subclass may have sent us
    # a value that is a react component.  this still doesn't catch the case where
    # a subclass component sent us HTML as a string.  Why would you?
    if ( value && _.isString(value) && ellipsizeAt && value.length > ellipsizeAt )
      if @props.noPopover
        value = elipsis(value)
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
    <span className="datum-input">
      {@renderLabel()}
      {@renderInput()}
      {@renderIcons()}
    </span>


  renderInput: ->
    placeholder = @props.placeholder || ""
    value = @getValueToRender()
    <input type="text" placeholder={placeholder} value={value} onChange={@onChange} ref={(i) => @onInputRef(i)}/>


  renderIcons: ->
    if @isEditing() && @errors.length > 0
      errors = []
      # if react-bootstrap is globally available, we will use that
      if Popover?
        errors.push(<div>{error}</div>) for error in @errors
        popover = <Popover id='datumInvalid' bsStyle='danger'>
          {errors}
        </Popover>

        return (
          <OverlayTrigger trigger={['hover','focus']} placement="bottom" overlay={popover}>
            <span className="error"><i className='icon-exclamation-sign'/></span>
          </OverlayTrigger>
        )
      else
        errors = @errors.join('\n')
        return (
          <span className="error" title={errors}><i className='icon-exclamation-sign'/></span>
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
    @errors = []
    @setState value: @getModelValue()


  addValidations: (validations) =>
    validations = [validations] unless _.isArray(validations)
    @validations = @validations.concat validations


  getInputMode: () ->
    return "readonly" if @props.readonly
    return @props.inputMode || @context.inputMode || "readonly"


  getValueToRender: () ->
    @getModelValue()


  getModel: ->
    return @props?.model || @context?.model || new Backbone.Model()


  getModelValue: ->
    return null unless model = @getModel()
    value = if model instanceof Backbone.Model then model.get(@props.attr) else model[@props.attr]
    return value


  # options pass through to model.set
  setModelValue: (value=@state.value, options={}) ->
    @getModel()?.set(@props.attr, value, options)


  saveModel: ->
    @getModel()?.save();


  getEllipsizeAt: ->
    return @props.ellipsizeAt


  getFullClassName: ->
    className = if @subClassName? then "#{@className} #{@subClassName}" else @className
    className += " required" if @props.required
    className += " invalid" if @errors.length > 0
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

    this.setState({value: currentValue});


  onInputRef: (input) =>
    @inputComponent = input
    if @needsFocus && input?
      node = React.findDOMNode(input)
      node.focus()
      node.select()
      @needsFocus = false


  focus: () =>
    @needsFocus = true
    @forceUpdate()


  validate: (value=@state.value)->
    return true unless @isEditable()
    @errors = []
    for validation in @validations
      valid = validation(value)
      unless valid == true
        @errors.push valid

    return @errors.length == 0


  validateRequired: (value) =>
    # Check for value only if the element is visible and has required class. If not return true
    return true unless @props.required
    return true if !(_.isNull(value) || _.isEmpty(value) || _.isUndefined(value))
    return "This input is required"
