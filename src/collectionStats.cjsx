
React = require('react')
Inflection = require('inflection')

require('css!/css/views/collectionStats.css')

###
  **CollectionStats** provides information about the items in your collection.

  Requires either a 'collection' context or prop.  And displays counts of
  items found, selected (if SelectableCollection) and viewing.
###
module.exports = class CollectionStats extends React.Component
  @displayName: "widgets.react.CollectionStats"

  @propTypes:
    # a Backbone.Collection
    collection: React.PropTypes.instanceOf(Backbone.Collection)

    # used as the display name for found items. ex.
    #```javascript
    #  <CollectionStats itemDisplayName="thing"/>
    #```
    # => "Found 1,230 things".
    itemDisplayName: React.PropTypes.string

  @defaultProps:
    itemDisplayName: "item"

  @contextTypes:
    collection: React.PropTypes.instanceOf(Backbone.Collection)


  render: ->
    @collection = @props.collection || @context.collection
    unless @collection?
      throw "#{@constructor.displayName} needs a collection prop or react-datum Collection context parent"

    return (
      <div className='collection-stats'>
        {@_renderFound()}
        {@_renderSelected()}
        {@_renderViewing()}
      </div>
    )


  _renderFound: ->
    total = @collection.getTotalRows()
    things = Inflection.inflect(@props.itemDisplayName, total)
    return (
      <span className="found stats fade in">
        Found {total} {things}
      </span>
    )


  _renderSelected: ->
    return null unless @collection.isSelectable
    return(
      <span className="selected stats fade in">
        , {@collection.getSelectedModels().length} selected
      </span>
    )


  _renderViewing: ->
    return null unless @collection.topDisplayIndex? && @collection.bottomDisplayIndex
    return (
      <span className="viewing stats fade in">
        Viewing {@collection.topDisplayIndex} - {@collection.bottomDisplayIndex}
      </span>
    )
