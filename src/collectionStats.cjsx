App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'css!/css/views/collectionStats.css'

], (x, [React, ReactDom, loadedLibs...]) ->

  class x.CollectionStats extends React.Component
    @displayName: "widgets.react.CollectionStats"

    @propTypes:
      collection: React.PropTypes.instanceOf(Backbone.Collection)
      itemDisplayName: React.PropTypes.string

    @defaultProps:
      itemDisplayName: "item"

    @contextTypes:
      collection: React.PropTypes.instanceOf(Backbone.Collection)


    render: ->
      @collection = @props.collection || @context.collection
      unless @collection?
        throw "#{@constructor.displayName} needs a collection prop or app.widgets.react.Collection context parent"

      return (
        <div className='collection-stats'>
          {@_renderFound()}
          {@_renderSelected()}
          {@_renderViewing()}
        </div>
      )


    _renderFound: ->
      total = @collection.getTotalRows()
      if @collection.fetching
        return <img className="loading-indicator fade in" src="/img/bar_loading.gif"/>
      else
        return (
          <span className="found stats fade in">
            Found {total} {@props.itemDisplayName.plural(total)}
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
      statsModel = @collection.statsModel
      return null unless statsModel?.topDisplayIndex?
      return (
        <span className="viewing stats fade in">
          Viewing {statsModel.topDisplayIndex} - {statsModel.bottomDisplayIndex}
        </span>
      )
