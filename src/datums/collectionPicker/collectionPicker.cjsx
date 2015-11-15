React = require('react')
Datum = require('../datum')

_ = require('underscore')
Backbone = require('backbone')


# See docs/src/collectionPicker.md
module.exports = class CollectionPicker extends Datum
  @displayName: "react-datum.CollectionPicker"
  
  @propTypes: _.extend {}, Datum.propTypes,
    # can also accept collection instance as context var. prop has precendence
    # can also be the string name of a shared collection (see ../sharedCollection.cjsx)
    # can also accept an array of [{lable: "option 1", id: 1}, ...]
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
      React.PropTypes.array
    ])  
    #  attribute value from model in lookup collection to render in inputMode='readonly'.
    #  if not specified, model.toString() will be displayed
    displayAttr: React.PropTypes.string
    # react component to render when in inputMode='readonly'. 
    displayComponent: React.PropTypes.node
    # attribute value from model in lookup collection to render in suggestions when 
    # in inputMode='edit'.  If not specified, @props.displayAttr is used and if that
    # is not specified, model.toString() is used
    optionAttr: React.PropTypes.string
    # react component to render as suggestion option 
    optionComponent: React.PropTypes.node
    # can accept and display multiple values.  If this prop is set, we assume that 
    # value of our @props.model.get(@props.attr) returns the IDs either as an
    # array or comma separated value.  
    multi: React.PropTypes.bool
    # Specify a callback to load suggestions asynchronously.  
    # The callback method  should accept the following arguments: 
    #   `(collection, userInput, doneCallback)` 
    # where 
    #   `collection` is the value of the collection prop
    #   `userInput` is the what the user has entered so far 
    #   `doneCallback` is a method to be called with (error, data) when data is ready.
    #       the first argument, `error` should be false or an error that will be thrown
    #       `data` argument should be one of the types of data accepted as the   
    asyncLoadCallback: React.PropTypes.func
    # these props are passed to the underlying react-select component. 
    # Note that we use Select.Async and that the follow props are overridden by
    # props above: `multi`, 'loadCallback' (see props.asyncLoadCallback), 
    # `optionComponent`
    reactSelectProps: React.PropTypes.object
    
    
  @contextTypes: _.extend {}, Datum.contextTypes,
    # see @proptypes.collection above 
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
    ])  
  
  
  #overrirde - if multi, returns an array of values that renderEllipsizeValue wraps in spans
  renderValueForDisplay: ->
    collection = @getCollection() 
    return if @props.multi
      modelValues = @getModelValues()
      modelValues.map (modelValue) =>
        @renderCollectionDisplayValue(modelValue, collection)
    else
      @renderCollectionDisplayValue(@getModelValue(), collection)
    

  renderCollectionDisplayValue: (modelId, collection=@getCollection()) ->
    modelValue = @getCollectionModelDisplayValue(modelId, collection)
    modelValue = @renderEllipsizedValue(modelValue) if modelValue
        
    return <span key={modelValue} className="collection-picker-display-value">
      {modelValue || @renderPlaceholder() || "unknown"}
    </span>
    

  #override
  renderInput: ->
    placeholder = @props.placeholder || ""
    value = @getValueForInput()
    <input type="text" placeholder={placeholder} value={value} onChange={@onChange} ref={@onInputRef}/>

    
  getCollection: ->
    collection = @props.collection || @context.collection
    throw @constructor.displayName + " requires a collection prop or context" unless collection?
    unless collection instanceof Backbone.Collection
      return new Backbone.Collection(collection)
    
    return collection
  
  
  getCollectionModelDisplayValue: (modelId, collection) ->
    return null unless modelId 
    model = collection?.get(modelId, add: true)
    if model? && !_.isFunction(model.toString) && !@props.displayAttr?
      throw @constructor.displayName + ": You need to specify a displayAttr prop or model must have toString() method"
    
    if @props.displayAttr? then model?.get(@props.displayAttr) else model.toString()
    


  # for multi mode, always returns an array
  getModelValues: () ->
    modelValue = @getModelValue()
    modelValues = switch 
      when _.isString(modelValue) then modelValue.split(',')
      when _.isArray(modelValue) then modelValue
      else 
        [modelValue]
    
    return modelValues
        

    
