react-datum
============

A set of [React](https://facebook.github.io/react/) components for interacting with Backbone collections and models.
[<img alt="Screenshot from doc/examples/model/model.html" src="https://travis-ci.org/zulily/react-datum.svg?branch=master"
/>](https://travis-ci.org/zulily/react-datum)

## Live Demo & Examples
(http://zulily.github.io/react-datum/docs/examples/)

## Installation

**Install from NPM:**
```bash
npm install react-datum --save
```

** Install from the web: **

Copy development (.js) or optimized (.min.js) distribution file from (https://github.com/zulily/react-datum/tree/master/dist) in with your other vendor js and use a script tag or AMD to load it.  

## What is it?

A set of React components for the presentation and input of attributes from a Backbone model.  

## Usage
```javascript

// Say you have this model:

var kittenModel = new Backbone.Model({
  name: "Fluffy",
  title: "His Royal Cuteness",
  description: "He's a cuddler and a lover through and through",
  forAdoption: true,
  ageInMonths: 10,
  createdAt: 1446520828,
  imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=200&no_scale_up=1",
  sponsorEmail: "kindoldcatlady@lotsofcats.com",
  comment: ""
});

// To create the card below:

var kittenCard = React.createClass({
  displayName:"KittenCard",
  render: function(){
    return (
      <div className='kitten-card'>
        <ReactDatum.Model model={kittenModel}>
          <h3>Adopt <ReactDatum.Text attr="name"/> Today!</h3>
          <div><ReactDatum.LazyPhoto attr="imgUrl"/></div>
          <div><ReactDatum.Text attr="name" label="Name"/> (<ReactDatum.Text attr="title"/>)</div>
          <div><ReactDatum.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
          <ReactDatum.Text attr="description"/>
          <h5>Leave a comment</h5>
          <ReactDatum.Text attr="comment" inputMode="edit"/>
        </ReactDatum.Model>
      </div>
    )
  }
})
ReactDOM.render(React.createElement(kittenCard), document.getElementById('demo'))

```
*screenshot - click to view demo:*

[<img alt="Screenshot from doc/examples/model/model.html" src="http://zulily.github.io/react-datum/img/docs/react-datum_model-example.png"
/>](http://zulily.github.io/react-datum/docs/examples/#model)


## For Display and Input!

In the example above, the comment field, having the `inputMode="edit"` prop, renders as an input and when the user enters a comment and blurs the input,  `kittenModel.set('comment', userEnteredValue)` is called.

Adding the **ReactDatum.Form** component, you can easily convert the above into a editable form with save and cancel buttons:

```javascript
var kittenCard = React.createClass({
  displayName:"KittenCard",
  render: function(){
    return (
      <div className='kitten-card'>
        <Rd.Model model={kittenModel}>
          <h3>Adopt <Rd.Text attr="name"/> Today!</h3>
          <Rd.Form>
            <div><Rd.LazyPhoto attr="imgUrl"/></div>
            <div><Rd.Text attr="name" label="Name" setOnChange/> (<Rd.Text attr="title"/>)</div>
            <label>Say something about <Rd.Text attr="name" readonly/>: </label>
            <div><Rd.Text attr="description" className="wide-input"/></div>
            <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor"/></div>
            <label>Leave a Comment!</label>
            <div><Rd.Text attr="comment" className="wide-input"/></div>
          </Rd.Form>
        </Rd.Model>
      </div>
    )
  }
})
```
*screenshot - click to view demo:*

[<img alt="Screenshot from doc/examples/form/form.html" src="http://zulily.github.io/react-datum/img/docs/react-datum_form-example.png"
/>](http://zulily.github.io/react-datum/docs/examples/#form)

When the user presses save, model.save() is called.   All of the attributes were set() when the user entered new values.  If cancel is clicked, the model and subsequently, the form are reset back to the state of the last model.save().

By wrapping the datums in the **ReactDatum.Form** tag, they implicitedly recieve `inputMode='edit'` props that make them all render as inputs.  Almost all.  Some Datums, like **ReactDatum.LazyPhoto**, only have a display presentation, no update.  If given an `inputMode='edit'` they will ignore, and continue showing their display (`inputMode='readonly'``) representation.  
 
#### Reacting to Model changes

In the form example above, the **ReactDatum.Text** input component labeled "Name" in the form was given a 'setOnChange' prop.  When the name input is changed by the user, every character entered causes `kittenModel.set('name', userEnteredValue)` to be called.  Since all children of the **ReactDatum.model** component virtually rerender on every triggered event, the form updates as you type and the two other references to the 'name' attribute in labels on the form are updated as you type.  

Pretty cool, but mostly just a parlor trick.  The reasoning behind using `{silent: true}` on set() by default is that, in most cases, users will get confused as to the saved state of the data. Since `model.save()` is not called until the user presses the 'Save' button, a table or grid cell changing as you type in the edit form is probably not what you want because it may imply that the changes have been saved.   

## ReactDatum.Model

The **ReactDatum.Model** component provides a 'model' context, that is the Backbone model instance, to any of it's descendants that want to use it.  All datums will also accept a model by means of a prop called 'model'.  

The **ReactDatum.Model** component is also responsible for listening to Backbone model events and rerendering descendants anytime a change occurs to the model.   

## Forms and Input

The **ReactDatum.Form** component provides an 'inputMode' context to it's descendants.

Any contextually provided properties like the 'model' that the datum is acting on, or the 'inputMode' implied by being in a **ReactDatum.Form**, can be overriden by explict React properties, or "props".  So, if in the example above, the comments were stored in another model, you could break out of context by adding the model prop:  

```javascript
        <ReactDatum.Text attr="comment", model={kittenCommentsModel}/>
```
You could also specify that a particular datum is always inputMode='readonly'.  Since this is so common, a convenience prop, 'readonly', is provided and recognized by all datums.
```javascript
        <ReactDatum.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink readonly/>
```
Adding readonly on the **ReactDatum.Form** component is also supported for programmatically making the whole form render all datums readonly except those that are explicity provided an 'inputMode' prop.  

The **ReactDatum.ClickToEditForm** is an extension of **ReactDatum.Form** that provides an edit button that switches the form and all datums seemlessly between readonly and edit modes.  One form for both display and update!   

## Validations

All datums support the 'required' prop.  The 'required' prop is a validation that will cause the input to show an error icon and popover with message if the input is blank.  Other datums support more validations.  

Some validations are implicit.  For example, the **ReactDatum.Date** input will validate that you have entered a valid, parsable date and the **ReactDatum.Email** component will validate that a semi valid e-mail address was entered.   **ReactDatum.Number** and **ReactDatum.WholeNumber** components have optional minValue and maxValue props which results in a validation error on change if the value is less or greater respectively.

All validations are instant and complete.  For example, if you have a whole number that is both required and has a minValue=10, erasing the input value will result in immediate error indicator with both errors displayed in the popover.

**ReactDatum.Form** will not save a form (will not call model.save()) if any of the Datums in it are invalid.  An error message is displayed requesting the user to correct the errors to continue.

## Extensible and Reusable!

All of the Datums can be extended using either ES6:  `class myClass extends ReactDatum.Number` or using CoffeeScript: 
```coffeescript
  ###
    A lightweight extension of ReactDatum number for hightlighting certain numbers,
    by default negative,  in red when thresholds are exceeded 
  ###
  class x.RedNumber extends ReactDatum.Number
    @displayName: "widgets.react.RedNumber"

    @propTypes = _.extend {}, ReactDatum.Number.propTypes,
      upperThreshold: React.PropTypes.number
      lowerThreshold: React.PropTypes.number
      
    
    @defaultProps = _.extend {}, ReactDatum.Number.defaultProps,
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

The object oriented API of ReactDatum is documented in our [API Docs](http://zulily.github.io/react-datum/docs/).   

Enough reading, [check out the demos!](http://zulily.github.io/react-datum/docs/examples/)
