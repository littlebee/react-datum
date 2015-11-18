### ReactDatum.Collection

This react-datum component provides datums with a Backbone collection and rerenders descendants on collection changes.  

Any descendant datum or react-datum based components like (TileGrid)[TODO: add a link do doc page], or the (SelectedModel)[TODO: add link to doc page] that accept a `collection` context or prop, can be wrapped in a **ReactDatum.Collection** component and will respond to changes in the collection.  

Simple example:
```jsx
  var Rd = ReactDatum;
  
  <Rd.Collection collection={myBackboneCollection}>
    <Rd.SelectedModel placeholder="Wait for it...">
      <Rd.Text label="You selected: " attr="name"/>
    </Rd.SelectedModel>
  </Rd>
  
  var index = 0;
  setInterval(function(){
    myBackboneCollection.selectModelByIndex(index);
    index += 1;
  }, 5000)

```
The (example above)[TODO: add link to github.io example] when run, will initially display a placeholder, "Wait for it..." and then every five seconds select a new model. See (SelectedModel)[TODO: add link to doc page] for more information about selections.