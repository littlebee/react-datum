App.namespace 'App.views.widgets.react', require: [
  'react'
  'react-dom'

  'views/widgets/react/number'

], (x, [React, ReactDom, loadedLibs...]) ->

  ###
    For whole numbers (no decimal input allowed).
  ###
  class x.WholeNumber extends x.Number
    @displayName: "widgets.react.WholeNumber"

    charactersMustMatch: /^\-?[0-9]*$/
