
React = require('react')
Datum = require('./datum')

module.exports = class Form extends React.Component
  @displayName: "widgets.react.Form"

  # TODO : move this to somewhere reusable. most of the datums accept
  # a model or plain js object
  @modelOrObject: ->
    React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Model)
      React.PropTypes.object
    ])


  @propTypes:
    # can also accept model instance as context var. prop has precendence
    model: @modelOrObject()
    # no formMode like zform, but we have to support programatic readonly
    # see also ClickToEditForm component.   readonly should always take precendence
    readonly: React.PropTypes.bool
    # you can style a buttonPossiton: 'top' to float left or right in css.
    buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none'])
    # specify className of form element
    className: React.PropTypes.string


  @defaultProps:
    readonly: false
    buttonPosition: 'bottom'
    className: 'zform'


  @contextTypes:
    # can also accept model instance as a prop.  prop has precendence
    model: @modelOrObject()

  # we also pass along the model passed to us via prop or context, so you can
  # be in the context of another model and have the form interact with an
  # an outside model by means of passing the model instance as a prop.
  @childContextTypes:
    # we pass along the model (make it contextually available) so you can
    # say `<Rz.Form model={this.ourModel}>` and change the model context
    # for all of the datums in this form
    model: @modelOrObject()
    # this is how we tell the datums in our children to render for input
    inputMode: Datum.contextTypes.inputMode
    # datums will register with us through the addDatum method when they mount
    # and remove themselves when they unmount
    form: React.PropTypes.object


  # default input mode for all datums that don't have 'readonly' or 'inputMode props
  datumInputMode:  'edit'


  constructor: (props) ->
    @datums = [] # see addDatum() and removeDatum()
    super


  getChildContext: ->
    return {
      model: @getModel()
      inputMode: @getDatumInputMode()
      form: @
    }

  render: ->
    return null unless @getModel()?

    @_saveModelStateAtRender()

    <div className={@props.className}>
      {@renderTopButtons()}
      {@renderChildren()}
      {@renderBottomButtons()}
      {@renderErrorMessage()}
    </div>


  componentDidMount: ->
    @node = ReactDom.findDOMNode(this)


  focus: ->
    firstEditable = _.find @datums, (d) -> d.isEditable()
    firstEditable?.focus()


  renderChildren: ->
    <div className="form-content">
      {@props.children}
    </div>


  renderTopButtons: ->
    return unless @props.buttonPosition == 'top'
    @renderButtonContainer(addClass: "top")


  renderBottomButtons: ->
    return unless @props.buttonPosition == 'bottom'
    @renderButtonContainer(addClass: "bottom")


  renderButtonContainer: (options={}) ->
    options = _.defaults options,
      addClass: null

    className = "form-buttons"
    className += " #{options.addClass}" if options.addClass?

    <div className={className}>
      {@renderButtons(options)}
    </div>


  renderButtons: (options) ->
    return [
      <button className='btn btn-success' onClick={@onSaveClick}>Save</button>
      <button className='btn' onClick={@onCancelClick}>Cancel</button>
    ]


  renderErrorMessage: ->
    return null unless @errorMessage?
    console.log 'errorMessage: ', @errorMessage
    <div className="error">{@errorMessage}</div>


  onSaveClick: (evt) =>
    if @getInvalidDatums().length > 0
      # TODO : move @errorMessage to state and not forceUpdate
      @errorMessage = "Unable to save. Please correct errors and try again."
      @forceUpdate()
    else
      @errorMessage = null
      model = @getModel()
      return unless model?
      model.save({}, success: @onSaveSuccess)    # saving the model triggers events that will rerender us


  onSaveSuccess: ->
    @_saveModelState()
    @successMessage = "Saved!"


  onCancelClick: (evt) =>
    @errorMessage = null
    @_restoreModelState()
    @_resetDatums()


  getModel: ->
    @props.model || @context.model


  getDatumInputMode: ->
    if @props.readonly then 'readonly' else @datumInputMode


  getInvalidDatums: ->
    _.filter @datums, (d) -> !d.validate()


  ###
    This method is called by the datum children when they mount
  ###
  addDatum: (datumComponent) ->
    @datums.push datumComponent unless datumComponent in @datums


  ###
    This method is called by the datum children when they unmount
  ###
  removeDatum: (datumComponent) ->
    index = @datums.indexOf(datumComponent)
    if index < 0
      console.error "form.removeDatum called for datumComponent (#{datumComponent.constructor.displayName}) that we don't know about?"
      return
    @datums = @datums.slice(0, index).concat(@datums.slice(index + 1, @datums.length))


  _saveModelStateAtRender: ->
    model = @getModel()
    return if model == @_savedModel
    @_saveModelState()


  # save the attributes at this point in time for later restoreModelState when called
  # on cancel
  _saveModelState: ->
    @_savedModel = @getModel()
    # TODO : replace this with lodash extends deep for open source
    @_savedAttrs = $.extend true, {}, @_savedModel.attributes


  _restoreModelState: ->
    model = @getModel()
    # don't ever get confused and save one model's attributes on another
    return if model != @_savedModel
    model.set(@_savedAttrs, silent: true)
    model.trigger('sync', model)


  _resetDatums: ->
    datum.cancelEdit() for datum in @datums
