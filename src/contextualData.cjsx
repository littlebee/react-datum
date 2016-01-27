
React = require('react')
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

  # you will also need to similarly extend this, like this:
  #```
  #  @childContextTypes: _.extend {}, ReactDatum.ContextualData.childContextTypes,
  #    collection: React.PropTypes.instanceOf(Backbone.Collection)
  #```
  @childContextTypes: {}
  
  # extend these the same was as above or just replace them
  @defaultProps:
    fetch: false
    fetchOptions: {}
    # we don't define placeholder, that's up to our subclass. with 
    # `placeholder: undefined` by default, there is no placeholder,
    # the renderContent method will always render children
    placeholder: undefined
    

    
  constructor: (props) ->
    super props
    
    @state = 
      lastUpdated: null
      collectionOrModel: null


  getChildContext: ->
    c = {}
    # it should be in state, if not we have a misunderstanding.  If you do it from the 
    # props and context too, might make it difficult to nullify
    c[@contextKey] = @state.collectionOrModel # || @props[@contextKey] || @context[@contextKey]
    return c


  render: ->
    className = "contextual-data #{@contextKey}"
    className += " #{@props.className}" if @props.className?
    return <div className={className}>{@renderContent()}</div>


  # if the model we provide isn't set, render placeholder if user asked nicely
  renderContent: ->
    if @state.collectionOrModel? || @props.placeholder == undefined
      return @props.children
    
    return @props.placeholder


  componentWillUnmount: ->
    @unbindEvents()
    
    
  componentWillMount: ->
    @initializeCollectionOrModel()
    
  
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
    @state.collectionOrModel?.on 'all', @onDataChanged, @


  unbindEvents: () ->
    @state.collectionOrModel?.off 'all', @onDataChanged


  onDataChanged: () =>
    @setState(lastUpdated: Date.now(), collectionOrModel: @getCollectionOrModelToProvide())
