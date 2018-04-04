
React = require('../lib/reactLegacy')
_ = require('underscore')

Datum = require('./datum')

###
  For rendering and input of email addresses.  Can render mailto: links like 
  `<a href="mailto:">` in display mode
  
  Validates that email address is a semi valid email based on matching 
  `/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/` 
###
module.exports = class Email extends Datum
  @displayName: "react-datum.Email"

  @propTypes: _.extend {}, Datum.propTypes,
    # If true, display as mailto address link when `inputMode='readonly'`
    displayAsLink: React.PropTypes.bool

  constructor: (props) ->
    super
    @addValidations @validateEmail


  renderValueForDisplay: ->
    value = super
    return if @props.displayAsLink
      <a href={@getMailToHref(value)}>{value}</a>
    else
      value


  getMailToHref: (value) ->
    return "mailto:#{value}"


  validateEmail: (value) =>
    return true if value.match /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return "Invalid email address.  Should be like 'bob@zulily.com'"
