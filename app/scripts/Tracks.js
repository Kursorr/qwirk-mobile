import { Track } from './Track'
import * as audio from 'nativescript-audio'

export class Tracks {

  /**
   * @param {string} title
   * @param {number} close
   */
  constructor (title, close) {
    this.title = title
    this.close = close

    this.elements = []
    this.playingSpeeches = []
    this.stopedSpeeches = []
    this.begin = 0 // début visuel du timecode
    this.current = 0
  }

  /**
   * @param {Track} track
   */
  add (track) {
    if (!(track instanceof Track)) {
      throw new SyntaxError("track params is not a valid Track instance")
    }

    this.elements.push(track)
  }

  findCurrentSpeeches () {
    return this.elements.map((track) => {
      return track.findCurrentSpeech(this.current)
    }).filter((speech) => {
      return speech !== null
    })
  }

  getPlayingSpeech (speech) {
    this.playingSpeeches.push(speech)
  }

  resetSpeeches () {
    this.playingSpeeches.forEach(speech => {
      speech.isPlaying = false
      speech.player = new audio.TNSPlayer()
    })
  }

  async stopSpeeches () {
    const actualSpeeches = this.findCurrentSpeeches()

    for (let actualSpeech of actualSpeeches) {
      if (actualSpeech.isPlaying) {
        actualSpeech.isPlaying = true
        await actualSpeech.stopSpeech(actualSpeech.player)
      }
    }
  }

  async reset () {
    for (let actualSpeech of this.elements) {
      for (let speech of actualSpeech.speeches) {
        await speech.player.dispose()
        speech.isPlaying = false
        speech.player = new audio.TNSPlayer()
      }
    }
  }
}
