
React = require('./lib/reactLegacy')
ReactDom = require('react-dom')
Datum = require('./datums/datum')
Backbone = require('backbone')
_ = require('underscore')

# see ./form.md 
module.exports = class Form extends React.Component
  @displayName: "react-datum.Form"

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
    
    # you can specify any method on the model to call when save is clicked
    # TODO : add ability to also pass in a func?  would need to accept model, attrs, options
    modelSaveMethod: React.PropTypes.string
    
    #  no formMode like zform, but we have to support programatic readonly
    #  see also ClickToEditForm component.   readonly should always take precendence
    readonly: React.PropTypes.bool
    
    # you can style a buttonPossiton: 'top' to float left or right in css.
    buttonPosition: React.PropTypes.oneOf(['top', 'bottom', 'none'])
    
    # specify className of form element
    className: React.PropTypes.string
    
    # on save success this method, if specified, will be called with the standard
    # Backbone success callback arguments (model, response, options)
    # If you don't specify a saveSuccessCallback, a small success message will be rerendered
    # below the form button after successfully saving the form
    saveSuccessCallback: React.PropTypes.func
    
    # on save error this method, if specified, will be called with the standard
    # Backbone error callback arguments (model, response, options)
    # If you don't specify a saveErrorCallback, an error message will be rerendered
    # below the form button after failing to save the form on user request
    saveErrorCallback: React.PropTypes.func


  @defaultProps:
    readonly: false
    buttonPosition: 'bottom'
    className: 'form'
    modelSaveMethod: 'save'


  @contextTypes:
    ### can also accept model instance as a prop.  prop has precendence ###
    model: @modelOrObject()

  
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
    @state =
      errorMessage: null
      successMessage: null


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

    <div className={"form #{@datumInputMode} #{@props.className}"}>
      {@renderTopButtons()}
      {@renderChildren()}
      {@renderBottomButtons()}
      {@renderMessages()}
    </div>


  componentDidMount: ->
    @node = ReactDom.findDOMNode(this)


  ###
    Gives the first editable datum focus
  ###
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
      <button key="save" ref="saveButton" className='btn btn-success' onClick={@onSaveClick}>Save</button>
      <button key="cancel" ref="cancelButton" className='btn' onClick={@onCancelClick}>Cancel</button>
    ]


  renderMessages: ->
    return [
      @renderSuccessMessage()
      @renderErrorMessage()
    ]


  renderErrorMessage: ->
    @renderMessage @state.errorMessage, 'error'


  renderSuccessMessage: ->
    @renderMessage @state.successMessage, 'success'


  renderMessage: (message, className) ->
    return null unless message?
    fullClassName = "datum-form-message-#{className} #{className}"
    <div key={className} className={fullClassName}>{message}</div>


  ###
    Save the changes from datums on the form to the Backbone model. 
    
    Calls model.save after first attempting to validate() the model.  Handles 
    inconsistencies in model.validate() between versions 0.9.2 - 1.2.2 of Backbone.
    
    The user clicking on the save button belonging to the Form will call this Method
    
    The options argument is passed on to Backbone model.save()
  ###
  save: (options={})->
    options = _.defaults options,
      validateDatums: true      # TODO : these should also be @props
      validateModel: true
      
    @setState errorMessage: null, successMessage: null
    model = @getModel()
    
    if options.validateDatums and not @validateDatums(options)
      @onSaveError model, "Correct errors and try again."
      return

    if options.validateModel and not @validateModel(options)
      @onSaveError model, model.validationError
      return

    # saving the model triggers events that will rerender us
    return @saveModel(options)


  ###
    Validate the datums on the form. 
    
    returns false if any are currently invalid
  ###
  validateDatums: (options={}) ->
    if @getInvalidDatums().length > 0
      @setState errorMessage: "Please correct errors and try again."
      return false
      
    return true
    
  
  ###
    Calls Backbone model.validate and handles inconsistencies in model.validate() 
    between versions 0.9.2 - 1.2.2 of Backbone.
  ###    
  validateModel: (options={}) ->
    model = @getModel()
    return unless model?

    try
      # Note that backbone 0.9.2 would call error callback on save if the model was
      # invalid.  Somewhere around 1.1, that is no more.  Now the model returns false
      # from save and you have to check a new model instance attribute called validationError
      unless model.isValid()
        if model.validationError?
          return false
    catch 
      null
      # Backbone 0.9.2 isValid will exception if the model subject doesn't have a
      #   validate() method
      
    # if model was not valid but there is no .validationError, then we are probably
    # dealing with an earlier version of Backbone. Let it fall out through the
    # error handler on save    
    return true;
    
    
  
  # TODO : move this to somewhere utilitarian
  preceedOriginalCallback: (obj, attr, newCallback) ->
    originalCallback = obj[attr]
    obj[attr] = () ->
      newCallback.apply(this, arguments)
      originalCallback?.apply(this, argumentsk)

  ###  
    calls Backbone model.save and calls success and error handlers. 
    
    You should probably call Form.save() above instead.  It will also validate the model 
    and datums.  
  ### 
  saveModel: (options={}) ->
    model = @getModel() 
    return unless model?
    
    @preceedOriginalCallback(options, 'success', @onSaveSuccess)
    @preceedOriginalCallback(options, 'error', @onSaveError)
    saved = model[@props.modelSaveMethod]({}, options)
      

  onSaveClick: (evt) =>
    @save()


  onSaveSuccess: (model, response, options={}) =>
    @_saveModelState()
    if @props.saveSuccessCallback? && _.isFunction @props.saveSuccessCallback
      @props.saveSuccessCallback(model, response, options)
    else
      @setState successMessage: "Successfully saved!", successAt: Date.now()


  onSaveError: (model, response, options={}) =>
    if @props.saveErrorCallback? && _.isFunction @props.saveErrorCallback
      @props.saveErrorCallback(model, response, options)
    else
      response = if !response? || _.isString(response) then response else JSON.stringify(response)
      @setState errorMessage: "Unable to save. " + response || "Reason unknown."


  onCancelClick: (evt) =>
    @setState errorMessage: null, successMessage: null
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
    @_savedAttrs = @_savedModel.toJSON()


  _restoreModelState: ->
    model = @getModel()
    # don't ever get confused and save one model's attributes on another
    return if model != @_savedModel
    model.set(@_savedAttrs)
    
    


  _resetDatums: ->
    datum.cancelEdit() for datum in @datums
