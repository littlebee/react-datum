
Email = require('../src/datums/email')

describe 'Email datum', ->

  it 'should invalidate bad email', ->
    badResponse = Email::validateEmail('bad_email')
    expect(badResponse).to.be.a("string").and.to.match(/invalid/gi)

  it 'should validate true if good email', ->
    expect(Email::validateEmail('firstname.lastname@example.me')).to.be(true)
