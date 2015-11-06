// Taken from:
//
//    https://facebook.github.io/jest/docs/tutorial-coffeescript.html#content
var react = require('coffee-react');
var coffee = require('coffee-script');

module.exports = {
  process: function(src, path) {
    if (react.helpers.hasCJSXExtension(path)) {
      return react.compile(src, {'bare': true});
    } else if (react.helpers.isCoffee(path)) {
      return coffee.compile(src, {'bare': true});
    }
    return src;
  }
};