
This react-datum component provides a selector (picker) based on [react-select](https://jedwatson.github.io/react-select/).  

The `props.attr` on `props.model` should return and id or other key that is used to find a model in a collection and display a value from the lookup model.   

Say for example, you have a model like this:
```javascript
  var kittenModel = new Backbone.Model({
    name: "Fluffy",
    title: "His Royal Cuteness",
    updatedByUserId: 905793
  });
```
and a collection of users like this:
```javascript
  var usersCollection = new Backbone.Collection([{
    id: 905793
    fullName: "Jane Doe"
  },{
    ...
  }])
```
To display the user's full name instead of the id:
```jsx
  <ReactDatum.CollectionPicker 
    attr="updatedByUserId"   
    model={kittenModel}
    collection={usersCollection}
    displayAttr="fullName"/>
```

In `inputMode ='readonly'`, the CollectionPicker above will display the fullName from a model in the usersCollection with id matching kittenModel.get('updatedByUserId') from usersCollection instance var.   

In `inputMode='edit'`, the suggestions would also render the displayAttr because we didn't specify a suggestionAttr prop

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

By default the CollectionPicker will display the value of props.model.get(props.displayAttr),
or model.toString() (if it exists and no displayAttr specified).  

You can provide custom rendering via the the `optionComponent`, `valueComponent` and 
`displayComponent` props.  

The optionComponent and valueComponent are passed throught to [react-select](http://jedwatson.github.io/react-select/).  For optionComponent, you are required to handle and pass events back through the props given. Providing a custom option render, is a little longish, but value display is easy. The GravatarOption and GravatarValue components below were taken directly from the  [react-select CustomComponents example](https://github.com/JedWatson/react-select/blob/master/examples/src/components/CustomComponents.js)

To provide a custom option (suggestion) display:

```jsx
  const GravatarOption = React.createClass({
  	propTypes: {
  		className: React.PropTypes.string,
  		isDisabled: React.PropTypes.bool,
  		isFocused: React.PropTypes.bool,
  		isSelected: React.PropTypes.bool,
  		onSelect: React.PropTypes.func,
  		onFocus: React.PropTypes.func,
  		onUnfocus: React.PropTypes.func,
  		option: React.PropTypes.object.isRequired,
  	},
  	handleMouseDown (event) {
  		event.preventDefault();
  		event.stopPropagation();
  		this.props.onSelect(this.props.option, event);
  	},
  	handleMouseEnter (event) {
  		this.props.onFocus(this.props.option, event);
  	},
  	handleMouseMove (event) {
  		if (this.props.focused) return;
  		this.props.onFocus(this.props.option, event);
  	},
  	handleMouseLeave (event) {
  		this.props.onUnfocus(this.props.option, event);
  	},
  	render () {
  		let gravatarStyle = {
  			borderRadius: 3,
  			display: 'inline-block',
  			marginRight: 10,
  			position: 'relative',
  			top: -2,
  			verticalAlign: 'middle',
  		};
  		return (
  			<div className={this.props.className}
  				onMouseDown={this.handleMouseDown}
  				onMouseEnter={this.handleMouseEnter}
  				onMouseMove={this.handleMouseMove}
  				onMouseLeave={this.handleMouseLeave}
  				title={this.props.option.title}>
  				<Gravatar email={this.props.option.email} size={GRAVATAR_SIZE} style={gravatarStyle} />
  				{this.props.children}
  			</div>
  		);
  	}
  });

  <CollectionPicker
    model={myModel}
    collection={usersCollection}
    optionComponent={GravatarOption}
    placeholder="Select user"
  />
```

You can also provide a custom value display for the current value displayed when the input doesn't
have focus:
```jsx

const GravatarValue = React.createClass({
	propTypes: {
		placeholder: React.PropTypes.string,
		value: React.PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<Gravatar email={this.props.value.email} size={GRAVATAR_SIZE} style={gravatarStyle} />
					{this.props.children}
				</span>
			</div>
		);
	}
});


<CollectionPicker
  model={myModel}
  collection={usersCollection}
  valueComponent={GravatarValue}
  placeholder="Select user"
/>
```

Custom display when CollectionPicker is in inputMode="readonly" is even easier:

TODO:  finish me!




