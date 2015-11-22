### ReactDatum.Collection

This react-datum component provides datums with a Backbone collection and rerenders descendants on collection changes.  

Any descendant datum or react-datum based components like (ReactDatum.TileGrid)[TODO: add a link do doc page], or the (ReactDatum.SelectedModel)[TODO: add link to doc page] that accept a `collection` context or prop, can be wrapped in a ReactDatum.Collection component and will respond to changes in the collection.  

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

#### Adds selection tracking to collection

In order for the components such as ReactDatum.Tilegrid and ReactDatum.SelectedModel to have a common understanding of what is selected,  a small mixin called SelectableCollection is added to the collection, unless the collection has an instance variable hasSelectableCollectionMixin=`true`. 

Once used with the ReactDatum.Collection component, your Backbone collection instance will be given the following methods:

- `getSelectedModels()`  returns array of currently selected models

- `selectModel(model, selected=true, options={})`  selects the model. default options: {silent: false}

- `selectModelById(id, selected=true, options={})`  see selectModel()

- `selectModelByIndex(index, selected=true, options={})`  see selectModel()

- `selectAll(options={})` default options: {silent: false}

- `selectNone(options{})` default options: {silent: false}

A console warning will be issued if any of the methods above already exist on a collection without this.hasSelectableCollectionMixin==true.   

If you use another mixin or service for this, it should be relatively easy to build a bridge. Just add the methods above to your collection and call the existing plugin, mixin or external methods.


