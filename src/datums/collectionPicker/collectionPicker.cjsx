React = require('react')
Backbone = require('backbone')
_ = require('underscore')
Strhelp = require('bumble-strings')

Datum = require('../datum')

Select = require('react-select')

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

    # Component for rendering the custom options
    optionComponent: React.PropTypes.func

    # Component for rendering the value options
    valueComponent: React.PropTypes.func

    # Attribute which indicates if we need to fetch the model if not found in collection.
    fetchUnknownModelsInCollection: React.PropTypes.bool

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
    displayComponent: React.PropTypes.func
    
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

    # editPlaceholder will be useful in inlineEdit mode when you want to display a 
    # placeholder text which is different from the placeholder which you display before the select editor is displayed
    editPlaceholder: React.PropTypes.string
    
    # if setAsString and multi, set the value of the model as a comma delimited string instead of array of values
    setAsString: React.PropTypes.bool
     

  @defaultProps: _.extend {}, Datum.defaultProps,
    optionSaveAttr: 'id'
    fetchUnknownModelsInCollection: true
    

  @contextTypes: _.extend {}, Datum.contextTypes,
    # see @proptypes.collection above 
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.string
    ])  

  subClassName: "collection-picker"
  selectRef: "reactSelect"

  initializeState: ->
    @state = {
      value: @_getValue()
      errors: []
    }


  componentWillReceiveProps: (nextProps) ->
    prevModelValue = if @props.multi then @getModelValues(@props) else @getModelValue(@props)
    newModelValue = if nextProps.multi then @getModelValues(nextProps) else @getModelValue(nextProps)
    
    if JSON.stringify(prevModelValue) != JSON.stringify(newModelValue)
      @setState({
        value: newModelValue
      })  


  render: ->
    super
    

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

    valueProps = {
      key: modelValue
      className: "collection-picker-display-value"
    }

    if @props.displayComponent?
       valueProps.value = @_getCollectionModelById(modelId)
       return <@props.displayComponent {... valueProps}/>

    return <span  {... valueProps}>
      {modelValue || @renderPlaceholder() || "unknown"}
    </span>
    

  #override
  renderInput: ->
    <Select.Async {... @getSelectAsyncOptions()}/>


  cancelEdit: () ->
    @setState { 
      errors: [], 
      value: @_getValue()
    }

    
  getCollection: ->
    collection = @props.collection || @context.collection
    throw @constructor.displayName + " requires a collection prop or context" unless collection?
    unless collection instanceof Backbone.Collection
      return new Backbone.Collection(collection)
    
    return collection
  

  _getValue: (newProps = @props) ->
    return (if newProps.multi then @getModelValues(newProps) else @getModelValue(newProps))


  _getCollectionModelById: (modelOrId) ->
    if _.isNumber(modelOrId) or _.isString(modelOrId)
      model = @getCollection()?.get(modelOrId, add: @props.fetchUnknownModelsInCollection)
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
  getModelValues: (newProps = @props) ->
    modelValue = @getModelValue(newProps)
    modelValues = switch 
      when _.isString(modelValue) then modelValue.split(',')
      when _.isArray(modelValue) then modelValue
      else 
        [modelValue]
    
    return modelValues
    
    
  getSelectAsyncOptions: () ->
    collection = @getCollection()
    return _.extend {}, @props,
      loadOptions: @onLoadOptions
      placeholder: @props.editPlaceholder || @props.placeholder || @renderPlaceholder()
      value: @state.value
      onChange: @onChange
      onBlur: @onBlur
      options: @getOptionValuesForReactSelect(collection.models)
      labelKey: "label"
      valueKey: "value"
      ref: @selectRef


  isInputValueChanged: ->
    @getInputValue() == @_getValue()
      

  getInputComponent: () =>
    @refs?[@selectRef]


  focus: () =>
    if @getInputComponent()?
      @getInputComponent().focus()


  getOptionValuesForReactSelect: (models) =>
    return [] unless models?
    _.map models, (m) => return {
      label: @getCollectionModelDisplayValue(m) 
      value: @getOptionSaveValue(m)
      model: m # We need this data if we have optionRenderes or optionComponents
    }    
      
  
  # override - react-select returns array of options and not a synth event 
  # super expects a synth event but only uses value   
  onChange: (optionsSelected) =>
    if @props.multi
      values = _.pluck(optionsSelected, 'value')
      values = values.join(',') if @props.setAsString
      super values
    else
      super optionsSelected?.value
      
    

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
    
    unless filteredModels?
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


  # TODO  - this should be optional to allow presorted or custom sorted collections 
  groupSuggestionModels: (userInput, models) =>
    topHits = []
    bottomHits = []
    for model in models
      if Strhelp.weaklyStartsWith(@getOptionDisplayValue(model), userInput)
        topHits.push model
      else
        bottomHits.push model
      
    return topHits.concat(bottomHits)
    
      
      
    
        

    
