App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/datum'

], (x, [React, ReactDom, loadedLibs...]) ->

  ###
    For like text!  See also Datum

    the Datum base class does most of the work by default of handling text, but for JSX
    beauty, let's create an extension specifically for text data
  ###
  class x.Text extends x.Datum
    @displayName: "widgets.react.Text"


    render: ->
      super    # for breakpoint debugging
