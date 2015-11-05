react-datum
============
[![build status](https://gitlab.corp.zulily.com/ci/projects/10/status.png?ref=master)](https://gitlab.corp.zulily.com/ci/projects/10?ref=master)


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
var kittenModel = new Backbone.Model({
  name: "Fluffy",
  title: "His Royal Cuteness",
  description: "He's a cuddler and a lover through and through",
  forAdoption: true,
  ageInMonths: 10,
  createdAt: 1446520828,
  imgUrl: "https://drpem3xzef3kf.cloudfront.net/photos/pets/32707403/1/?bust=1436666804&width=632&no_scale_up=1",
  sponsorEmail: "kindoldcatlady@lotsofcats.com",
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
          <Rd.Text attr="description"/>
          <h5>Leave a comment</h5>
          <Rd.Text attr="comment" inputMode="edit"/>
        </Rd.Model>
      </div>
    )
  }
})
```
The **Rd.Model** component provides the model to the other Rd child elements. **Rd.Text**, **Rd.LazyPhoto**, **Rd.Text**, and **Rd.Email** are just a few of the Datums provided by this package.  

The **Rd.Model** component introduces the concept of contextual data, and provides a provides a 'model' context to any of it's children that want to use it.  The datums like **Rd.Text** will also accept a model by means of a prop called 'model'.  The **Rd.Model** component also listens to Backbone Model events and forces a rerender of all children anytime a change occurs to the model.   

## What are "Datums"
*and you do realize that the plural of "datum" is "data", don't you?*

Datums are the presentation of attributes from a Backbone model.  All are object oriented extentions of the Datum class that provide a display `inputMode='readonly'` (default) and optionally an input presentation `inputMode='edit'`.  

Datums interact with the model only by .get() and .set().  Datums do not directly listen to any model events.  The contextual data components are what cause datums to rerender in reponse to model changes.  

### For Display and Input

In the example above, the comment field, having the `inputMode="edit"` prop, renders as an input and when the user enters a comment, `kittenModel.set('comment', userEnteredValue)` is called. Using the **Rd.Form** component, you can easily convert the above into a editable form with a save and cancel buttons:

```javascript
Rd = require('react-datum')

KittenCard = React.CreateClass({
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
By wrapping the datums in the **Rd.Form** tag, they implicitedly recieve `inputMode='edit'` props that make them all render as inputs.  Almost all.  Some Datums, like **Rd.LazyPhoto**, only have a display mode, no editing.  If given an `inputMode='edit'` they will ignore, and continue showing their display ('readonly') representation.  

## Implied Context, Deterministic Props

Any contextually provided properties like the 'model' that the datum is acting on, or the 'inputMode' implied by being in a **Rd.Form**, can be overriden by explict properties.  So, if in the example above, the comments were stored in another model, you could break out of context by adding:  
```javascript
        <Rd.Text attr="comment", model={kittenCommentsModel}/>
```
You could also specify that a particular datum in this case is always inputMode='readonly'.  Since this is so common, a convenience prop,  'readonly' is provided and recognized by all datums.
```javascript
        <Rd.Email attr="sponsorEmail" label="Adoption Sponsor" displayLink readonly/>
```
Adding readonly on the **Rd.Form** component is also supported for programmatically making the whole form render all datums readonly except those that are provided explicity 'inputMode' prop.  And, on the subject of forms and 'inputMode', checkout the **Rd.ClickToEditForm** for an extension of **Rd.Form** that provides an edit button that switches all datums seemlessly between readonly and edit modes.  One form for both display and editing!   

## Validations

All datums support the 'required' prop.  The 'required' prop will cause the input to show an error icon and popover with message if the input is blank.  Other datums support more validations.  

Some validations are implicit.  For example, the **Rd.Date** input will validate that you have entered a valid, parsable date and the **Rd.Email** component will validate that a semi valid e-mail address was entered.   **Rd.Number** and **Rd.WholeNumber** components have optional minValue and maxValue props which results in a validation error on change if the value is less or greater respectively.

All validations are instant and complete.  For example, if you have a whole number that is both required and has a minValue=10, erasing the input value will result in immediate error indicator with both errors displayed in the popover.

**Rd.Form** will not save a form (will not call model.save()) if any of the Datums in it are invalid.  An error message is displayed requesting the user to correct the errors to continue.

# Development

## Test

We write tests using [Jest](https://facebook.github.io/jest/). Test files are written in CoffeeScript. To run tests locally, do
 
     npm test
     
Tests are also triggered whenever a new commit is pushed to the master branch.