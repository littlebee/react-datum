React = require('react')
Backbone = require('backbone')
_ = require('underscore')
Strhelp = require('bumble-strings')

Datum = require('../datum')

Select = require('react-select/src/Select')
Select.Async = require('react-select/src/Async')

# See ./collectionPicker.md 
module.exports = class CollectionPicker extends Datum
  @displayName: "react-datum.CollectionPicker"
  
  @propTypes: _.extend {}, Datum.propTypes,
    #  TBD: Can also be the string name of a shared collection (see ../sharedCollection.cjsx)
    #  TBD: Can also accept an array of [{lable: "option 1", id: 1}, ...]
    #  
    #  Can also accept collection instance as context var via ReactDatum.Collection component. 
    #    prop has precendence
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
      React.PropTypes.array
    ])
    
    #  Attribute value from model in lookup collection to render in inputMode='readonly'.
    #  if not specified, model.toString() will be displayed
    displayAttr: React.PropTypes.string
    
    #  attribute value from model in lookup collection to render in suggestions when 
    #  in inputMode='edit'.  If not specified, @props.displayAttr is used and if that
    #  is not specified, model.toString() is used
    optionDisplayAttr: React.PropTypes.string

    #  attribute value from model in lookup collection to set as value on props.attr
    #  in props.model
    optionSaveAttr: React.PropTypes.string.isRequired

    # react component to render when in inputMode='readonly'. 
    displayComponent: React.PropTypes.node
    
    #  Specify a callback to load suggestions asynchronously.  
    #  The callback method  should accept the following arguments: 
    #    `(collection, userInput, ayncOptions, doneCallback)` 
    #  where 
    #    `collection` is the value of the collection prop
    #    `userInput` is the what the user has entered so far  
    #    `doneCallback` is a method to be called with `(error, data)` when data is ready.
    #        the first argument, `error` should be false or an error that will be thrown
    #        `data` argument should be an array of Backbone.Models or array of 
    #              {label: "string", value: "string"} pairs
    #    `asyncOptions` is the options object passed via prop to CollectionPicker 
    #
    #  Note that internally, CollectionPicker always renders a Select.Async when inputMode='edit' 
    #  and provides an internal loadOptions method to pull suggestions from the models in 
    #  the lookup collection. 
    #  
    #  *Where do they all come from?*  
    #  
    #  We will use the returned filtered set of models from the following chain (in order):
    #    **Collection.filterForPicker()**  - if we find a method on the collection called 
    #      'filterForPicker' - it will be called with `(userInput, doneCallback, asyncOptions)`
    #      and should return an array of models to render suggestions from 
    #    **props.asyncSuggestionCallback** - this prop
    #    **Internal filter** (this.filterOptions(userInput, doneCallback)) seaches through the 
    #      props.optionDisplayAttr of models currently in the collection to find suggestions based on 
    #      userInput and groups results
    #  TODO : tests!
    asyncSuggestionCallback: React.PropTypes.func
    
    #  Options above are proprietary to the CollectionPicker component.
    #  
    #  Remaining options are passed through to react-select, see # [react-select](https://github.com/JedWatson/react-select)
    #  
    #  You can use any of the options supported by react-select Select and Select.Async, 
    #  *except for the loadOptions prop* of Select.Async.  
    #
    #  see # [react-select](https://github.com/JedWatson/react-select) for additional props    
    #   
    #  can accept and display multiple values.  If this prop is set, we assume that 
    #  value of our @props.model.get(@props.attr) returns the IDs either as an
    #  array or comma separated value.  
    multi: React.PropTypes.bool
    
    
  @defaultProps: _.extend {}, Datum.defaultProps,
    optionSaveAttr: 'id'
    
    
  @contextTypes: _.extend {}, Datum.contextTypes,
    # see @proptypes.collection above 
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
    ])  
  
  subClassName: "collection-picker"
  
  
  #override - if multi, returns an array of values that renderEllipsizeValue wraps in spans
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
    <Select.Async {... @getSelectAsyncOptions()}/>

    
  getCollection: ->
    collection = @props.collection || @context.collection
    throw @constructor.displayName + " requires a collection prop or context" unless collection?
    unless collection instanceof Backbone.Collection
      return new Backbone.Collection(collection)
    
    return collection
    
    
  _getCollectionModelById: (modelOrId) ->
    if _.isNumber modelOrId
      model = @getCollection()?.get(modelOrId, add: true)
    else
      model = modelOrId    
  
  
  getCollectionModelDisplayValue: (modelId, collection) ->
    return null unless modelId 
    model = @_getCollectionModelById(modelId)
      
    if model? && !_.isFunction(model.toString) && !@props.displayAttr?
      throw @constructor.displayName + ": You need to specify a displayAttr prop or model must have toString() method"
    
    if @props.displayAttr? then model?.get(@props.displayAttr) else model.toString?()
    

  getOptionDisplayValue: (modelId, collection) ->
    return null unless modelId
    model = @_getCollectionModelById(modelId)
    
    if model? && !_.isFunction(model.toString) && !@props.optionDisplayAttr?
      throw @constructor.displayName + ": You need to specify an optionDisplayAttr prop or model must have toString() method"
    
    if @props.optionDisplayAttr? then model?.get(@props.optionDisplayAttr) else model.toString?()
        

  getOptionSaveValue: (modelId, collection) ->
    model = @_getCollectionModelById(modelId)
    if model? && !@props.optionsSaveAttr?
      return model.id 
    
    return model?.get(@props.optionSaveAttr)
    

  # used for multi mode. always returns an array
  getModelValues: () ->
    modelValue = @getModelValue()
    modelValues = switch 
      when _.isString(modelValue) then modelValue.split(',')
      when _.isArray(modelValue) then modelValue
      else 
        [modelValue]
    
    return modelValues
    
    
  getSelectAsyncOptions: () ->
    collection = @getCollection()
    value = if @props.multi then @getModelValues() else @getModelValue()
    return _.extend {}, @props, 
      loadOptions: @onLoadOptions
      placeholder: @props.placeholder || @renderPlaceholder()
      value: value
      onChange: @onChange
      ref: @onInputRef
      options: @getOptionValuesForReactSelect(collection.models)
      labelKey: "label"
      valueKey: "value"
      ref: "reactSelect"
      
    
  getOptionValuesForReactSelect: (models) =>
    return [] unless models?
    _.map models, (m) => return {
      label: @getCollectionModelDisplayValue(m) 
      value: @getOptionSaveValue(m)
    }    
      
  
  # override - react-select returns array of options and not an event    
  onChange: (optionsSelected) =>
    if @props.multi
      values = _.pluck(optionsSelected, 'value')
      values = values.join(',') unless @props.setAsArray 
      super {target: {value: values}}
    else
      super {target: {value: optionsSelected.value}}
      
      
  # async callback for react-select      
  onLoadOptions: (userInput, callback) =>
    collection = @getCollection()
    
    chainedCallback = (error, models) =>
      if arguments.length < 2
        models = error
        error = false
      models = @groupSuggestionModels(userInput, models)
      optionsForReactSelect = @getOptionValuesForReactSelect(models)
      
      callback(null, {options: optionsForReactSelect})
    
    
    filteredModels = collection.filterForPicker?(userInput, chainedCallback, @props.asyncOptions)
    filteredModels ||= @props.asyncSuggestionCallback?(collection, userInput, chainedCallback, @props.asyncOptions)
    filteredModels ||= @filterSuggestionModels(collection, userInput, chainedCallback, @props.asyncOptions)
    
    unless filterModels?
      chainedCallback(collection.models)
      return;
      
    
  ### weak string compare userInput to suggestion model's display value ###
  filterSuggestionModels: (collection, userInput, callback) =>
    # filter to just those with match anywhere
    filteredModels = _.filter collection.models, (model) => 
      Strhelp.weaklyHas(@getOptionDisplayValue(model), userInput)

    # sort all by display value alpha, case insensitive
    filteredModels = filteredModels.sort (a, b) =>
      Strhelp.weaklyCompare(@getOptionDisplayValue(a), @getOptionDisplayValue(b))

    callback?(filteredModels)
    return filteredModels
    
    
  groupSuggestionModels: (userInput, models) =>
    topHits = []
    bottomHits = []
    for model in models
      if Strhelp.weaklyStartsWith(@getOptionDisplayValue(model), userInput)
        topHits.push model
      else
        bottomHits.push model
      
    return topHits.concat(bottomHits)
    
      
      
    
        

    
