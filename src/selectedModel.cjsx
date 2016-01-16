
React = require('react')
Backbone = require('backbone')
ContextualData = require('./contextualData')

# see ./selectedModel.md
module.exports = class SelectedModel extends ContextualData
  @displayName: "react-datum.SelectedModel"

  # this class also supplies a "model" context to it's children that is
  # the selected model in the collection we recieve as a prop or context
  dataType:  Backbone.Model
  # this is the key in @context children should use to access thing
  contextKey: 'model'

  # we don't need any of the base propTypes and our collection prop can also be
  # given as a context arg
  @proptypes:
    collection: React.PropTypes.instanceOf(Backbone.Collection)
    placeholder: React.PropTypes.node  # anything react can render

  @contextTypes:
    collection: React.PropTypes.instanceOf(Backbone.Collection)

  @childContextTypes:
    model: React.PropTypes.instanceOf(Backbone.Model)


  # extends super: renders placeholder if provided or blank when
  # there is no selected model
  renderContent: ->
    superContent = super
    if @state.collectionOrModel?
      return superContent
      
    return <div className="large-placeholder">{@props.placeholder}</div>


  # extends - also need to consider our inbound context collection may have changed
  _needsReinitializing: () ->
    truth = super() || @context.collection != @_lastContextCollection
    @_lastContextCollection = @context.collection
    return truth;


  # override - @collectionOrModel should be the selected model in the collection
  _getInputCollectionOrModel: () ->
    collection = @props.collection || @context.collection 
    return collection?.getSelectedModels?()[0]


  # extends - in addition to listening to our selected model events, listen for
  # selections changed on collection
  _bindEvents: (model) ->
    super
    @collection?.on "selectionsChanged", @_onSelectionsChanged


  _unbindEvents: () ->
    super
    @collection?.off "selectionsChanged", @_onSelectionsChanged


  _onSelectionsChanged: =>
    @_unbindEvents()
    @_setCollectionOrModel()
    @_bindEvents()
    @forceUpdate()
