const words = require('./words')
const digits = '0123456789'
const symbols = '`~!@#$%^&*()_+-=,./<>?;:|'
const defaultSymbol = '-'

function getWordList (name) {
  if (['small', 'medium', 'large'].includes(name)) {
    return words[name]
  }
  throw new Error(`Invalid word list: ${name}`)
}

function getWords (list, indices) {
  return Array.from(indices).map(index => list[index % list.length])
}

function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1)
}

function pickWords (list, number) {
  const array = new Uint16Array(number)
  window.crypto.getRandomValues(array)
  return getWords(list, array)
}

function getChar (choices, index) {
  return choices[index % choices.length]
}

function pickChar (choices) {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  const index = array[0]
  return getChar(choices, index)
}

function generate (options) {
  let words = pickWords(getWordList(options.list), options.count)

  if (options.capitalize) {
    words = words.map(capitalize)
  }

  if (options.digit) {
    words.push(pickChar(digits))
  }

  return words.join(options.symbol ? options.separator : '')
}

function lengthBits (list) {
  return Math.log2(list.length)
}

function bitsForSymbol (symbol) {
  return symbol === defaultSymbol ? 1 : lengthBits(symbols)
}

function computeBits (options) {
  const wordBits = lengthBits(getWordList(options.list))
  const capsBits = options.capitalize ? 1 : 0
  const symbolBits = options.symbol ? bitsForSymbol(options.separator) : 0
  const digitBits = options.digit ? lengthBits(digits) : 0

  return wordBits * options.count + capsBits + symbolBits + digitBits
}

module.exports = {
  getWordList, getWords, capitalize, generate, getChar, lengthBits, computeBits,
  symbols, defaultSymbol,
}
