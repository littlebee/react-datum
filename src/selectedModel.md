### ReactDatum.SelectedModel

This react-datum component provides datums with a Backbone model that is selected model in the collection.  It also  rerenders descendants on collection selection changes.  

Any descendant datum that accept a `model` context or prop, can be wrapped in a **ReactDatum.SelectedModel** component and will respond to changes in the model and on changes to the selected model in the collection.

Simple example:
```jsx
  var Rd = ReactDatum;
  
  <Rd.SelectedModel collection={myBackboneCollection} placeholder="Wait for it...">
    <Rd.Text label="You selected: " attr="name"/>
  </Rd.SelectedModel>
  
  var index = 0;
  setInterval(function(){
    myBackboneCollection.selectModelByIndex(index);
    index += 1;
  }, 5000)

```
The (example above)[TODO: add link to github.io example] when run, will initially display a placeholder, "Wait for it..." and then every five seconds select the next model in the collection. 

The placeholder prop will render in place of any children when there is no selected model in the collection and can be any React renderable.

#### SelectableCollection mixin

Use of the SelectedModel component will automatically add the ReactDatum.SelectableCollection to the collection instance unless collection.hasSelectableCollectionMixin is true.  **setModelByIndex(index)** in the example above is one of the methods added by that mixin. See (ReactDatum.SelectableCollection)[TODO: add doc link]


