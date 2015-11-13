




### CSS

If you need to include CSS for a component of this lib:
  - keep it minimal.  let our users style and format
  - keep it specific. use the classname of the component. no rules on common tags
  - please don't use inline styles as they are difficult for our user to override
  - put the css in a file that is of same or similar name to the components in the css/ dir
  - ...and rebuild (if you are not running `cake watch` - watch will pickup on css/ file changes)

Don't do this (as promoted by webpack):  
```
require('./somefile.css')
```
If the webpack css loader were not disabled, this would work great on the browser, and not at
all in node.   

I instead opted to build a separate combined css file in dist that the user can than optionally
decide not to use at all.    

