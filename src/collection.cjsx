
React = require('./lib/reactLegacy')
Backbone = require('backbone')
_ = require('underscore')
SelectableCollection = require('selectable-collection')

ContextualData = require('./contextualData')


# see ./collection.md
module.exports = class Collection extends ContextualData
  @displayName: "react-datum.Collection"

  # this is the class of thing being placed in the context.
  dataType:  Backbone.Collection
  # this is the key in @context children should use to access thing
  contextKey: 'collection'

  @collectionPropType: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Backbone.Collection)
    React.PropTypes.array
  ])

  @propTypes: _.extend {}, ContextualData.propTypes,
    # can only accept collection via prop.  Collection component should
    # not interfere with any parent Collection commponent or other that
    # would provide a collection context, but it will become the provider
    # of collection context for all of it's children
    collection: @collectionPropType.isRequired


  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
    collection: @collectionPropType


  # override - adds SelectableCollection mixin to collection if it doesn't already
  #    have it
  setCollectionOrModel: () ->
    super
    collection = @state.collectionOrModel  # for clarity
    unless !collection? || collection.hasSelectableCollectionMixin
      SelectableCollection.applyTo(collection)

    return collection
