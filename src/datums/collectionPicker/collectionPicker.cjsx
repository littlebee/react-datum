React = require('react')
Datum = require('../datum')

_ = require('underscore')
Backbone = require('backbone')

require("babel-core/register")

Select = require('react-select/src/Select')

###!See docs/src/collectionPicker.md###
module.exports = class CollectionPicker extends Datum
  @displayName: "react-datum.CollectionPicker"
  
  @propTypes: _.extend {}, Datum.propTypes,
    ###
      Can also accept collection instance as context var. prop has precendence
      Can also be the string name of a shared collection (see ../sharedCollection.cjsx)
      Can also accept an array of [{lable: "option 1", id: 1}, ...]
    ###
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
      React.PropTypes.array
    ])
    ###  
      Attribute value from model in lookup collection to render in inputMode='readonly'.
      if not specified, model.toString() will be displayed
    ###
    displayAttr: React.PropTypes.string
    ###
      attribute value from model in lookup collection to render in suggestions when 
      in inputMode='edit'.  If not specified, @props.displayAttr is used and if that
      is not specified, model.toString() is used
    ###
    optionAttr: React.PropTypes.string

    ### react component to render when in inputMode='readonly'. ###
    displayComponent: React.PropTypes.node
    
    ###
      TODO : tests!
      Specify a callback to load suggestions asynchronously.  
      The callback method  should accept the following arguments: 
        `(collection, userInput, ayncOptions, doneCallback)` 
      where 
        `collection` is the value of the collection prop
        `userInput` is the what the user has entered so far  
        `doneCallback` is a method to be called with `(error, data)` when data is ready.
            the first argument, `error` should be false or an error that will be thrown
            `data` argument should be an array of Backbone.Models or array of 
                  {label: "string", value: "string"} pairs
        `asyncOptions` is the options object passed via prop to CollectionPicker 

      Note that internally, CollectionPicker always renders a Select.Async when inputMode='edit' 
      and provides an internal loadOptions method to pull suggestions from the models in 
      the lookup collection. 
      
      *Where do they all come from?*  
      
      We will use the first of these methods to filter suggestions, in order of precedence: 
        **Collection.filterForPicker()**  - if we find a method on the collection called 
          'filterForPicker' - it will be called with `(userInput, doneCallback, asyncOptions)`
          and should return an array of models to render suggestions from 
        **props.asyncSuggestionCallback** - this prop
        **Internal filter** (this.filterOptions(userInput, doneCallback)) seaches through the 
          props.optionAttr of models currently in the collection to find suggestions based on 
          userInput 
        
    ###
    asyncSuggestionCallback: React.PropTypes.func
    
    ###
      Options above are proprietary to the CollectionPicker component.
      
      Remaining options are passed through to react-select, see # [react-select](https://github.com/JedWatson/react-select)
      
      You can use any of the options supported by react-select Select and Select.Async, 
      *except for the loadOptions prop* of Select.Async.  

      see # [react-select](https://github.com/JedWatson/react-select) for additional props    
       
      can accept and display multiple values.  If this prop is set, we assume that 
      value of our @props.model.get(@props.attr) returns the IDs either as an
      array or comma separated value.  
    ###
    multi: React.PropTypes.bool
    
    
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
    
    <Select.Async 
      placeholder={placeholder} 
      value={value} 
      onChange={@onChange} 
      ref={@onInputRef}/>

    
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
    
    
  getSelectAsyncOptions: () ->
    _extend {}, @props, 
      loadOptions: @onLoadOptions
      
  # async callback for react-select      
  onLoadOptions: (userInput, callback) =>
    
    
        

    
