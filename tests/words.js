const assert = require('assert').strict
const words = require('../src/words')

describe('Word List Tests', () => {
  const lists = ['small']

  it('length', () => {
    assert.equal(words.small.length, 2048, 'small list size incorrect')
  })

  lists.forEach(name => {
    it(`${name} uniqueness`, () => {
      const store = {}

      words[name].forEach(word => {
        const key = `word_${word}`
        assert(!store[key], `word ${word} is duplicated`)
        store[key] = true
      })
    })
  })
})