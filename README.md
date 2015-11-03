react-datum
============
A set of [React](https://facebook.github.io/react/) components for interacting with Backbone collections and models.

## Demo & Examples
*comming soon!*

## Installation

Install from NPM:
```bash
npm install react-datum --save
```

Install using Bower:
```bash
# comming soon
```

Install from the web:  Copy file at (TODO: add link to checked in min dist file here)

## Usage:
Say you have this model:
```javascript
var kittenModel = new Backbone.model({
  name: "Fluffy",
  title: "His Royal Cuteness",
  description: "He's a cuddler and a lover through and through",
  forAdoption: true,
  ageInMonths: 10,
  createdAt: 1446520828
  imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=632&no_scale_up=1"
  sponsorEmail: "kindoldcatlady@lotsofcats.com"
  comment: ""
})
```
to render a card for this model with react-datum:

```javascript
Rd = require('react-datum')

Kitten = React.CreateClass({
  render: function() {
    return (
      <div className='kitten-card'>
        <Rd.Model model={kittenModel}>
          <h3>Adopt <Rd.Text attr="name"/> Today!</h3>
          <div><Rd.LazyPhoto attr="imgUrl"/></div>
          <div><Rd.Text attr="name" label="Name"/> (<Rd.Text attr="title"/>)</div>
          <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
          <Rd.Text attr="description">
          <h5>Leave a comment</h5>
          <Rd.Text attr="comment" inputMode="edit"/>
        </Rd.Model>
      </div>
    )
  }
})
```
The 'Rd.Model' component provides the model to the other Rd child elements. 'Rd.Text', 'Rd.LazyPhoto', 'Rd.Text', and 'Rd.Email' are just a few of the Datums provided by this package.  

## What are "Datums"
*and you do realize that the plural of "datum" is "data"

Datums are the presentation of attributes from a Backbone model.  All are object oriented extentions of the Datum class that provide a display `inputMode='readonly'` (default) and optionally an input presentation `inputMode='edit'`.

In the example above, the comment field renders as an input and when the user enters a comment, `kittenModel.set('comment', userEnteredValue)` is called. Using the **Rd.Form** component, you can easily convert the above into a editable form with a save and and cancel buttons:

```javascript
Rd = require('react-datum')

Kitten = React.CreateClass({
  render: function() {
    return (
      <div className='kitten-card'>
        <Rd.Model model={kittenModel}>
          <h3>Adopt <Rd.Text attr="name"/> Today!</h3>
          <Rd.Form>
            <div><Rd.LazyPhoto attr="imgUrl"/></div>
            <div><Rd.Text attr="name" label="Name"/> (<Rd.Text attr="title"/>)</div>
            <div><Rd.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink/></div>
            <Rd.Text attr="description">
            <h5>Leave a comment</h5>
            <Rd.Text attr="comment"/>
          </Rd.Form>
        </Rd.Model>
      </div>
    )
  }
})
```
By wrapping the datums in the <Rd.Form> tag, they implicitedly recieve inputMode='edit' props that make them all present inputs.  Almost all.  Some Datums, like Rd.LazyPhoto, only have a display mode, no editing.  If given an inputMode='edit' they will ignore any continue showing their display representation.  

## Implied Context, Deterministic Props

Any contextually provided properties like the 'model' that the data is acting on, or the inputMode implied by being in a form, can be overriden by explict properties.  So, if in the example above, the comments were stored in another model, you could break out of context by adding:  
```javascript
        <Rd.Text attr="comment", model={kittenCommentsModel}/>
```
You could also specify that a particular datum in this case is always inputMode='readonly'.  Since this is so common, a convience property,  'readonly' is provided
```javascript
        <Rd.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink readonly/>
```
Adding readonly on the <Rd.Form> is also supported for programmatically making the form render all datums readonly except those that are provided explicity inputMode prop

## Validations

All datums support the 'required' prop.  The 'required' prop will cause the input to show an error icon and popover with message if the input is blank.  Other Datums support more validations.  Some validations are implicit.  For example, the Rd.Date input will validate that you have entered a valid, parsable date and the Rd.Email component will validate that a semi valid e-mail address was entered.   Rd.Number and Rd.WholeNumber components have minValue and maxValue which results in a validation error on change.

Rd.Form will not save a form (will not call model.save()) if any of the Datums in it are invalid.
