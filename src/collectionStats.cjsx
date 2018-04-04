
React = require('./lib/reactLegacy')
Backbone = require('backbone')

# see ./collectionStats.md
module.exports = class CollectionStats extends React.Component
  @displayName: "react-datum.CollectionStats"

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
    total = @collection.getTotalRows?() || @collection.models.length
    displayName = @props.itemDisplayName
    things = switch
      # inflection is loaded globally
      when inflection?.inflect? then inflection.inflect(@props.itemDisplayName, total)
      # ... hack for zuKeeper string helpers
      when displayName.plural? then displayName.plural(total)
      else displayName

    return (
      <span className="found stats fade in">
        Found {@_renderCount(total)} {things}
      </span>
    )


  _renderSelected: ->
    return null unless @collection.hasSelectableCollection
    return(
      <span className="selected stats fade in">
        , {@_renderCount(@collection.getSelectedModels().length)} selected
      </span>
    )


  _renderViewing: ->
    topIndex = @collection.topDisplayIndex || @collection.statsModel?.get('topDisplayIndex')
    bottomIndex = @collection.bottomDisplayIndex || @collection.statsModel?.get('bottomDisplayIndex')
    return null unless topIndex? && bottomIndex
    return (
      <span className="viewing stats fade in">
        Viewing {@_renderCount(topIndex, 'top-index')} - 
        {@_renderCount(bottomIndex, 'bottom-index')}
      </span>
    )
    
  _renderCount: (value, addClass="") ->
    className = ["count", addClass].join(' ')
    return <span className={className}>{value}</span>
