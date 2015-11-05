describe 'email', ->
  it 'should be importable', ->
    email = require('../email')
    expect(email).toBeDefined()