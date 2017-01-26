
This is base class of all display+input components that render presentation of an attribute from a Backbone.Model or Javascript object.

There is one required prop, 'attr' - the model attribute name.

There are two modes of presentation controlled by the `inputMode` prop.  All Datums support `inputMode="readonly"` - the display presentation of the data; and most support `inputMode="edit"` - the input or form presentation of the attribute. The default presentation is `inputMode="readonly"` 

The backbone model or javascript object to get and set attributes on is specified in the @props.model or @context.model. Note that @props.model always has precendence.

Display attributes from a Backbone model:

```jsx
render: function(){

  user = new UserModel()
  user.fetch()

  // you don't need to wait for the fetch to complete because we are using
  // the **Model** contextual data component below which will rerender when
  // the model triggers 'sync'

  return (
    <Model model={user}>
      <Datum attr="firstName" label="First Name: "/>
      <Datum attr="lastName" label="Last Name: "/>
      <Datum attr="title"/>
    </Model>
  )
}
```

Note that for clarity we have provided the **Text** datum which will also ellipsize the display value for you.  You should probably use that instead of using **Datum** directly like the example above.  e.g.
```
  <Text attr="firstName" label="FirstName"/>
```

#### Validations

Datums support validations.  All validation methods should return either true or an error message.  All datums should support 'required' validation prop.

To make a datum required, simply add the required prop to the component.  Ex:
```
  <Text attr="name" required>
```
Validations are run at time of change and the datum element will get an invalid class for optional styling.  An exclamation icon is rendered and has a popup that will show all errors for that input.

#### Metadata

Several of the Datum props can be given values via metadata.   If the model associated with this datum has a getDatumMetadata() method, it will be called with the following arguments: `(prop, datumInstance)`  

`prop` is the name of the datum prop for which metadata is being requested.
`datumInstance` is a reference to the datum component instance.  You can use the documented API methods on datumInstance, such as datumInstance.getModel() to get the model associated with datumInstance. Or as in the example below, to get the attribute name associated with the datum.

```jsx
var modelMetadata = {
  firstName: {
    label: "First Name",
    tooltip: "This is the user's first given name"
  }
  lastName: {
    label: "Last Name",
    tooltip: "This is the user's legal last name or family name"
    placeholder: "no last name (sorta like Madonna)"
  }
}

var UserModel = Backbone.Model.extend({
  
  getDatumMetadata: function(prop, datumInstance){
    attrMetadata = modelMetadata[datumInstance.props.attr]
    if( attrMetadata == null ){ 
      return null 
    } 
    return attrMetadata[prop]
  }
})

user = new UserModel()
user.fetch()

var userCard = React.createClass({
  render: function(){
    return (
      <ReactDatum.Model model={user}>
        <ReactDatum.Text attr="firstName"/>
        <ReactDatum.Text attr="lastName" tooltip="Simply the last name (no Madonnas allowed)"/>
        <ReactDatum.Text attr="title"/>
      </ReactDatum.Model>
    )
  }
})
```
The example above would have labels on firstName and lastName, since they are not given label props.   The firstName datum would also be given the tooltip associated with it in the metadata.  The lastName datum would recieve the tooltip associated with it via the JSX.   

Metadata values are only used if a prop is not specified.

See also getMetadata callback prop in [DatumProps](#Datum-propTypes)


#### ReactBootstrap 

If ReactBootstrap is available globally, Datum will use that for the ellipsize and validation error popovers.  You can style the popover as you will.  

#### Extending ReactDatum.Datum

Datum, and any of it's descendants, can be extended using either ES6 or Coffeescript inheritance.  The API docs below call out the methods that you will most likely need to override or extend for customization.

```coffeescript
  ###
    A lightweight extension of ReactDatum number for hightlighting certain numbers,
    by default negative,  in red when thresholds are exceeded 
  ###
  class x.RedNumber extends ReactDatum.Number
    @displayName: "widgets.react.RedNumber"

    @propTypes: _.extend {}, ReactDatum.Number.propTypes,
      upperThreshold: React.PropTypes.number
      lowerThreshold: React.PropTypes.number
      
    
    @defaultProps: _.extend {}, ReactDatum.Number.defaultProps,
      lowerThreshold: 0
      # no upper threshold by default makes all numbers less than zero red
      
      
    renderValueForDisplay: ->
      superRendering = super
      value = @getValueForDisplay()
      upperExceeded = @props.upperThreshold? && value > @props.upperThreshold
      lowerExceeded = @props.lowerThreshold? && value < @props.lowerThreshold
      style = if upperExceeded || lowerExceeded
        {color: 'red'}
      else
        {}
      
      <span style={style}>{superRendering}</span>
``` 

The example above simply extends ReactDatum.Number, adds a couple of additional props and extends the renderValueForDisplay method.  

  




