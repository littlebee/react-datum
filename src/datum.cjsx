App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'
  # we use the popover for ellipsized text and for error messages on validation
  'react-bootstrap'

], (x, [React, ReactDom, Rbs, loadedLibs...]) ->

  ###
    This is base class of all display+input components that render a presentation
    of an attribute from a Backbone.Model or Javascript object.

    There is one required prop - 'attr' that is the attribute name.

    The backbone model or javascript object to get and set attributes on is
    specified in the @props.model or @context.model attribute. Note that
    @props.model has precendence.

    TODO :  Example - display an attribute from a javascript object

    ```coffeescript
    render: () ->
      return (
        <Rz.Model model="App.models.User">
          <Rz.Form>
            <span><Rz.Datum attr="name"/> (<Rz.Datum attr="title"/>)
          </Rz.Form>
        </Rz.Model>
      )
      <R.Datum
    ```


    *Validations*

    Datums support validations.  All validation methods should return either true or an
    error message.  All datums should support required validation.

    To make a datum required, simply add the required prop to the component.  Ex:
    ```
      <Rz.Text attr="name" required>
    ```
    Validations are run at time of change and the datum element will get an invalid class
    for optional styling.  An exclamation icon is rendered in red and has a popup that
    will show all errors for that input.


  ###
  class x.Datum extends React.Component
    @displayName: "widgets.react.Datum"

    @propTypes:
      # can also accept model instance as context var. prop has precendence
      model: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Backbone.Model)
        React.PropTypes.object
      ])
      # the backbone attribute on the model to get and set
      attr: React.PropTypes.string.isRequired
      label: React.PropTypes.string
      ellipsizeAt: React.PropTypes.oneOfType([
        React.PropTypes.number
        React.PropTypes.bool
      ])
      placeholder: React.PropTypes.string
      inputMode: React.PropTypes.oneOf(['readonly', 'edit', 'inlineEdit'])
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
      ellipsizeAt: 35
      noPopover: false
      setOnChange: false


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
        return <label>{@props.label} :</label>
      else
        return null


    renderValueOrPlaceholder: ->
      if @getModelValue()?
        @renderValue()
      else
        @renderPlaceholder()


    renderValue: ->
      value = @getValueToRender()
      value = @_ellipsize(value)
      return value


    renderPlaceholder: ->
      placeholder = @props.placeholder
      <span className="placeholder">{placeholder}</span>


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
        errors.push(<div>{error}</div>) for error in @errors
        popover = <Rbs.Popover id='datumInvalid' bsStyle='danger'>
          {errors}
        </Rbs.Popover>

        return (
          <Rbs.OverlayTrigger trigger={['hover','focus']} placement="bottom" overlay={popover}>
            <span className="error"><i className='icon-exclamation-sign'/></span>
          </Rbs.OverlayTrigger>
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
      @state.value || @getModelValue()


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


    _ellipsize: (value, options={}) ->
      ellipsizeAt = @getEllipsizeAt()
      if ((value && ellipsizeAt && value.length > ellipsizeAt) || @alwaysAddPopover)
        if @props.noPopover
          value = elipsis(value)
        else
          popover = <Rbs.Popover id='bbeditTextEllisize'>{value}</Rbs.Popover>
          value = (
            <Rbs.OverlayTrigger trigger={['hover','focus']} placement="bottom" overlay={popover}>
              <span>{value.slice(0, ellipsizeAt-3) + '...'}</span>
            </Rbs.OverlayTrigger>
          )

      return value
