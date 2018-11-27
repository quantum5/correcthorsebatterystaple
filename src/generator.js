import words from './words'

const digits = '0123456789'
const symbols = '`~!@#$%^&*()_+-=,./<>?;:|'

export function getWordList (name) {
  if (['small'].includes(name)) {
    return words[name]
  }
  throw new Error(`Invalid word list: ${name}`)
}

export function getWords (list, indices) {
  return Array.from(indices).map(index => list[index % list.length])
}

export function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1)
}

function pickWords (list, number) {
  const array = new Uint16Array(number)
  window.crypto.getRandomValues(array)
  return getWords(list, array)
}

function pickChar (options) {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return options[array[0] % options.length]
}

export function generate (options) {
  let words = pickWords(getWordList(options.list), options.count)

  if (options.capitalize) {
    words = words.map(capitalize)
  }

  if (options.symbol) {
    words.push(pickChar(symbols))
  }

  if (options.digit) {
    words.push(pickChar(digits))
  }

  return words.join('')
}

export function lengthBits (list) {
  return Math.log2(list.length)
}

export function computeBits (options) {
  const wordBits = lengthBits(getWordList(options.list))
  const capsBits = options.capitalize ? 1 : 0
  const symbolBits = options.symbol ? lengthBits(symbols) : 0
  const digitBits = options.digit ? lengthBits(digits) : 0

  return wordBits * options.count + capsBits + symbolBits + digitBits
}
