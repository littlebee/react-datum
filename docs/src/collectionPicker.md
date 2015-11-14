### ReactDatum.CollectionPicker

This react-datum component provides a selector (picker) based on react-select.  That looks up an ID, such
as maybe a userID on a model in another collection such as a Users collection.

simple example:
```jsx
  <ReactDatum.CollectionPicker 
    attr="userId" 
    model="myOtherModel" 
    collection="usersCollection" 
    displayAttr="fullName"/>
```
In display mode, the CollectionPicker above will display the fullName from a model with with matching ID 
in usersCollection instance var.   In inputMode='edit', the suggestions would also render the displayAttr
because we didn't specify a suggestionAttr prop

#### Asynchronous suggestions

Use the asyncLoadCallback prop to load suggestions asynchronously from a server:
```jsx
  loadData = function(userInput, doneCallback) {
    usersCollection.fetch({
      data: {search: userInput}
      success: function(model. response) {
        # doneCallback accepts error and collection, array of models, 
        # or array of {label: "displan name", value: "value"} 
        doneCallback(null, usersCollection)
      }
    )
  }
  <ReactDatum.CollectionPicker 
    attr="userId" 
    model="myOtherModel" 
    collection="usersCollection" 
    asyncLoadCallback={loadData} 
  />
```

#### Custom display

By default the CollectionPicker will display the value of 