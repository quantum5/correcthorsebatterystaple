const { getWordList, getWords, getChar, lengthBits } = require('../src/generator')
const words = require('../src/words')
const assert = require('assert').strict
const lists = ['small', 'medium', 'large']

describe('getWordList', () => {
  lists.forEach(name => {
    it(name, () => {
      assert.equal(getWordList(name), words[name])
    })
  })
})

describe('getWords', () => {
  lists.forEach(name => {
    it(`sanity: ${name}`, () => {
      assert.deepEqual(
        getWords(words[name], [0, 256, 1337, 2018]),
        [words[name][0], words[name][256], words[name][1337], words[name][2018]]
      )
    })
  })

  lists.forEach(name => {
    it(`all offsets: ${name}`, () => {
      const len = words[name].length
      ;[...Array(65536 / len)].forEach((_, i) => {
        assert.deepEqual(
          getWords(words[name], [i * len, i * len + 256, i * len + 1337, i * len + 2018]),
          [words[name][0], words[name][256], words[name][1337], words[name][2018]]
        )
      })
    })
  })
})

describe('getChar', () => {
  it('simple', () => {
    const choices = ['0', '1', '2']
    assert.equal(getChar(choices, 0), '0')
    assert.equal(getChar(choices, 1), '1')
    assert.equal(getChar(choices, 2), '2')
    assert.equal(getChar(choices, 3), '0')
    assert.equal(getChar(choices, 4), '1')
    assert.equal(getChar(choices, 5), '2')
  })
})

describe('lengthBits', () => {
  it('simple', () => {
    assert.equal(lengthBits(Array(1)), 0)
    assert.equal(lengthBits(Array(2)), 1)
    assert.equal(lengthBits(Array(4)), 2)
    assert.equal(lengthBits(Array(1024)), 10)
    assert.equal(lengthBits(Array(2048)), 11)
    assert.equal(lengthBits(Array(4096)), 12)
    assert.equal(lengthBits(Array(8192)), 13)
  })
})
