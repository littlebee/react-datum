
Backbone = require 'backbone'

module.exports = class NameCollection extends Backbone.Collection
  model: Backbone.Model
  constructor: () ->
    # you can add to the names (new id) but don't change any existing
    # ids or names or the collection picker tests will break.
    #
    # I added a little bit of randomness into the ids and order. not all collections will have
    # perfectly sequential ids and we should never make assumptions on that premise
    super [
      {
        id: 2
        name: "Foo Foo"
      },{ 
        id: 1
        name: "Fluffy"
      },{
        id: 11
        name: "Mr. Cuddles"
      },{
        id: 22
        name: "Sebastian"
      },{
        id: 23
        #      1        10       20        30        40        50        60   
        name: "My cat's name is really really long and hard to pronounce"
      }
    ]
    