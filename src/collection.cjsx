App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/contextualData'

], (x, [React, ReactDom, loadedLibs...]) ->

  ###
    Collection component provides a collection context to all children
  ###
  class x.Collection extends x.ContextualData
    @displayName: "widgets.react.Collection"

    # this is the class of thing being placed in the context.
    dataType:  Backbone.Collection
    # this is the key in @context children should use to access thing
    contextKey: 'collection'


    @propTypes: _.extend {}, x.ContextualData.propTypes,
      collection: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Backbone.Collection)
        React.PropTypes.func
      ]).isRequired


    @childContextTypes: _.extend {}, x.ContextualData.childContextTypes,
      collection: React.PropTypes.instanceOf(Backbone.Collection)
