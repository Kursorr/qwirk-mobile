const appSettings = require('tns-core-modules/application-settings')

const sounds = {
  getSounds() {
    let json = appSettings.getString('sounds', '')
    if(json === '') return []
    else return JSON.parse(json)
  },
  removeSound(fileName) {
    let sounds = this.getSounds()
    sounds = sounds.filter(s => {
      return s.fileName != fileName
    })
    // serialize it
    let json = JSON.stringify(sounds)
    appSettings.setString('sounds', json)
  },
  saveSound(name, fileName, time) {
    let sounds = this.getSounds()
    sounds.push({
      name: name,
      fileName: fileName,
      time: time
    })
    // serialize it
    let json = JSON.stringify(sounds)
    appSettings.setString('sounds', json)
  }
}

module.exports = sounds
