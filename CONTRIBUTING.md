
# Contributing to react-datum

Thank you!  We welcome your ideas and suggestions via the (react-datum Github issues)[https://github.com/zulily/react-datum/issues] page.  And, more importantly, your pull requests!

We strive to build great software and welcome **everyone** to participate.  

This project adheres to the (Contributor Covenant 1.2)[http://contributor-covenant.org/version/1/2/0]. By participating, you are expected to uphold this code. Any issues, discussion posts or code comments not adhering to those guidelines will be removed with notice to the author.

## Getting started (public contributor)

*Note to Zulily teammates, skip this section.  See the section that follows for setup and special instructions to build and test react-datum in zuKeeper.

Clone that repo!  

`git clone https://github.com/zulily/react-datum.git`

Yes, it's all written in coffee script.  Install coffeescript globally:

`sudo npm install -g coffee-script`

You will need the Grunt cli to build

`sudo npm install -g grunt-cli`

Run npm install to install the remaining packages needed.

`npm install`

Test it out:

'grunt build test'

If you want to build without running tests (you might want to always run tests tho, just saying):

`grunt build`

The watch task can be used to pick up changes and build automagically:

`grunt watch`

will watch all the source and tests and distribution relevant files and rebuild as necessary.  It will not run the tests.

## Getting started (zuKeeper developer):

We use react-datum at Zulily as part of our zuKeeper application for managing sales events, vendor information and the product catalog.  It is a core piece of zuKeeper React UI stack.  It's super easy for you to contribute and test your changes in zuKeeper. 

From your local htdoc_ems root (if you have multiple clones of htdocs_ems, use the one that you are currently working most in):

`cake react-datum` 

will clone the github hosted repository of react-datum into a sibling directory of htdocs_ems/ if it isn't already. It will also save the full path of your current htdocs_ems dir in .zukeeperRoot file in the root of react-datum.  It will also try to open a terminal tab, but this only works if you are running terminal or iterm2 on osx.  Otherwise it will print a console message telling which directory (react-datum) to cd to get started.  See scripts/deployToZukeeper.coffee for more details. 

As part of `grunt build` and `grunt watch` of react-datum, scripts/deployToZuKeeper.coffee is executed which, if it sees the .zukeeperRoot file or an ../htdocs_ems dir that exists, it will copy dist/react-datum* to that dir + app/webroot/js/lib.  It will also try to scp the dist files into place on your emsweb-01.vps machine.   

You should be able to make a change in the react-datum code and instantly test it on your vps without committing to either repo and doing nothing more than `grunt build` in the react-datum directory.

After you have written a test for your changes (come on, I swear it's really easy), you can commit them in the react-datum branch and, if deployToZukeeper worked on build, you can go over and commit the dist files in htdocs_ems.  Easy as -cake-, er, grunt!


## Tests

Testing is fun!   No, really, it's not too bad.  We use Mocha + Chai + a few chai addons to make the job easy.   Here are some pertinent links: 

[Mocha.js test framework](http://visionmedia.github.io/mocha) 
_for `describe, it, before, after`_

[Chai Assertion Library](http://chaijs.com) 
_for `should, expect, assert`. Note we are using the BDD style_ 

[Sinon.JS Test Spies, Stubs and Mocks](http://sinonjs.org/docs/) plus 
[Sinon Chai itegration](https://github.com/domenic/sinon-chai) 
_for things like `mySpy.calledWith("foo").should.be.ok`;_ 
 
[Chai Changes](https://github.com/matthijsgroen/chai-changes) 
_for things like `(->result).should.change.by(3).when -> result += 3`_

Also take a look at test/lib/testHelpers.cjsx.  You should include this in your test src file that you want to debug whether you use the convienience methods or not.  
  

#### Debugging tests

Using node-inspector, you can debug tests in V8 using chrome.  

`sudo npm install -g node-inspector`

and then

`node-inspector`

will launch a server that you can connect chrome to for debugging. Point chrome at the url displayed in the console after starting node-inspector.  It should always be the same so go ahead and bookmark that.

and then run a test.  You can bypass grunt which just shells out to scripts/testRunner.coffee.  The advantage of using the testRunner script directly is that you can pass an individual file to it for testing or debugging.  So if you just want to see the results of the test that you're working on you don't have to wait for the others to run.  To debug that test:

`coffee --nodejs --debug-brk node_modules/bumble-test/bin/testRunner.coffee test/collectionPicker/readonly.cjsx`   

Refresh the Chrome tab pointed at local node-inspector and wait for it to load.  It will first stop at the coffeescript loader. No other files are loaded yet though so press the run button and it will next stop at the `debugger` line intensionally left in test/lib/testHelpers.cjsx.  At this point your test file should be loaded and most or all of it's components.  Set breakpoints and let it fly!

Grunt has a task for running tests. To run all tests: 

`grunt test`

from project root.


## Source

Source should be in coffeescript or cjsx.  Examples (see below) are the exception.  Coffeescript provides the OO glue that makes the react-datum components easily extensible. 

Use the Node.js/CommonJS require syntax for requires internally. For example: `Datum = require('./datum')`.  Examples are the exception, as they only expected to run in the browser and loaded via `<script>` tag.  We use webpack to bundle our dist/react-datum*.js files and it understands CommonJS requires and correctly orders the load of components based on the dependency tree.
   

## Examples

Examples should be able to run standalone (from a file://... url in browser) in order for us to host on github.io pages.  

Assume that the example will be script tag loaded.  Do NOT use require() to load dependencies.  When react-datum is script tag loaded it, like jQuery, React, .... will add itself as ReactDatum in the global namespace.  You shouldn't need to require any other internal things.

*All examples should be written in ES5 + JSX javascript*.  No coffeescript or ES6 with the exception of one example each on how to extend react-datum components. (There are some .coffee haters out there)[https://ponyfoo.com/articles/we-dont-want-your-coffee])

The examples in /examples will be picked up by the grunt build and watch and compiled to docs/examples.  Each src file in examples is assumed to be a single contained example, needing nothing but the base dependencies:
```
<script src="../../../dist/vendor/react.js"></script>
<script src="../../../dist/vendor/react-dom.js"></script>
<script src="../../../dist/vendor/underscore.js"></script>
<script src="../../../dist/vendor/backbone.js"></script>
```

If you need a vendor.js that isn't in that set, go ahead and add it to bumbleDocs.coffee in the project root.  Each example is wrapped in a self contained .html file that shows the source file code (with highlighting) on the left and a demo div on the right where the code is expected to render.  

For the example to be displayed in the demo viewer, it needs to added to the `examples:` in /bumbleDocs.coffee.

The source is compiled from JSX down to JS and also placed in the docs/examples folder.  To compile the examples just:

`grunt docs`
 
 
## CSS

If you need to include CSS for a component of this lib:
  - keep it minimal.  **let our users style** and be unopinionated. 
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

## TBD

We should also consider splitting out src/datums/collectionPicker.  It doesn't rely on jQuery, but it does pull an additional 30K of source from react-select.  If it were it's own component, the react-datum.min.js file size would be about 30K less in size.  As of 12.19.2015 react-datum.min.js is 74K.



