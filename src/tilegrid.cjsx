App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/tilegridReact'
  'views/widgets/tilegrid/singleSelect'
  'views/widgets/tilegrid/multiSelect'


], (x, [React, ReactDom, loadedLibs...]) ->

  class x.Tilegrid extends React.Component
    @displayName: "widgets.react.Tilegrid"

    @propTypes:
      # can also accept collection through the @context.collection (see, widgets.react.Collection)
      # can accept any of the acceptable Tilegrid constructor arg 'data'
      collection: React.PropTypes.any
      # tileTemplate can be passed by prop or by virtue of a <Tile> child element.  This can also be a
      # string template to render oldschool style.  Note that tileTemplate prop has precendence
      tileTemplate: React.PropTypes.node
      # if you have an custom tilegrid to use like that in bundles, this may work, but only if your
      # constructor arguments are in sync with those of base Tilegrid class
      # (note: func is a class)
      tilegridClass: React.PropTypes.func
      # see widgets.Tilegrid constructor
      tilegridOptions: React.PropTypes.object
      # set this to null for no selection behavior, App.views.widgets.tilegrid.multiSelect, or other
      tilegridSelectionClass: React.PropTypes.func
      # see widgets.tilegrid.SingleSelect constructor
      tilegridSelectOptions: React.PropTypes.object


    @defaultProps:
      tilegridClass: App.views.widgets.TilegridReact
      tileTemplate: null
      tilegridOptions: {}
      tilegridSelectionClass: App.views.widgets.tilegrid.SingleSelect


    @contextTypes:
      # can accept any of the acceptable Tilegrid constructor arg 'data'
      collection: React.PropTypes.any


    # this is a direct dom thing
    render: -> <div className='tilegrid-react'/>


    componentDidMount: ->
      @node = ReactDom.findDOMNode(this)
      @collection = @props.collection || @context.collection
      @tileTemplate = @_getTileTemplate()

      @tilegrid = new @props.tilegridClass(@node, @collection, @tileTemplate, @props.tilegridOptions)
      if @props.tilegridSelectionClass?
        new @props.tilegridSelectionClass(@tilegrid, @props.tilegridSelectOptions)


    componentWillUnmount: ->
      React.unmountComponentAtNode(@node)
      @tilegrid.destroy()


    componentWillReceiveProps: ->
      @tilegrid.refresh()    # rerenders all rendered tiles


    _getTileTemplate: ->
      @props.tileTemplate || @_findTileChild()


    _findTileChild: ->
      # for now we'll just return all children.  Maybe eventually have a way specifying
      # multiple child <Tile>s that are by type of data?  like,  <R.Tile for={App.models.Event}>
      #for child in React.Children.toArray(@props.children)
      #  return React.cloneElement(child) if child.type="Tile"
      return @props.children
