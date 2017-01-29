
For rendering links like `<a href="...">`.

Example: 
```jsx
var model = new Backbone.Model({
  url: "http://www.zulily.com", 
  name: "Zulily"
})

<ReactDatum.Link attr="url" nameAttr="name"/>
```

The 'attr' prop should return a url from the model and is the href of the link.   The 'nameAttr' prop is optional and can used to specify a model attribute value to display between the <a></a> tags.  If 'nameAttr' prop is not specified, the children of the link are rendered:

```jsx
<ReactDatum.Link attr="url">Go to <ReactDatum.Text attr="name"/> and discover somthing today!</Rd.Link>
```

In this example the link would enclose the rendered contents: "Go to Zulily and ..."

If no nameAttr prop and no children, ReactDatum.Link will render the value of the attr specified (what should be the url of the href):

```jsx
<ReactDatum.Link attr="url"/>
```

The example above renders `<a href="http://www.zulily.com">http://www.zulily.com</a>`  
