jest.dontMock('../email.cjsx')

describe 'email', ->

  it 'should validate email', ->
    Email = require('../email.cjsx')

    expect(Email::validateEmail('bad_email')).toMatch(/^Invalid email address/)
    expect(Email::validateEmail('example@example.com')).toBe(true)
