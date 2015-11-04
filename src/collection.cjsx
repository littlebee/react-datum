
React = require('react')
ReactDom = require('react-dom')
ContextualData = require('./contextualData')
SelectableCollection = require('mixins/SelectableCollection')


###
  Collection component
  - provides a collection context to all children
  - rerenders children on collection changes
  - adds SelectableCollection mixin to collection if it doesn't already have it
  - will optionally fetch the collection
  - can accept either a Collection class (which will be instantiated) or a
  collection instance variable to another collection or Collection component

###
module.exports = class Collection extends ContextualData
  @displayName: "widgets.react.Collection"

  # this is the class of thing being placed in the context.
  dataType:  Backbone.Collection
  # this is the key in @context children should use to access thing
  contextKey: 'collection'


  @propTypes: _.extend {}, ContextualData.propTypes,
    collection: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Backbone.Collection)
      React.PropTypes.func
    ]).isRequired


  @childContextTypes: _.extend {}, ContextualData.childContextTypes,
    collection: React.PropTypes.instanceOf(Backbone.Collection)


  # override - adds SelectableCollection mixin to collection if it doesn't already
  #    have it
  _setDataItem: () ->
    super
    @collection = @dataItem  # for clarity
    unless @collection.hasSelectableCollectionMixin
      SelectableCollection.mixInto(@collection)

    return @collection
