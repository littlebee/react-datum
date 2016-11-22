
This react-datum component is for the presentation and input of text. See also ReactDatum.Datum. The Datum base class does much of the work by default of handling text. 

Text Component provides the following additional features:
- Display values can be ellipsized via ellipsizeAt prop.  
- Values are ellipsized by default to prevent unexpected long strings from breaking your layout
- Can display HTML via the displayAsHtml prop

**A note about using displayAsHtml**

It's not advised unless you are sure as to the sanity of the data value you are displaying.  The danger is in cross site scripting attacks.  Read more [here](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

Also note that using `displayAsHtml` and anything other than `ellipsizeAt={false}` is not advised as you may end up ellipsizing in the middle of an element and leave unclosed tags or, worse, break your entire layout. 

For example, given this model:
```jsx
  model = new Backbone.model({name="Foo Bar", description="Lorem ipsum <b>dolor sit amet</b>, consectetur adipiscing elit. Duis rhoncus lacinia lectus a volutpat. this could go on forever"});
```
this will render the description truncated with ellipsis to not exceed 35 total characters:
```
  <ReactDatum.Text attr="description">
```
this will render the description at it's full length:
```
<ReactDatum.Text attr="description" ellipsizeAt={false}>
```
this will render the description with "dolor sit amet" in bold:
```
<ReactDatum.Text attr="description" displayAsHtml ellipsizeAt={false}>
```


