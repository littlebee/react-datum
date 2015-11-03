App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/contextualData'

], (x, [React, ReactDom, loadedLibs...]) ->

  ###
    Model react component provides a model context to all children
  ###
  class x.Model extends x.ContextualData
    @displayName: "widgets.react.Model"

    # this is the class of thing being placed in the context.
    dataType:  Backbone.Model
    # this is the key in @context children should use to access thing
    contextKey: 'model'


    @propTypes: _.extend {}, x.ContextualData.propTypes,
      model: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Backbone.Model)
        React.PropTypes.func
      ]).isRequired


    @childContextTypes: _.extend {}, x.ContextualData.childContextTypes,
      model: React.PropTypes.instanceOf(Backbone.Model)
