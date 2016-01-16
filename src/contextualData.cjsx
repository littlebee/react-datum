
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

  ### you need to override these ###

  # this is the class of thing being placed in the context.
  # ex. `Backbone.Model` or `Backbone.Collection`
  dataType:  null
  # this is the key in @context children should use to access thing
  # ex. "model"
  contextKey: null

  #  end of pure virtuals 

  # you will also possibly want to extend these in your child class.  like this:
  # ```
  #   @proptypes: _.extend {}, ContextualData.propTypes,
  #     collection: React.PropTypes.oneOfType([
  #       React.PropTypes.instanceOf(Backbone.Collection)
  #       React.PropTypes.func
  #     ]).isRequired
  # ```
  @propTypes:
    fetch: React.PropTypes.bool
    fetchOptions: React.PropTypes.object

  # you will also need to similarly extend this, like this:
  #```
  #  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
  #    collection: React.PropTypes.instanceOf(Backbone.Collection)
  #```
  @childContextTypes: {}
  
  # extend these the same was as above or just replace them
  @defaultProps:
    fetch: false
    fetchOptions: {}
    
  constructor: (props) ->
    super props
    
    @state = 
      lastUpdated: null
      collectionOrModel: null
    

  # that's it!  most of the rest should not need to be overridden or extended

  getChildContext: ->
    c = {}
    c[@contextKey] = @state.collectionOrModel
    return c


  render: ->
    return <div className={@contextKey}>{@renderContent()}</div>


  # some children render a placeholder if collectionOrModel is empty
  renderContent: ->
    return @props.children


  componentWillUnmount: ->
    @_unbindEvents()
    
    
  componentWillMount: ->
    @_initializeCollectionOrModel()
    
  
  componentWillReceiveProps: (newProps)->
    @props = newProps
    @_initializeCollectionOrModel()
    
    
  # api
  


  # implementation
  
  _initializeCollectionOrModel: () ->
    # we already have a model and the props model hasn't changed
    return unless @_needsReinitializing()

    @_unbindEvents()
    @_setCollectionOrModel()
    @_bindEvents()
    if @props.fetch && @state.collectionOrModel?
      @state.collectionOrModel.fetch(@props.fetchOptions) 


  _getInputCollectionOrModel: () ->
    @props[@contextKey] || @context[@contextKey]
    

  _needsReinitializing: () ->
    collectionOrModel = @_getInputCollectionOrModel()
    truth = !@state.collectionOrModel? ||collectionOrModel != @_lastPropsModel
    @_lastPropsModel = collectionOrModel
    return truth


  _setCollectionOrModel: () ->
    collectionOrModel = @_getInputCollectionOrModel()

    @context[@contextKey] = collectionOrModel

    @setState(collectionOrModel: collectionOrModel)
    # TODO : why do I need to do this.  @setState seems to not immediately take above
    # and later code on this path depends on this being set
    @state.collectionOrModel = collectionOrModel


  _bindEvents: () ->
    @state.collectionOrModel?.on 'all', @_onDataChanged, @


  _unbindEvents: () ->
    @state.collectionOrModel?.off 'all', @_onDataChanged


  _onDataChanged: () =>
    @setState(lastUpdated: Date.now())
