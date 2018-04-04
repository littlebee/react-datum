
React = require('./lib/reactLegacy')
Backbone = require('backbone')
_ = require('underscore')

###
  This is an abstract base class for contextual data components like ReactDatum.Collection 
  and ReactDatum.Model that provide a single contextual data element.
  
  The ReactDatum.ContextualData base class also provides the listener to model or collection
  events and rendering of child components on changes.
  
  You shouldn't need to use this class directly.
###  
module.exports = class ContextualData extends React.Component
  #  don't forget your display name so you get semi-intelligent errors from react
  #@displayName: "react-datum.Model"

  ###
    This is the class of thing being placed in the context.
      ex. `Backbone.Model` or `Backbone.Collection`
  ###
  dataType:  null
  
  ###
   this is the key in @context children should use to access thing
    ex. "model"
  ###
  contextKey: null


  # you will also possibly want to extend these in your child class.  like this:
  # ```
  #   @proptypes: _.extend {}, ReactDatum.ContextualData.propTypes,
  #     collection: React.PropTypes.oneOfType([
  #       React.PropTypes.instanceOf(Backbone.Collection)
  #       React.PropTypes.func
  #     ]).isRequired
  # ```
  @propTypes:
    # set this to true to issue the initial fetch of the collection on mount
    fetch: React.PropTypes.bool
    # passed through to collection|model fetch
    fetchOptions: React.PropTypes.object
    # something to render if our input model|collection is not available
    placeholder: React.PropTypes.node  # anything react can render
    # additional css classes to add
    className: React.PropTypes.string
    # set debouncedUpdate = false to not debounce, i.e. 1:1 collection or
    # model triggered events to renders. 
    debouncedUpdate: React.PropTypes.bool
    # set debounceMs to a higher delay. 
    debounceMs: React.PropTypes.number
    # set to true to show console messages about useful things
    debug: React.PropTypes.bool
    # style override object for the rendered div.
    style: React.PropTypes.object

  # you will also need to similarly extend this, like this:
  #```
  #  @childContextTypes: _.extend {}, ReactDatum.ContextualData.childContextTypes,
  #    collection: React.PropTypes.instanceOf(Backbone.Collection)
  #```
  @childContextTypes: {}
  
  # extend these the same was as above or just replace them
  @defaultProps:
    # when true, we will automatically fetch the model or collection on mount
    fetch: false
    # additional fetch options (see Backbone Collection|Model fetch() options)
    fetchOptions: {}
    # We don't define placeholder, that's up to our subclass. with 
    # `placeholder: undefined` by default, there is no placeholder,
    # the renderContent method will always render children.  
    # To render no placeholder but not render children, set this to null
    placeholder: undefined
    # We do not define any default style data.
    style: {}
    # effectively batch and defer multiple syncronous events into one defaults to  
    # 0s debounce which will effectively ignore all but the last triggered event
    # in a long sequence
    debouncedUpdate: true
    debounceMs: 0
    
    

    
  constructor: (props) ->
    super props
    
    @state = 
      lastUpdated: null
      collectionOrModel: null

    # we don't want to delay, but we do want to head off a stampeed when
    # many events fire subsquently like after a large collection.add.
    #  
    # debounceMs is an undocumented prop because I'm not sure it's a good idea
    @debouncedUpdate = if @props.debouncedUpdate 
      _.debounce @update, @props.debounceMs
    else
      @update


  getChildContext: ->
    c = {}
    # it should be in state, if not we have a misunderstanding.  If you do it from the 
    # props and context too, might make it difficult to nullify
    c[@contextKey] = @state.collectionOrModel # || @props[@contextKey] || @context[@contextKey]
    return c


  render: ->
    className = "contextual-data #{@contextKey}"
    className += " #{@props.className}" if @props.className?
    return <span style={_.extend({}, @props.style)} className={className}>{@renderContent()}</span>


  # if the model we provide isn't set, render placeholder if user asked nicely
  renderContent: ->
    if @state.collectionOrModel? || @props.placeholder == undefined
      return @props.children
    
    return @props.placeholder


  ### !pragma coverage-skip-next ###
  componentWillUnmount: ->
    @unbindEvents()
    
    
  componentWillMount: ->
    @initializeCollectionOrModel()
    
  
  ### !pragma coverage-skip-next ###
  componentWillReceiveProps: (newProps)->
    @props = newProps
    @initializeCollectionOrModel()
    
    
  # api
  

  ###
    override this model to do a custom fetch method like fetchForUser or some such
  ###
  fetchCollectionOrModel: () ->
    @state.collectionOrModel.fetch(@props.fetchOptions) 


  ###
    extend this method to provide additional initialization on the 
    thing you provide.  You should probably call super
  ###
  initializeCollectionOrModel: () ->
    # we already have a model and the props model hasn't changed
    return unless @needsReinitializing()

    @unbindEvents()
    @setCollectionOrModel()
    @bindEvents()
    if @props.fetch && @state.collectionOrModel?
      @fetchCollectionOrModel()
  
      
  ###
    override this method to input from somewhere other than the context or props being passed in
  ###
  getInputCollectionOrModel: () ->
    @props[@contextKey] || @context[@contextKey]
  
  
  ###
    override or extend this method to provide something other than what we recieve
  ###  
  getCollectionOrModelToProvide: () ->
    # TODO : I think this should be `@state.collectionOrModel || @getInputCollectionOrModel()`
    #    that way an extension can just set the provided thing into state instead
    #    of being forced to override this method
    @getInputCollectionOrModel()
    

  ###
    extend this method to provide additional tests to determine if initialization is 
    needed.  You should probably extend this method like so:
    ```
      return super() || this._someOtherTest()
    ```
  ###
  needsReinitializing: () ->
    collectionOrModel = @getCollectionOrModelToProvide()
    truth = !@state.collectionOrModel? ||collectionOrModel != @_lastPropsModel
    @_lastPropsModel = collectionOrModel
    return truth


  setCollectionOrModel: () ->
    collectionOrModel = @getCollectionOrModelToProvide()

    @setState(collectionOrModel: collectionOrModel)
    # TODO : why do I need to do this.  @setState seems to not immediately take above
    # and later code on this path depends on this being set
    @state.collectionOrModel = collectionOrModel


  bindEvents: () ->
    @state.collectionOrModel?.on?('all', @onDataChanged, @)


  unbindEvents: () ->
    @state.collectionOrModel?.off?('all', @onDataChanged)


  onDataChanged: () =>
    @debouncedUpdate()
    
    
  update: () =>
    if @props.debug
      console.log "ContextualData: update on model", @state.collectionOrModel
    
    @setState(lastUpdated: Date.now(), collectionOrModel: @getCollectionOrModelToProvide())
    if @props.forceUpdate
      @forceUpdate()
        
        
