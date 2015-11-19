
### ReactDatum.Datum

This is base class of all display+input components that render presentation of an attribute from a Backbone.Model or Javascript object.

There is one required prop, 'attr' - the model attribute name.

There are two modes of presentation controlled by the `inputMode` prop.  All Datums support `inputMode="readonly"` - the display presentation of the data; and most support `inputMode="edit"` - the input or form presentation of the attribute. The default presentation is `inputMode="readonly"` 

The backbone model or javascript object to get and set attributes on is specified in the @props.model or @context.model. Note that @props.model always has precendence.

TODO :  More Examples

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
      <Datum attr="firstName" label="Last Name: "/>
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

#### ReactBootstrap 

If ReactBootstrap is available globally, Datum will use that for the ellipsize and validation error popovers.  You can style the popover as you will.  

#### Extending ReactDatum.Datum

Datum, and any of it's descendants, can be extended using either ES6 or Coffeescript inheritance.  The API docs below call out the methods that you will most likely need to override or extend for customization.

TODO : link to examples - 1 ea. coffeescript and es6

  




