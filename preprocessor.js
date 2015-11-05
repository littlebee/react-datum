// Taken from:
//
//    https://facebook.github.io/jest/docs/tutorial-coffeescript.html#content
var coffee = require('coffee-react');

module.exports = {
  process: function(src, path) {
    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {'bare': true});
    }
    return src;
  }
};