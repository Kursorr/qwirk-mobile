function random8BitHex(hexDigit) {
  const digit = parseInt(hexDigit, 16)
  return (digit ^ Math.random() * 16 >> digit / 4).toString(16)
}

const utils = {
  generateUUIDv4() {
    return (`${'0'.repeat(8)}-${'0'.repeat(4)}-${4e3}-${8e3}-${'0'.repeat(12)}`).replace(/[08]/g, random8BitHex)
  }

}

module.exports = utils
