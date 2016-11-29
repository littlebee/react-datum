
The ReactDatum.Label component is for the display of labels. 

It is a simple extension of ReactDatum.Text that wraps the value in an HTML <label> tag and provides tooltip support.   If a tooltip is provided by metadata or prop, the tooltip will be used as either the `title` attribute of the element or, if ReactBootstrap is set via ReactDatum.Options.set(), wraps the label with a ReactBootstrap Overlay and Popover.
```javascript
  <ReactDatum.Label value="I'm a label" tooltip="Just an example of using static labels"/>
```

You can also provide the label content via children:
```javascript
  <ReactDatum.Label tooltip="my children are my life">
    I am also a label.
  </ReactDatum.Label>
```

#### Adding an indicator to labels with tooltips

If you want your users to see an indication that a label has tooltip help, you can do something like the following in your CSS:
```css
.datum-tooltip label::after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;    
  content: "\f059";
  
  color: #4767aa;
  font-size: 11px;
  margin-left: 3px;
}

```
The example above renders a FontAwesome 4 question-mark-circle icon after any labels that have tooltips.
 
