
React = require('react')
Datum = require('./datum')

###
  For whole numbers (no decimal input allowed).
###
module.exports = class WholeNumber extends Number
  @displayName: "widgets.react.WholeNumber"

  charactersMustMatch: /^\-?[0-9]*$/
